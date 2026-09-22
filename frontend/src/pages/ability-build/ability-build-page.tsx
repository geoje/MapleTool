import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import abilityNavIcon from "@/assets/ability/icon.png";
import blackCirculatorIcon from "@/assets/ability/black-circulator.webp";
import chaosCirculatorIcon from "@/assets/ability/chaos-circulator.webp";
import mesoIcon from "@/assets/enhance/meso.png";
import {
  ABILITY_OPTION_INFOS,
  ADVANCED_RESET_COST_BY_LOCK_COUNT,
  ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY,
  formatAbilityResultMax,
  formatAbilityResultRange,
  maxValueProbability,
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

type ResultSlot = "row1" | "row2Col1" | "row2Col2";

function singleOptionTable(slot: ResultSlot, text: string, grade: CubeGrade = "legendary"): ResultTableData {
  const cell: ResultCellData = { text, grade };
  return { row1: null, row2Col1: null, row2Col2: null, [slot]: cell };
}

function legendaryPlusUniqueTable(legendaryText: string, uniqueText: string, uniqueSlot: "row2Col1" | "row2Col2"): ResultTableData {
  const legendaryCell: ResultCellData = { text: legendaryText, grade: "legendary" };
  const uniqueCell: ResultCellData = { text: uniqueText, grade: "unique" };
  return { row1: legendaryCell, row2Col1: null, row2Col2: null, [uniqueSlot]: uniqueCell };
}

function twoUniqueTable(leftText: string, rightText: string): ResultTableData {
  return {
    row1: null,
    row2Col1: { text: leftText, grade: "unique" },
    row2Col2: { text: rightText, grade: "unique" },
  };
}

// slotChancePercents are rows rolling simultaneously; a hit on any one counts as success, so cost
// is based on the union probability (1 - chance all of them miss), not per-row odds.
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

// optionChancePercent is a conditional probability ("given this grade rolls, it's this option"), so
// it must be multiplied by slotChancePercents (the chance that grade rolls at all) to get the
// absolute per-row chance. The per-try cost always uses NORMAL_RESET_REPUTATION_COST's legendary row
// regardless of target grade - actual cost depends only on how many rows are locked.
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

  const firstSelectedName = Array.from(selectedOptionNames)[0];
  const firstOption = ABILITY_OPTION_INFOS.find((option) => option.name === firstSelectedName);

  // The 2nd/3rd picks both target the unique-only row2, where physical line order is irrelevant,
  // so their left/right column comes from tab order, not click order.
  const [secondOption, thirdOption] = ABILITY_OPTION_INFOS.filter(
    (option) => option.name !== firstSelectedName && selectedOptionNames.has(option.name)
  );

  const { branchNodes, branchEdges } = useMemo<{ branchNodes: Node[]; branchEdges: Edge[] }>(() => {
    if (!firstOption) return { branchNodes: [], branchEdges: [] };

    const legendaryChancePercent = firstOption.probabilityByGrade[PotentialGrade.LEGENDARY] ?? 0;
    const resultText = formatAbilityResultRange(firstOption);

    const discountFactor = reputationDiscount ? 0.5 : 1;

    // Once row1 is at legendary, a circulator reroll (either item works) can still push its
    // numeric value up to the max of the range - shown as one more step off result-0, only when
    // a single option is selected for now.
    const maxResultText = formatAbilityResultMax(firstOption);
    const maxValueProbabilityPercent = maxValueProbability(firstOption);
    const maxValueTries = maxValueProbabilityPercent > 0 ? 1 / (maxValueProbabilityPercent / 100) : 0;

    function buildValueMaxBranch(y: number): { node: Node; edge: Edge } {
      return {
        node: { id: "result-0-max", type: "result", position: { x: FINAL_X, y }, data: singleOptionTable("row1", maxResultText) },
        edge: {
          id: "result-0->result-0-max",
          source: "result-0",
          target: "result-0-max",
          type: "labeled",
          data: {
            title: `${firstOption.abbreviation} 최대치`,
            rows: [{ icon: [chaosCirculatorIcon, blackCirculatorIcon], value: `${formatCostDecimal(maxValueTries)}회` }],
          } satisfies LabeledEdgeData,
        },
      };
    }

    if (resetType === ResetType.NORMAL) {
      // Normal reset can only roll legendary on row1 and unique on row2/row3, so the first-picked
      // option always targets row1 and the second-picked option targets row2/row3.
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
            title: `첫째줄 ${firstOption.abbreviation}`,
            rows: [{ icon: abilityNavIcon, value: formatCostFull(legendaryCostUnlocked) }],
          } satisfies LabeledEdgeData,
        },
      ];

      if (!secondOption) {
        const { node, edge } = buildValueMaxBranch(200);
        branchNodes.push(node);
        branchEdges.push(edge);
      }

      const secondThirdRowSlots = [NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY, NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY];

      if (secondOption && !thirdOption) {
        const uniqueChancePercent = secondOption.probabilityByGrade[PotentialGrade.UNIQUE] ?? 0;
        const secondResultText = formatAbilityResultRange(secondOption, PotentialGrade.UNIQUE);

        const uniqueCostUnlocked = normalResetCost(secondThirdRowSlots, uniqueChancePercent, 0, discountFactor);
        const uniqueCostRow1Locked = normalResetCost(secondThirdRowSlots, uniqueChancePercent, 1, discountFactor);
        const legendaryCostRow2Locked = normalResetCost([100], legendaryChancePercent, 1, discountFactor);

        branchNodes.push(
          { id: "result-u0", type: "result", position: { x: RESULT_X, y: 400 }, data: singleOptionTable("row2Col1", secondResultText, "unique") },
          { id: "result-final", type: "result", position: { x: FINAL_X, y: 240 }, data: legendaryPlusUniqueTable(resultText, secondResultText, "row2Col1") }
        );
        branchEdges.push(
          {
            id: "option->result-u0",
            source: "option",
            target: "result-u0",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${secondOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(uniqueCostUnlocked) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-0->result-final",
            source: "result-0",
            target: "result-final",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${secondOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(uniqueCostRow1Locked) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-u0->result-final",
            source: "result-u0",
            target: "result-final",
            type: "labeled",
            data: {
              title: `첫째줄 ${firstOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(legendaryCostRow2Locked) }],
            } satisfies LabeledEdgeData,
          }
        );

        // A circulator reroll on the finished 2-line result attempts both lines' values at once,
        // so success needs both to land on their own max tier in the same try.
        const secondMaxResultText = formatAbilityResultMax(secondOption, PotentialGrade.UNIQUE);
        const secondMaxValueProbabilityPercent = maxValueProbability(secondOption, PotentialGrade.UNIQUE);
        const combinedMaxFraction = (maxValueProbabilityPercent / 100) * (secondMaxValueProbabilityPercent / 100);
        const combinedMaxTries = combinedMaxFraction > 0 ? 1 / combinedMaxFraction : 0;

        branchNodes.push({
          id: "result-final-max",
          type: "result",
          position: { x: FINAL_X + 260, y: 240 },
          data: legendaryPlusUniqueTable(maxResultText, secondMaxResultText, "row2Col1"),
        });
        branchEdges.push({
          id: "result-final->result-final-max",
          source: "result-final",
          target: "result-final-max",
          type: "labeled",
          data: {
            title: `${firstOption.abbreviation} ${secondOption.abbreviation} 최대치`,
            rows: [{ icon: [chaosCirculatorIcon, blackCirculatorIcon], value: `${formatCostDecimal(combinedMaxTries)}회` }],
          } satisfies LabeledEdgeData,
        });
      }

      // With all 3 picked, the option node gets a 3rd initial branch (whichever unique option
      // lands first), and each branch locks its own row and fills in one more - converging on 3
      // shared two-option tables (legendary+left-unique, legendary+right-unique, both uniques).
      if (secondOption && thirdOption) {
        const secondUniqueChancePercent = secondOption.probabilityByGrade[PotentialGrade.UNIQUE] ?? 0;
        const thirdUniqueChancePercent = thirdOption.probabilityByGrade[PotentialGrade.UNIQUE] ?? 0;
        const secondResultText = formatAbilityResultRange(secondOption, PotentialGrade.UNIQUE);
        const thirdResultText = formatAbilityResultRange(thirdOption, PotentialGrade.UNIQUE);

        const secondUnlockedCost = normalResetCost(secondThirdRowSlots, secondUniqueChancePercent, 0, discountFactor);
        const thirdUnlockedCost = normalResetCost(secondThirdRowSlots, thirdUniqueChancePercent, 0, discountFactor);
        const legendaryLockedCost = normalResetCost([100], legendaryChancePercent, 1, discountFactor);
        // Row1 locked: the other unique row is still fully unlocked (both its lines), so this stays a union.
        const secondUnionLockedCost = normalResetCost(secondThirdRowSlots, secondUniqueChancePercent, 1, discountFactor);
        const thirdUnionLockedCost = normalResetCost(secondThirdRowSlots, thirdUniqueChancePercent, 1, discountFactor);
        // One unique row already locked: only one unique-eligible line is left, so this targets that single slot.
        const secondSingleLockedCost = normalResetCost([NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY], secondUniqueChancePercent, 1, discountFactor);
        const thirdSingleLockedCost = normalResetCost([NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY], thirdUniqueChancePercent, 1, discountFactor);

        branchNodes.push(
          { id: "result-uL", type: "result", position: { x: RESULT_X, y: 440 }, data: singleOptionTable("row2Col1", secondResultText, "unique") },
          { id: "result-uR", type: "result", position: { x: RESULT_X, y: 800 }, data: singleOptionTable("row2Col2", thirdResultText, "unique") },
          { id: "result-n1", type: "result", position: { x: FINAL_X, y: 240 }, data: legendaryPlusUniqueTable(resultText, secondResultText, "row2Col1") },
          { id: "result-n2", type: "result", position: { x: FINAL_X, y: 500 }, data: legendaryPlusUniqueTable(resultText, thirdResultText, "row2Col2") },
          { id: "result-n3", type: "result", position: { x: FINAL_X, y: 760 }, data: twoUniqueTable(secondResultText, thirdResultText) }
        );
        branchEdges.push(
          {
            id: "option->result-uL",
            source: "option",
            target: "result-uL",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${secondOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(secondUnlockedCost) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "option->result-uR",
            source: "option",
            target: "result-uR",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${thirdOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(thirdUnlockedCost) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-0->result-n1",
            source: "result-0",
            target: "result-n1",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${secondOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(secondUnionLockedCost) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-0->result-n2",
            source: "result-0",
            target: "result-n2",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${thirdOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(thirdUnionLockedCost) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-uL->result-n1",
            source: "result-uL",
            target: "result-n1",
            type: "labeled",
            data: {
              title: `첫째줄 ${firstOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(legendaryLockedCost) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-uL->result-n3",
            source: "result-uL",
            target: "result-n3",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${thirdOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(thirdSingleLockedCost) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-uR->result-n2",
            source: "result-uR",
            target: "result-n2",
            type: "labeled",
            data: {
              title: `첫째줄 ${firstOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(legendaryLockedCost) }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-uR->result-n3",
            source: "result-uR",
            target: "result-n3",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${secondOption.abbreviation}`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(secondSingleLockedCost) }],
            } satisfies LabeledEdgeData,
          }
        );
      }

      return { branchNodes, branchEdges };
    }

    // row2 and row3 roll with identical odds simultaneously in advanced reset, so they're treated as
    // one merged branch (row2col1) instead of two separate ones.
    const branches: { id: string; title: string; slotChancePercents: number[]; slot: ResultSlot; y: number }[] = [
      { id: "result-0", title: `첫째줄 ${firstOption.abbreviation}`, slotChancePercents: [100], slot: "row1", y: 80 },
      {
        id: "result-1",
        title: `둘째줄 또는 셋째줄 ${firstOption.abbreviation}`,
        slotChancePercents: [ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY, ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY],
        slot: "row2Col1",
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

    if (!secondOption) {
      const { node, edge } = buildValueMaxBranch(80);
      branchNodes.push(node);
      branchEdges.push(edge);
    }

    return { branchNodes, branchEdges };
  }, [firstOption, secondOption, thirdOption, resetType, reputationDiscount]);

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
