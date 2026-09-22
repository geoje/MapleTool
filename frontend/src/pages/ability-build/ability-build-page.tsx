import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import abilityNavIcon from "@/assets/ability/icon.png";
import mesoIcon from "@/assets/enhance/meso.png";
import {
  ABILITY_OPTION_INFOS,
  ADVANCED_RESET_COST_BY_LOCK_COUNT,
  ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY,
  formatAbilityResultRange,
  MAX_SELECTED_ABILITY_OPTIONS,
  NORMAL_RESET_REPUTATION_COST,
  NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY,
  ResetType,
} from "@/constants/ability";
import { PotentialGrade } from "@/constants/enhance";
import type { CubeGrade } from "@/hooks/use-cube-probability";
import { formatCostDecimal, formatCostFull } from "@/lib/format";
import { LabeledEdge } from "@/pages/ability-build/labeled-edge";
import type { LabeledEdgeData } from "@/pages/ability-build/labeled-edge";
import { OPTION_PANEL_WIDTH, OptionPanelNode } from "@/pages/ability-build/option-panel-node";
import type { OptionPanelData } from "@/pages/ability-build/option-panel-node";
import type { ResultCellData, ResultTableData } from "@/pages/ability-build/reset-result-table";
import { ResultTableNode } from "@/pages/ability-build/result-table-node";

const NODE_TYPES = { option: OptionPanelNode, result: ResultTableNode };
const EDGE_TYPES = { labeled: LabeledEdge };
const DEFAULT_EDGE_OPTIONS = { style: { stroke: "var(--color-border)", strokeWidth: 1.5 } };

const RESULT_X = OPTION_PANEL_WIDTH + 160;
const FINAL_X = RESULT_X + 260;

const DEFAULT_SELECTED_OPTION = ABILITY_OPTION_INFOS.find((option) => option.abbreviation === "보공")!.name;

// slot이 "row1"이면 1번째 줄에, "row2"면 2·3번째 줄(둘 중 대표로 col1)에 옵션이 확정된 테이블을 만든다.
function singleOptionTable(slot: "row1" | "row2", text: string, grade: CubeGrade = "legendary"): ResultTableData {
  const cell: ResultCellData = { text, grade, isNew: true };
  return slot === "row1" ? { row1: cell, row2Col1: null, row2Col2: null } : { row1: null, row2Col1: cell, row2Col2: null };
}

// 1번째 줄엔 레전드리 옵션, 2·3번째 줄엔 유니크 옵션이 모두 확정된 최종 테이블 - 레전 먼저/유니크 먼저 두
// 분기가 전부 이 테이블로 모인다. 둘 다 최종 확정 결과라 두 칸 모두 강조 표시한다.
function finalTable(legendaryText: string, uniqueText: string): ResultTableData {
  return {
    row1: { text: legendaryText, grade: "legendary", isNew: true },
    row2Col1: { text: uniqueText, grade: "unique", isNew: true },
    row2Col2: null,
  };
}

// 고급 재설정 시 옵션 하나를 레전드리로 맞추는 데 드는 평균 명성치/메소.
// slotChancePercents는 이번 시도에서 "동시에" 굴러가는 잠기지 않은 줄들의 레전드리 확률 - 둘 이상이면
// 그 중 하나라도 원하는 옵션이 뜨면 성공이라 합집합 확률(1 - 전부 실패할 확률)을 쓴다.
// lockCount는 이미 확정되어 잠긴 줄의 개수 - 잠금이 많을수록 시도당 비용이 오른다.
function advancedResetCost(
  slotChancePercents: number[],
  optionLegendaryChancePercent: number,
  lockCount: number,
  discountFactor: number
): { reputationCost: number; mesoCost: number } {
  const { reputation: reputationPerTry, meso: mesoPerTry } = ADVANCED_RESET_COST_BY_LOCK_COUNT[lockCount];
  const allMissFraction = slotChancePercents.reduce((acc, slotChancePercent) => {
    const fraction = (slotChancePercent / 100) * (optionLegendaryChancePercent / 100);
    return acc * (1 - fraction);
  }, 1);
  const successFraction = 1 - allMissFraction;
  const expectedTries = successFraction > 0 ? 1 / successFraction : 0;
  return { reputationCost: expectedTries * reputationPerTry * discountFactor, mesoCost: expectedTries * mesoPerTry };
}

const NORMAL_RESET_LOCK_KEYS = ["none", "one", "two"] as const;

// 일반 재설정 시 옵션 하나를 원하는 등급으로 맞추는 데 드는 평균 명성치(메소는 쓰지 않는다).
// optionChancePercent(probabilityByGrade)는 "그 등급이 뜬다면 그중 이 옵션일" 조건부 확률이라,
// 그 등급 자체가 뜰 확률(slotChancePercents - advancedResetCost와 같은 합집합 계산용)을 따로 곱해야
// 실제 그 줄에서 이 옵션이 나올 절대 확률이 된다. 1번째 줄은 관례상 100%(항상 그 등급 시도)로 둔다.
// 시도당 비용은 무엇을 노리든 항상 NORMAL_RESET_REPUTATION_COST의 "레전드리" 행만 쓴다 - 에픽/유니크
// 행은 참고용으로만 있고, 실제 비용은 잠긴 줄 개수에만 좌우된다(그 줄이 무슨 등급이었는지는 상관없음).
function normalResetCost(slotChancePercents: number[], optionChancePercent: number, lockCount: number, discountFactor: number): number {
  const costPerTry = NORMAL_RESET_REPUTATION_COST[PotentialGrade.LEGENDARY]?.[NORMAL_RESET_LOCK_KEYS[lockCount]] ?? 0;
  const allMissFraction = slotChancePercents.reduce((acc, slotChancePercent) => {
    const fraction = (slotChancePercent / 100) * (optionChancePercent / 100);
    return acc * (1 - fraction);
  }, 1);
  const successFraction = 1 - allMissFraction;
  const expectedTries = successFraction > 0 ? 1 / successFraction : 0;
  return expectedTries * costPerTry * discountFactor;
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

  const [firstSelectedName, secondSelectedName] = Array.from(selectedOptionNames);
  const firstOption = ABILITY_OPTION_INFOS.find((option) => option.name === firstSelectedName);
  const secondOption = ABILITY_OPTION_INFOS.find((option) => option.name === secondSelectedName);

  const { branchNodes, branchEdges } = useMemo<{ branchNodes: Node[]; branchEdges: Edge[] }>(() => {
    if (!firstOption) return { branchNodes: [], branchEdges: [] };

    const legendaryChancePercent = firstOption.probabilityByGrade[PotentialGrade.LEGENDARY] ?? 0;
    const resultText = formatAbilityResultRange(firstOption);

    const discountFactor = reputationDiscount ? 0.5 : 1;

    if (resetType === ResetType.NORMAL) {
      // 일반 재설정은 1번째 줄만 레전드리가 나올 수 있는 구조라, 1번째로 고른 옵션은 항상 1번째 줄을
      // 목표로 하고, 2번째로 고른 옵션은 유니크만 나올 수 있는 2·3번째 줄(합쳐서 row2)을 목표로 한다.
      // 둘 다 고른 경우 "레전 먼저" / "유니크 먼저" 두 분기로 시작하고, 각자 나머지 줄을 잠근 뒤 마저
      // 채워서 같은 최종 테이블(1번째 줄 레전드리 + 2·3번째 줄 유니크)로 모인다.
      const legendaryCostUnlocked = normalResetCost([100], legendaryChancePercent, 0, discountFactor);

      const branchNodes: Node[] = [
        { id: "result-0", type: "result", position: { x: RESULT_X, y: secondOption ? 80 : 200 }, data: singleOptionTable("row1", resultText) },
      ];
      const branchEdges: Edge[] = [
        {
          id: "option->result-0",
          source: "option",
          target: "result-0",
          type: "labeled",
          data: {
            title: "첫째줄 옵션",
            rows: [{ icon: abilityNavIcon, value: formatCostFull(legendaryCostUnlocked) }],
          } satisfies LabeledEdgeData,
        },
      ];

      if (secondOption) {
        const uniqueChancePercent = secondOption.probabilityByGrade[PotentialGrade.UNIQUE] ?? 0;
        const secondResultText = formatAbilityResultRange(secondOption);

        const secondThirdRowSlots = [NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY, NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY];
        const uniqueCostUnlocked = normalResetCost(secondThirdRowSlots, uniqueChancePercent, 0, discountFactor);
        const uniqueCostRow1Locked = normalResetCost(secondThirdRowSlots, uniqueChancePercent, 1, discountFactor);
        const legendaryCostRow2Locked = normalResetCost([100], legendaryChancePercent, 1, discountFactor);

        branchNodes.push(
          { id: "result-u0", type: "result", position: { x: RESULT_X, y: 400 }, data: singleOptionTable("row2", secondResultText, "unique") },
          { id: "result-final", type: "result", position: { x: FINAL_X, y: 240 }, data: finalTable(resultText, secondResultText) }
        );
        branchEdges.push(
          {
            id: "option->result-u0",
            source: "option",
            target: "result-u0",
            type: "labeled",
            data: {
              title: "둘째줄 또는 셋째줄 옵션",
              rows: [{ icon: abilityNavIcon, value: formatCostFull(uniqueCostUnlocked) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-0->result-final",
            source: "result-0",
            target: "result-final",
            type: "labeled",
            data: {
              title: "둘째줄 또는 셋째줄 옵션",
              rows: [{ icon: abilityNavIcon, value: formatCostFull(uniqueCostRow1Locked) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-u0->result-final",
            source: "result-u0",
            target: "result-final",
            type: "labeled",
            data: {
              title: "첫째줄 옵션",
              rows: [{ icon: abilityNavIcon, value: formatCostFull(legendaryCostRow2Locked) }],
            } satisfies LabeledEdgeData,
          }
        );
      }

      return { branchNodes, branchEdges };
    }

    // 고급 재설정의 첫 분기는 항상 2가지뿐이다: 첫째줄(항상 100% 레전드리)에 뜨는 경우와, 잠기지 않은
    // 둘째·셋째줄 중 아무 곳에나 뜨는 경우. 둘째/셋째줄은 확률이 완전히 같은 채로 동시에 굴러가는 하나의
    // "같은 줄"이라 별도 분기가 아니고, 대표로 row2col1에 표시한다. 기대값도 그 합집합 확률 기준이다.
    const branches: { id: string; title: string; slotChancePercents: number[]; slot: "row1" | "row2"; y: number }[] = [
      { id: "result-0", title: "첫째줄 옵션", slotChancePercents: [100], slot: "row1", y: 80 },
      {
        id: "result-1",
        title: "둘째줄 또는 셋째줄 옵션",
        slotChancePercents: [ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY, ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY],
        slot: "row2",
        y: 520,
      },
    ];

    const branchNodes: Node[] = [];
    const branchEdges: Edge[] = [];

    branches.forEach(({ id, title, slotChancePercents, slot, y }) => {
      const { reputationCost, mesoCost } = advancedResetCost(slotChancePercents, legendaryChancePercent, 0, discountFactor);

      branchNodes.push({
        id,
        type: "result",
        position: { x: RESULT_X, y },
        data: singleOptionTable(slot, resultText),
      });
      branchEdges.push({
        id: `option->${id}`,
        source: "option",
        target: id,
        type: "labeled",
        data: {
          title,
          rows: [
            { icon: abilityNavIcon, value: formatCostFull(reputationCost) },
            { icon: mesoIcon, value: formatCostDecimal(mesoCost) },
          ],
        } satisfies LabeledEdgeData,
      });
    });

    return { branchNodes, branchEdges };
  }, [firstOption, secondOption, resetType, reputationDiscount]);

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
