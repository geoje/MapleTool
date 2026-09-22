import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import abilityNavIcon from "@/assets/ability/icon.png";
import abyssCirculatorIcon from "@/assets/ability/abyss-circulator.webp";
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

// Advanced reset can land legendary on row1 AND row2/row3 at once, with either selected option
// ending up on either row - so a completed 2-option build has 2 equally valid arrangements.
function twoLegendaryTable(row1Text: string, row2Col1Text: string): ResultTableData {
  return {
    row1: { text: row1Text, grade: "legendary" },
    row2Col1: { text: row2Col1Text, grade: "legendary" },
    row2Col2: null,
  };
}

function twoUniqueTable(leftText: string, rightText: string): ResultTableData {
  return {
    row1: null,
    row2Col1: { text: leftText, grade: "unique" },
    row2Col2: { text: rightText, grade: "unique" },
  };
}

function allThreeTable(legendaryText: string, leftText: string, rightText: string): ResultTableData {
  return {
    row1: { text: legendaryText, grade: "legendary" },
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
// extraFactorPercent multiplies in one more independent per-try chance (e.g. also landing the max
// value step in the same roll, for a reset that redraws the option/grade/value all at once).
function normalResetCost(
  slotChancePercents: number[],
  optionChancePercent: number,
  lockCount: number,
  discountFactor: number,
  extraFactorPercent = 100
): number {
  const costPerTry = NORMAL_RESET_REPUTATION_COST[PotentialGrade.LEGENDARY]?.[NORMAL_RESET_LOCK_KEYS[lockCount]] ?? 0;
  const allMissFraction = slotChancePercents.reduce((acc, slotChancePercent) => {
    const fraction = (slotChancePercent / 100) * (optionChancePercent / 100) * (extraFactorPercent / 100);
    return acc * (1 - fraction);
  }, 1);
  const successFraction = 1 - allMissFraction;
  const expectedTries = successFraction > 0 ? 1 / successFraction : 0;
  return expectedTries * costPerTry * discountFactor;
}

const TIE_EPSILON = 1e-6;

// Finds, for every node reachable from startNodeId (typically the hovered table, or "option" for
// the whole graph), the cheapest cumulative reputation cost to reach it (circulator edges cost 0
// reputation) via a simple DAG relaxation, then backtracks from each leaf (a node nothing branches
// out of) to mark every edge on ANY route tied for cheapest - when several branches converge on the
// same node/leaf with equal cost, all of them get marked, not just whichever the relaxation settled
// on first. Nodes upstream of/unrelated to startNodeId are left out, since they're never reached.
//
// exclusiveLeafGroups marks sets of leaves that are mirrors of the same overall outcome (e.g. an
// advanced 2-option build with the 2 options swapped between row1 and row2/row3) - only the
// cheapest-to-reach member(s) of each group get backtracked from, so the pricier mirror still
// renders on the canvas but its route isn't highlighted.
function findCheapestRouteEdgeIds(nodes: Node[], edges: Edge[], startNodeId: string, exclusiveLeafGroups: string[][] = []): Set<string> {
  const bestCost = new Map<string, number>([[startNodeId, 0]]);

  let changed = true;
  while (changed) {
    changed = false;
    for (const edge of edges) {
      const sourceCost = bestCost.get(edge.source);
      if (sourceCost === undefined) continue;
      const reputationCost = (edge.data as LabeledEdgeData | undefined)?.reputationCost ?? 0;
      const candidateCost = sourceCost + reputationCost;
      const currentCost = bestCost.get(edge.target);
      if (currentCost === undefined || candidateCost < currentCost - TIE_EPSILON) {
        bestCost.set(edge.target, candidateCost);
        changed = true;
      }
    }
  }

  // Now that every node's true minimum is settled, collect every edge that achieves it - there
  // may be more than one per node.
  const bestIncomingEdgeIds = new Map<string, string[]>();
  for (const edge of edges) {
    const sourceCost = bestCost.get(edge.source);
    const targetCost = bestCost.get(edge.target);
    if (sourceCost === undefined || targetCost === undefined) continue;
    const reputationCost = (edge.data as LabeledEdgeData | undefined)?.reputationCost ?? 0;
    if (Math.abs(sourceCost + reputationCost - targetCost) < TIE_EPSILON) {
      bestIncomingEdgeIds.set(edge.target, [...(bestIncomingEdgeIds.get(edge.target) ?? []), edge.id]);
    }
  }

  const nodesWithOutgoingEdge = new Set(edges.map((edge) => edge.source));
  const groupedLeafIds = new Set(exclusiveLeafGroups.flat());
  const ungroupedLeafIds = nodes.filter((node) => !nodesWithOutgoingEdge.has(node.id) && !groupedLeafIds.has(node.id)).map((node) => node.id);
  const winningGroupLeafIds = exclusiveLeafGroups.flatMap((group) => {
    const reachableCosts = group.map((id) => bestCost.get(id)).filter((cost): cost is number => cost !== undefined);
    if (reachableCosts.length === 0) return [];
    const minCost = Math.min(...reachableCosts);
    return group.filter((id) => {
      const cost = bestCost.get(id);
      return cost !== undefined && cost - minCost < TIE_EPSILON;
    });
  });

  const highlightedEdgeIds = new Set<string>();
  const queue = [...ungroupedLeafIds, ...winningGroupLeafIds];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const nodeId = queue.pop()!;
    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    for (const edgeId of bestIncomingEdgeIds.get(nodeId) ?? []) {
      highlightedEdgeIds.add(edgeId);
      const source = edges.find((edge) => edge.id === edgeId)?.source;
      if (source) queue.push(source);
    }
  }

  return highlightedEdgeIds;
}

export function AbilityBuildPage() {
  const [selectedOptionNames, setSelectedOptionNames] = useState<Set<string>>(new Set([DEFAULT_SELECTED_OPTION]));
  const [reputationDiscount, setReputationDiscount] = useState(false);
  const [resetType, setResetType] = useState<ResetType>(ResetType.ADVANCED);
  // Defaults to "option" so the whole-graph cheapest route shows even before anything is hovered.
  const [hoveredNodeId, setHoveredNodeId] = useState<string>("option");
  // Touch devices have no hover - tapping a table pins its route so it stays shown after the tap
  // ends. Pin wins over hover whenever it's set; tapping the same table again or tapping empty
  // canvas clears it.
  const [pinnedNodeId, setPinnedNodeId] = useState<string | null>(null);

  const onNodeMouseEnter = useCallback((_: unknown, node: Node) => setHoveredNodeId(node.id), []);
  const onNodeMouseLeave = useCallback(() => setHoveredNodeId("option"), []);
  const onNodeClick = useCallback((_: unknown, node: Node) => setPinnedNodeId((prev) => (prev === node.id ? null : node.id)), []);
  const onPaneClick = useCallback(() => setPinnedNodeId(null), []);

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

  const {
    branchNodes,
    branchEdges: rawBranchEdges,
    exclusiveLeafGroups,
  } = useMemo<{ branchNodes: Node[]; branchEdges: Edge[]; exclusiveLeafGroups: string[][] }>(() => {
    if (!firstOption) return { branchNodes: [], branchEdges: [], exclusiveLeafGroups: [] };

    const legendaryChancePercent = firstOption.probabilityByGrade[PotentialGrade.LEGENDARY] ?? 0;
    const resultText = formatAbilityResultRange(firstOption);

    const discountFactor = reputationDiscount ? 0.5 : 1;

    // Once a row is at legendary, a circulator reroll can still push its numeric value up to the
    // max of the range - shown as one more step off that row's result node, only when a single
    // option is selected for now. Row1 accepts either chaos or black circulator; rows 2/3 only
    // reach legendary via advanced reset and require the abyss circulator ("어서큘") instead.
    const maxResultText = formatAbilityResultMax(firstOption);
    const maxValueProbabilityPercent = maxValueProbability(firstOption);
    const maxValueTries = maxValueProbabilityPercent > 0 ? 1 / (maxValueProbabilityPercent / 100) : 0;

    function buildValueMaxBranch(sourceId: string, slot: ResultSlot, icon: string | string[], y: number): { node: Node; edge: Edge } {
      const targetId = `${sourceId}-max`;
      return {
        node: { id: targetId, type: "result", position: { x: FINAL_X, y }, data: singleOptionTable(slot, maxResultText) },
        edge: {
          id: `${sourceId}->${targetId}`,
          source: sourceId,
          target: targetId,
          type: "labeled",
          data: {
            title: `${firstOption.abbreviation} 최대치`,
            rows: [{ icon, value: `${formatCostDecimal(maxValueTries)}회` }],
          } satisfies LabeledEdgeData,
        },
      };
    }

    let branchNodes: Node[];
    let branchEdges: Edge[];
    let exclusiveLeafGroups: string[][] = [];

    if (resetType === ResetType.NORMAL) {
      // Normal reset can only roll legendary on row1 and unique on row2/row3, so the first-picked
      // option always targets row1 and the second-picked option targets row2/row3.
      const legendaryCostUnlocked = normalResetCost([100], legendaryChancePercent, 0, discountFactor);

      branchNodes = [
        { id: "result-0", type: "result", position: { x: RESULT_X, y: secondOption ? 80 : 200 }, data: singleOptionTable("row1", resultText) },
      ];
      branchEdges = [
        {
          id: "option->result-0",
          source: "option",
          target: "result-0",
          type: "labeled",
          data: {
            title: `첫째줄 ${firstOption.abbreviation}`,
            rows: [{ icon: abilityNavIcon, value: formatCostFull(legendaryCostUnlocked) }],
            reputationCost: legendaryCostUnlocked,
          } satisfies LabeledEdgeData,
        },
      ];

      if (!secondOption) {
        const { node, edge } = buildValueMaxBranch("result-0", "row1", [chaosCirculatorIcon, blackCirculatorIcon], 200);
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
              reputationCost: uniqueCostUnlocked,
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
              reputationCost: uniqueCostRow1Locked,
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
              reputationCost: legendaryCostRow2Locked,
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
              reputationCost: secondUnlockedCost,
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
              reputationCost: thirdUnlockedCost,
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
              reputationCost: secondUnionLockedCost,
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
              reputationCost: thirdUnionLockedCost,
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
              reputationCost: legendaryLockedCost,
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
              reputationCost: thirdSingleLockedCost,
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
              reputationCost: legendaryLockedCost,
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
              reputationCost: secondSingleLockedCost,
            } satisfies LabeledEdgeData,
          }
        );

        // From each 2-option table: circulate both already-placed options to their max value (1
        // branch each), then lock those 2 lines and use a normal reset to pull the missing line
        // as its option AND max value in one roll - all 3 paths converge on the same final table.
        const secondMaxResultText = formatAbilityResultMax(secondOption, PotentialGrade.UNIQUE);
        const thirdMaxResultText = formatAbilityResultMax(thirdOption, PotentialGrade.UNIQUE);
        const secondMaxValueProbabilityPercent = maxValueProbability(secondOption, PotentialGrade.UNIQUE);
        const thirdMaxValueProbabilityPercent = maxValueProbability(thirdOption, PotentialGrade.UNIQUE);

        const n1MaxFraction = (maxValueProbabilityPercent / 100) * (secondMaxValueProbabilityPercent / 100);
        const n2MaxFraction = (maxValueProbabilityPercent / 100) * (thirdMaxValueProbabilityPercent / 100);
        const n3MaxFraction = (secondMaxValueProbabilityPercent / 100) * (thirdMaxValueProbabilityPercent / 100);

        const thirdMissingCost = normalResetCost(
          [NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY],
          thirdUniqueChancePercent,
          2,
          discountFactor,
          thirdMaxValueProbabilityPercent
        );
        const secondMissingCost = normalResetCost(
          [NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY],
          secondUniqueChancePercent,
          2,
          discountFactor,
          secondMaxValueProbabilityPercent
        );
        const legendaryMissingCost = normalResetCost([100], legendaryChancePercent, 2, discountFactor, maxValueProbabilityPercent);

        branchNodes.push(
          { id: "result-n1-max", type: "result", position: { x: FINAL_X + 260, y: 100 }, data: legendaryPlusUniqueTable(maxResultText, secondMaxResultText, "row2Col1") },
          { id: "result-n2-max", type: "result", position: { x: FINAL_X + 260, y: 440 }, data: legendaryPlusUniqueTable(maxResultText, thirdMaxResultText, "row2Col2") },
          { id: "result-n3-max", type: "result", position: { x: FINAL_X + 260, y: 780 }, data: twoUniqueTable(secondMaxResultText, thirdMaxResultText) },
          {
            id: "result-final3",
            type: "result",
            position: { x: FINAL_X + 520, y: 440 },
            data: allThreeTable(maxResultText, secondMaxResultText, thirdMaxResultText),
          }
        );
        branchEdges.push(
          {
            id: "result-n1->result-n1-max",
            source: "result-n1",
            target: "result-n1-max",
            type: "labeled",
            data: {
              title: `${firstOption.abbreviation} ${secondOption.abbreviation} 최대치`,
              rows: [{ icon: [chaosCirculatorIcon, blackCirculatorIcon], value: `${formatCostDecimal(1 / n1MaxFraction)}회` }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-n2->result-n2-max",
            source: "result-n2",
            target: "result-n2-max",
            type: "labeled",
            data: {
              title: `${firstOption.abbreviation} ${thirdOption.abbreviation} 최대치`,
              rows: [{ icon: [chaosCirculatorIcon, blackCirculatorIcon], value: `${formatCostDecimal(1 / n2MaxFraction)}회` }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-n3->result-n3-max",
            source: "result-n3",
            target: "result-n3-max",
            type: "labeled",
            data: {
              title: `${secondOption.abbreviation} ${thirdOption.abbreviation} 최대치`,
              rows: [{ icon: [chaosCirculatorIcon, blackCirculatorIcon], value: `${formatCostDecimal(1 / n3MaxFraction)}회` }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-n1-max->result-final3",
            source: "result-n1-max",
            target: "result-final3",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${thirdOption.abbreviation} 최대치`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(thirdMissingCost) }],
              reputationCost: thirdMissingCost,
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-n2-max->result-final3",
            source: "result-n2-max",
            target: "result-final3",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${secondOption.abbreviation} 최대치`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(secondMissingCost) }],
              reputationCost: secondMissingCost,
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-n3-max->result-final3",
            source: "result-n3-max",
            target: "result-final3",
            type: "labeled",
            data: {
              title: `첫째줄 ${firstOption.abbreviation} 최대치`,
              rows: [{ icon: abilityNavIcon, value: formatCostFull(legendaryMissingCost) }],
              reputationCost: legendaryMissingCost,
            } satisfies LabeledEdgeData,
          }
        );
      }
    } else {
      // row2 and row3 roll with identical odds simultaneously in advanced reset, so they're treated
      // as one merged branch (row2col1) instead of two separate ones.
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

      branchNodes = [];
      branchEdges = [];

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
            reputationCost,
          } satisfies LabeledEdgeData,
        });
      });

      if (!secondOption) {
        // Chaos/black circulators can't touch a row won through advanced reset - only the abyss
        // circulator can, regardless of which row the legendary line landed on.
        const row1Max = buildValueMaxBranch("result-0", "row1", abyssCirculatorIcon, 80);
        const row23Max = buildValueMaxBranch("result-1", "row2Col1", abyssCirculatorIcon, 520);
        branchNodes.push(row1Max.node, row23Max.node);
        branchEdges.push(row1Max.edge, row23Max.edge);
      }

      // Unlike normal reset (where the 2nd pick can only ever be unique on row2/row3), advanced
      // reset lets BOTH picks land legendary on EITHER row - so the completed build has 2 equally
      // valid arrangements (first on row1/second on row2-3, or swapped). Both get built in full,
      // but only the actually-cheaper arrangement should read as the recommended route (handled via
      // exclusiveLeafGroups below), since the end result is the same option set either way.
      if (secondOption && !thirdOption) {
        const secondThirdSlots = [ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY, ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY];
        const secondLegendaryChancePercent = secondOption.probabilityByGrade[PotentialGrade.LEGENDARY] ?? 0;
        const secondResultText = formatAbilityResultRange(secondOption);

        // Mirror of the result-0/result-1 branches above, but targeting the second-picked option -
        // each is a 2nd starting point that the OTHER option's branch can also converge into.
        const { reputationCost: secondRow1Cost, mesoCost: secondRow1Meso } = advancedResetCost([100], secondLegendaryChancePercent, 0, discountFactor);
        const { reputationCost: secondRow23Cost, mesoCost: secondRow23Meso } = advancedResetCost(secondThirdSlots, secondLegendaryChancePercent, 0, discountFactor);

        branchNodes.push(
          { id: "result-0b", type: "result", position: { x: RESULT_X, y: 260 }, data: singleOptionTable("row1", secondResultText) },
          { id: "result-1b", type: "result", position: { x: RESULT_X, y: 700 }, data: singleOptionTable("row2Col1", secondResultText) }
        );
        branchEdges.push(
          {
            id: "option->result-0b",
            source: "option",
            target: "result-0b",
            type: "labeled",
            data: {
              title: `첫째줄 ${secondOption.abbreviation}`,
              rows: [
                { icon: abilityNavIcon, value: formatCostFull(secondRow1Cost) },
                { icon: mesoIcon, value: formatCostDecimal(secondRow1Meso) },
              ],
              reputationCost: secondRow1Cost,
            } satisfies LabeledEdgeData,
          },
          {
            id: "option->result-1b",
            source: "option",
            target: "result-1b",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${secondOption.abbreviation}`,
              rows: [
                { icon: abilityNavIcon, value: formatCostFull(secondRow23Cost) },
                { icon: mesoIcon, value: formatCostDecimal(secondRow23Meso) },
              ],
              reputationCost: secondRow23Cost,
            } satisfies LabeledEdgeData,
          }
        );

        // finalA: first locked on row1, second fills row2/row3 - reachable either from result-0
        // (lock row1, roll for second) or from result-1b (lock row2/row3, roll for first).
        // finalB is the mirror (rows swapped).
        const { reputationCost: addSecondToRow23Cost, mesoCost: addSecondToRow23Meso } = advancedResetCost(secondThirdSlots, secondLegendaryChancePercent, 1, discountFactor);
        const { reputationCost: addFirstToRow1Cost, mesoCost: addFirstToRow1Meso } = advancedResetCost([100], legendaryChancePercent, 1, discountFactor);
        const { reputationCost: addSecondToRow1Cost, mesoCost: addSecondToRow1Meso } = advancedResetCost([100], secondLegendaryChancePercent, 1, discountFactor);
        const { reputationCost: addFirstToRow23Cost, mesoCost: addFirstToRow23Meso } = advancedResetCost(secondThirdSlots, legendaryChancePercent, 1, discountFactor);

        branchNodes.push(
          { id: "result-finalA", type: "result", position: { x: FINAL_X, y: 170 }, data: twoLegendaryTable(resultText, secondResultText) },
          { id: "result-finalB", type: "result", position: { x: FINAL_X, y: 610 }, data: twoLegendaryTable(secondResultText, resultText) }
        );
        branchEdges.push(
          {
            id: "result-0->result-finalA",
            source: "result-0",
            target: "result-finalA",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${secondOption.abbreviation}`,
              rows: [
                { icon: abilityNavIcon, value: formatCostFull(addSecondToRow23Cost) },
                { icon: mesoIcon, value: formatCostDecimal(addSecondToRow23Meso) },
              ],
              reputationCost: addSecondToRow23Cost,
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-1b->result-finalA",
            source: "result-1b",
            target: "result-finalA",
            type: "labeled",
            data: {
              title: `첫째줄 ${firstOption.abbreviation}`,
              rows: [
                { icon: abilityNavIcon, value: formatCostFull(addFirstToRow1Cost) },
                { icon: mesoIcon, value: formatCostDecimal(addFirstToRow1Meso) },
              ],
              reputationCost: addFirstToRow1Cost,
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-1->result-finalB",
            source: "result-1",
            target: "result-finalB",
            type: "labeled",
            data: {
              title: `첫째줄 ${secondOption.abbreviation}`,
              rows: [
                { icon: abilityNavIcon, value: formatCostFull(addSecondToRow1Cost) },
                { icon: mesoIcon, value: formatCostDecimal(addSecondToRow1Meso) },
              ],
              reputationCost: addSecondToRow1Cost,
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-0b->result-finalB",
            source: "result-0b",
            target: "result-finalB",
            type: "labeled",
            data: {
              title: `둘째줄 또는 셋째줄 ${firstOption.abbreviation}`,
              rows: [
                { icon: abilityNavIcon, value: formatCostFull(addFirstToRow23Cost) },
                { icon: mesoIcon, value: formatCostDecimal(addFirstToRow23Meso) },
              ],
              reputationCost: addFirstToRow23Cost,
            } satisfies LabeledEdgeData,
          }
        );

        // Chaos/black circulators can't touch a line won through advanced reset, regardless of
        // row - only the abyss circulator can. Like the normal-reset combined max above, one
        // application rerolls every placed row's value at once, so success needs both rows'
        // independent max-tier odds to land in the same try (1 combined row, not 2).
        const secondMaxResultText = formatAbilityResultMax(secondOption);
        const secondMaxValueProbabilityPercent = maxValueProbability(secondOption);
        const advancedCombinedMaxFraction = (maxValueProbabilityPercent / 100) * (secondMaxValueProbabilityPercent / 100);
        const advancedCombinedMaxTries = advancedCombinedMaxFraction > 0 ? 1 / advancedCombinedMaxFraction : 0;

        branchNodes.push(
          { id: "result-finalA-max", type: "result", position: { x: FINAL_X + 260, y: 170 }, data: twoLegendaryTable(maxResultText, secondMaxResultText) },
          { id: "result-finalB-max", type: "result", position: { x: FINAL_X + 260, y: 610 }, data: twoLegendaryTable(secondMaxResultText, maxResultText) }
        );
        branchEdges.push(
          {
            id: "result-finalA->result-finalA-max",
            source: "result-finalA",
            target: "result-finalA-max",
            type: "labeled",
            data: {
              title: `${firstOption.abbreviation} ${secondOption.abbreviation} 최대치`,
              rows: [{ icon: abyssCirculatorIcon, value: `${formatCostDecimal(advancedCombinedMaxTries)}회` }],
            } satisfies LabeledEdgeData,
          },
          {
            id: "result-finalB->result-finalB-max",
            source: "result-finalB",
            target: "result-finalB-max",
            type: "labeled",
            data: {
              title: `${firstOption.abbreviation} ${secondOption.abbreviation} 최대치`,
              rows: [{ icon: abyssCirculatorIcon, value: `${formatCostDecimal(advancedCombinedMaxTries)}회` }],
            } satisfies LabeledEdgeData,
          }
        );

        // Both arrangements reach the exact same 2-option outcome, just with the rows swapped -
        // only the actually-cheaper one should be highlighted as the recommended route.
        exclusiveLeafGroups = [["result-finalA-max", "result-finalB-max"]];
      }
    }

    return { branchNodes, branchEdges, exclusiveLeafGroups };
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
      ...branchNodes.map((node) => ({ ...node, data: { ...node.data, pinned: node.id === pinnedNodeId } })),
    ],
    [selectedOptionNames, onChangeSelected, reputationDiscount, onToggleDiscount, resetType, branchNodes, pinnedNodeId]
  );

  // Hovering (or, on touch, tapping/pinning) a table highlights the cheapest route from THAT table
  // onward to its goal - defaults to "option" (the whole-graph cheapest route) otherwise.
  const activeRouteNodeId = pinnedNodeId ?? hoveredNodeId;
  const branchEdges = useMemo(() => {
    const cheapestRouteEdgeIds = findCheapestRouteEdgeIds(branchNodes, rawBranchEdges, activeRouteNodeId, exclusiveLeafGroups);
    if (cheapestRouteEdgeIds.size === 0) return rawBranchEdges;
    return rawBranchEdges.map((edge) =>
      cheapestRouteEdgeIds.has(edge.id) ? { ...edge, data: { ...(edge.data as LabeledEdgeData), highlighted: true } } : edge
    );
  }, [rawBranchEdges, branchNodes, activeRouteNodeId, exclusiveLeafGroups]);

  return (
    <ReactFlow
      className="h-full w-full"
      nodes={nodes}
      edges={branchEdges}
      nodeTypes={NODE_TYPES}
      edgeTypes={EDGE_TYPES}
      defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
      proOptions={{ hideAttribution: true }}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseLeave={onNodeMouseLeave}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
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
