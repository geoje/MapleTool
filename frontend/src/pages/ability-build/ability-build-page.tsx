import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import blackCirculatorIcon from "@/assets/ability/black-circulator.webp";
import bossMedalIcon from "@/assets/ability/boss-medal.png";
import { MAX_SELECTED_ABILITY_OPTIONS, ResetType } from "@/constants/ability";
import { LabeledEdge } from "@/pages/ability-build/labeled-edge";
import { OPTION_PANEL_WIDTH, OptionPanelNode } from "@/pages/ability-build/option-panel-node";
import type { OptionPanelData } from "@/pages/ability-build/option-panel-node";
import { ResultTableNode } from "@/pages/ability-build/result-table-node";

const NODE_TYPES = { option: OptionPanelNode, result: ResultTableNode };
const EDGE_TYPES = { labeled: LabeledEdge };
const DEFAULT_EDGE_OPTIONS = { style: { stroke: "var(--color-border)", strokeWidth: 1.5 } };

const RESULT_X = OPTION_PANEL_WIDTH + 160;

export function AbilityBuildPage() {
  const [selectedOptionNames, setSelectedOptionNames] = useState<Set<string>>(new Set());
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
      { id: "result-reputation", type: "result", position: { x: RESULT_X, y: 60 }, data: {} },
      { id: "result-circulator", type: "result", position: { x: RESULT_X, y: 380 }, data: {} },
    ],
    [selectedOptionNames, onChangeSelected, reputationDiscount, onToggleDiscount, resetType]
  );

  const edges = useMemo<Edge[]>(
    () => [
      {
        id: "option->result-reputation",
        source: "option",
        target: "result-reputation",
        type: "labeled",
        data: { icon: bossMedalIcon, name: "명성치", value: "12만" },
      },
      {
        id: "option->result-circulator",
        source: "option",
        target: "result-circulator",
        type: "labeled",
        data: { icon: blackCirculatorIcon, name: "블랙 서큘", value: "24회" },
      },
    ],
    []
  );

  return (
    <ReactFlow
      className="h-full w-full"
      nodes={nodes}
      edges={edges}
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
