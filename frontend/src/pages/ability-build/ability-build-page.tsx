import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import bossMedalIcon from "@/assets/ability/boss-medal.png";
import mesoPocketIcon from "@/assets/ability/meso-pocket.png";
import {
  ABILITY_OPTION_INFOS,
  ADVANCED_RESET_COST_BY_LOCK_COUNT,
  ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY,
  formatAbilityResultRange,
  MAX_SELECTED_ABILITY_OPTIONS,
  NORMAL_RESET_REPUTATION_COST,
  ResetType,
} from "@/constants/ability";
import { PotentialGrade } from "@/constants/enhance";
import { formatCostDecimal, formatCostFull } from "@/lib/format";
import { LabeledEdge } from "@/pages/ability-build/labeled-edge";
import type { LabeledEdgeData } from "@/pages/ability-build/labeled-edge";
import { OPTION_PANEL_WIDTH, OptionPanelNode } from "@/pages/ability-build/option-panel-node";
import type { OptionPanelData } from "@/pages/ability-build/option-panel-node";
import type { ResultRowData } from "@/pages/ability-build/reset-result-table";
import { ResultTableNode } from "@/pages/ability-build/result-table-node";

const NODE_TYPES = { option: OptionPanelNode, result: ResultTableNode };
const EDGE_TYPES = { labeled: LabeledEdge };
const DEFAULT_EDGE_OPTIONS = { style: { stroke: "var(--color-border)", strokeWidth: 1.5 } };

const RESULT_X = OPTION_PANEL_WIDTH + 160;

const DEFAULT_SELECTED_OPTION = ABILITY_OPTION_INFOS.find((option) => option.abbreviation === "보공")!.name;

function blankRows(index: number, text: string): (ResultRowData | null)[] {
  const rows: (ResultRowData | null)[] = [null, null, null];
  rows[index] = { text, grade: "legendary" };
  return rows;
}

export function AbilityBuildPage() {
  const [selectedOptionNames, setSelectedOptionNames] = useState<Set<string>>(new Set([DEFAULT_SELECTED_OPTION]));
  const [reputationDiscount, setReputationDiscount] = useState(false);
  const [resetType, setResetType] = useState<ResetType>(ResetType.ADVANCED);

  const onChangeSelected = useCallback((name: string) => {
    setSelectedOptionNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else if (next.size < MAX_SELECTED_ABILITY_OPTIONS) next.add(name);
      return next;
    });
  }, []);

  const onToggleDiscount = useCallback(() => setReputationDiscount((prev) => !prev), []);

  const firstSelectedName = Array.from(selectedOptionNames)[0];
  const firstOption = ABILITY_OPTION_INFOS.find((option) => option.name === firstSelectedName);

  const { branchNodes, branchEdges } = useMemo<{ branchNodes: Node[]; branchEdges: Edge[] }>(() => {
    if (!firstOption) return { branchNodes: [], branchEdges: [] };

    const legendaryChancePercent = firstOption.probabilityByGrade[PotentialGrade.LEGENDARY] ?? 0;
    const resultText = formatAbilityResultRange(firstOption);

    if (resetType === ResetType.NORMAL) {
      const costPerTry = NORMAL_RESET_REPUTATION_COST[PotentialGrade.LEGENDARY]?.none ?? 0;
      const fraction = legendaryChancePercent / 100;
      const expectedTries = fraction > 0 ? 1 / fraction : 0;
      const reputationCost = expectedTries * costPerTry;

      return {
        branchNodes: [{ id: "result-0", type: "result", position: { x: RESULT_X, y: 300 }, data: { rows: blankRows(0, resultText) } }],
        branchEdges: [
          {
            id: "option->result-0",
            source: "option",
            target: "result-0",
            type: "labeled",
            data: {
              title: "1번째 줄 옵션",
              rows: [{ icon: bossMedalIcon, value: formatCostFull(reputationCost) }],
            } satisfies LabeledEdgeData,
          },
        ],
      };
    }

    // 고급 재설정: 1번째 줄은 항상 100% 레전드리, 2/3번째 줄은 ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY(%)
    // 확률로만 레전드리가 나온다 - 셋 다 아직 다른 줄이 정해지지 않았으니 잠금 0개 비용을 쓴다.
    const { reputation: reputationPerTry, meso: mesoPerTry } = ADVANCED_RESET_COST_BY_LOCK_COUNT[0];
    const slotLegendaryChancePercent = [100, ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY, ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY];
    const slotY = [60, 340, 620];

    const branchNodes: Node[] = [];
    const branchEdges: Edge[] = [];

    slotLegendaryChancePercent.forEach((slotChancePercent, index) => {
      const fraction = (slotChancePercent / 100) * (legendaryChancePercent / 100);
      const expectedTries = fraction > 0 ? 1 / fraction : 0;
      const reputationCost = expectedTries * reputationPerTry;
      const mesoCost = expectedTries * mesoPerTry;

      branchNodes.push({
        id: `result-${index}`,
        type: "result",
        position: { x: RESULT_X, y: slotY[index] },
        data: { rows: blankRows(index, resultText) },
      });
      branchEdges.push({
        id: `option->result-${index}`,
        source: "option",
        target: `result-${index}`,
        type: "labeled",
        data: {
          title: `${index + 1}번째 줄 옵션`,
          rows: [
            { icon: bossMedalIcon, value: formatCostFull(reputationCost) },
            { icon: mesoPocketIcon, value: formatCostDecimal(mesoCost) },
          ],
        } satisfies LabeledEdgeData,
      });
    });

    return { branchNodes, branchEdges };
  }, [firstOption, resetType]);

  const nodes = useMemo<Node[]>(
    () => [
      {
        id: "option",
        type: "option",
        position: { x: 0, y: 0 },
        data: {
          selectedNames: selectedOptionNames,
          onChangeSelected,
          reputationDiscount,
          onToggleDiscount,
          resetType,
          onChangeResetType: setResetType,
        } satisfies OptionPanelData,
      },
      ...branchNodes,
    ],
    [selectedOptionNames, onChangeSelected, reputationDiscount, onToggleDiscount, resetType, branchNodes]
  );

  return (
    <ReactFlow
      className="h-full w-full"
      nodes={nodes}
      edges={branchEdges}
      nodeTypes={NODE_TYPES}
      edgeTypes={EDGE_TYPES}
      defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
      proOptions={{ hideAttribution: true }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      panOnDrag
      zoomOnScroll
      zoomOnPinch
      zoomOnDoubleClick={false}
      minZoom={0.3}
      maxZoom={2}
      fitView
      fitViewOptions={{ padding: 0.3 }}
    >
      <Background variant={BackgroundVariant.Dots} gap={24} size={1} />
    </ReactFlow>
  );
}
