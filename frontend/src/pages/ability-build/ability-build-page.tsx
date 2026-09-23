import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";
import type { Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import abilityNavIcon from "@/assets/ability/icon.png";
import abyssCirculatorIcon from "@/assets/ability/abyss-circulator.webp";
import blackCirculatorIcon from "@/assets/ability/black-circulator.webp";
import chaosCirculatorIcon from "@/assets/ability/chaos-circulator.webp";
import mesoIcon from "@/assets/enhance/meso.png";
import {
  ABILITY_OPTION_INFOS,
  ABYSS_CIRCULATOR_POINT_COST,
  ADVANCED_RESET_COST_BY_LOCK_COUNT,
  ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY,
  convertReputationToMeso,
  formatAbilityResultMax,
  formatAbilityResultRange,
  HONOR_MEDAL_DEFAULT_PRICE,
  maxValueProbability,
  MAX_SELECTED_ABILITY_OPTIONS,
  NORMAL_RESET_REPUTATION_COST,
  NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY,
  resolveSelectedOptionOrder,
  ResetType,
} from "@/constants/ability";
import { PotentialGrade } from "@/constants/enhance";
import type { CubeGrade } from "@/hooks/use-cube-probability";
import { formatCostDecimal, formatCostFull } from "@/lib/format";
import { convertPointsToMeso, fetchMesoMarketRate } from "@/lib/meso-market-service";
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

// Advanced reset can land legendary on any row, with any selected option ending up on any row -
// so a completed 2 or 3-option build has multiple equally valid arrangements, differing only in
// which row each option occupies. null omits a row entirely (not yet locked in for this table).
function legendaryCellsTable(row1Text: string | null, row2Col1Text: string | null, row2Col2Text: string | null): ResultTableData {
  return {
    row1: row1Text !== null ? { text: row1Text, grade: "legendary" } : null,
    row2Col1: row2Col1Text !== null ? { text: row2Col1Text, grade: "legendary" } : null,
    row2Col2: row2Col2Text !== null ? { text: row2Col2Text, grade: "legendary" } : null,
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
// extraFactorPercent multiplies in one more independent per-try chance (e.g. also landing the max
// value step in the same roll, for a reset that redraws the option/grade/value all at once) - same
// role as normalResetCost's parameter of the same name.
function advancedResetCost(
  slotChancePercents: number[],
  optionLegendaryChancePercent: number,
  lockCount: number,
  discountFactor: number,
  extraFactorPercent = 100
): { reputationCost: number; mesoCost: number } {
  const { reputation: reputationPerTry, meso: mesoPerTry } = ADVANCED_RESET_COST_BY_LOCK_COUNT[lockCount];
  const allMissFraction = slotChancePercents.reduce((acc, slotChancePercent) => {
    const fraction = (slotChancePercent / 100) * (optionLegendaryChancePercent / 100) * (extraFactorPercent / 100);
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
//
// getEdgeCost picks which currency an edge's cost is measured in - defaults to reputationCost
// (명성치), but advanced reset passes a meso-only cost (reputation converted via the 명예의 훈장
// price, plus meso cost, plus circulator meso-equivalent price) so routes can be compared purely
// in meso.
function findCheapestRouteEdgeIds(
  nodes: Node[],
  edges: Edge[],
  startNodeId: string,
  exclusiveLeafGroups: string[][] = [],
  getEdgeCost: (edge: Edge) => number = (edge) => (edge.data as LabeledEdgeData | undefined)?.reputationCost ?? 0
): Set<string> {
  const bestCost = new Map<string, number>([[startNodeId, 0]]);

  let changed = true;
  while (changed) {
    changed = false;
    for (const edge of edges) {
      const sourceCost = bestCost.get(edge.source);
      if (sourceCost === undefined) continue;
      const edgeCost = getEdgeCost(edge);
      const candidateCost = sourceCost + edgeCost;
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
    const edgeCost = getEdgeCost(edge);
    if (Math.abs(sourceCost + edgeCost - targetCost) < TIE_EPSILON) {
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
  const [honorMedalPrice, setHonorMedalPrice] = useState(HONOR_MEDAL_DEFAULT_PRICE);
  const [circulatorPrice, setCirculatorPrice] = useState(0);
  const [isFetchingCirculatorPrice, setIsFetchingCirculatorPrice] = useState(true);

  // The abyss circulator has no in-game meso price - only a 메이플포인트 price - so its meso
  // equivalent is derived once from the live meso-market exchange rate and used as the default;
  // the user can still override it afterward like any other price input.
  useEffect(() => {
    fetchMesoMarketRate()
      .then((rate) => {
        if (rate) setCirculatorPrice(convertPointsToMeso(ABYSS_CIRCULATOR_POINT_COST, rate));
      })
      .finally(() => setIsFetchingCirculatorPrice(false));
  }, []);
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

  const firstSelectedName = resolveSelectedOptionOrder(selectedOptionNames)[0];
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
            title: `${firstOption!.abbreviation} 최대치`,
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
      const secondThirdSlots = [ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY, ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY];
      const singleSecondThirdSlot = [ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY];

      branchNodes = [];
      branchEdges = [];

      // An edge whose cost is a reputation+meso advanced reset try.
      function advancedEdge(id: string, source: string, target: string, title: string, cost: { reputationCost: number; mesoCost: number }): Edge {
        return {
          id,
          source,
          target,
          type: "labeled",
          data: {
            title,
            rows: [
              { icon: abilityNavIcon, value: formatCostFull(cost.reputationCost) },
              { icon: mesoIcon, value: formatCostDecimal(cost.mesoCost) },
            ],
            reputationCost: cost.reputationCost,
            mesoCost: cost.mesoCost,
          } satisfies LabeledEdgeData,
        };
      }

      // Chaos/black circulators can't touch a row won through advanced reset - only the abyss
      // circulator can. One application rerolls every already-placed row's value at once (0
      // reputation cost, so it never affects the reputation-only cheapest-route calculation) but
      // does cost meso (via circulatorPrice), which factors into the meso-only comparison instead.
      function abyssMaxEdge(id: string, source: string, target: string, title: string, tries: number): Edge {
        return {
          id,
          source,
          target,
          type: "labeled",
          data: {
            title,
            rows: [{ icon: abyssCirculatorIcon, value: `${formatCostDecimal(tries)}회` }],
            mesoCost: tries * circulatorPrice,
          } satisfies LabeledEdgeData,
        };
      }

      if (!thirdOption) {
        // Row1 always rolls legendary at 100% odds regardless of lock state, so locking it in
        // first is never worth it - it only pays a higher per-try cost for the still-pending rare
        // row2/row3 draw. Once a 2nd option is picked, row1 is only ever filled in LAST (after
        // row2/row3 has already landed), so result-0 (row1 first) is dropped entirely then.
        const branches: { id: string; title: string; slotChancePercents: number[]; slot: ResultSlot; y: number }[] = secondOption
          ? [{ id: "result-1", title: `둘째줄 또는 셋째줄 ${firstOption.abbreviation}`, slotChancePercents: secondThirdSlots, slot: "row2Col1", y: 520 }]
          : [
              { id: "result-0", title: `첫째줄 ${firstOption.abbreviation}`, slotChancePercents: [100], slot: "row1", y: 80 },
              { id: "result-1", title: `둘째줄 또는 셋째줄 ${firstOption.abbreviation}`, slotChancePercents: secondThirdSlots, slot: "row2Col1", y: 520 },
            ];

        branches.forEach(({ id, title, slotChancePercents, slot, y }) => {
          const cost = advancedResetCost(slotChancePercents, legendaryChancePercent, 0, discountFactor);
          branchNodes.push({ id, type: "result", position: { x: RESULT_X, y }, data: singleOptionTable(slot, resultText) });
          branchEdges.push(advancedEdge(`option->${id}`, "option", id, title, cost));
        });

        if (!secondOption) {
          const row1Max = buildValueMaxBranch("result-0", "row1", abyssCirculatorIcon, 80);
          const row23Max = buildValueMaxBranch("result-1", "row2Col1", abyssCirculatorIcon, 520);
          branchNodes.push(row1Max.node, row23Max.node);
          branchEdges.push(row1Max.edge, row23Max.edge);

          // Landing the lone selected option on row1 vs row2/row3 are 2 alternative ways to reach
          // the exact same goal (that option at max legendary, on any row) - only the actually
          // cheaper one should be highlighted as the recommended route.
          exclusiveLeafGroups = [[row1Max.node.id, row23Max.node.id]];
        }

        // Unlike normal reset (where the 2nd pick can only ever be unique on row2/row3), advanced
        // reset lets BOTH picks land legendary on EITHER row - so the completed build has 2 equally
        // valid arrangements (first on row1/second on row2-3, or swapped). Both get built in full,
        // but only the actually-cheaper arrangement should read as the recommended route (handled
        // via exclusiveLeafGroups below), since the end result is the same option set either way.
        // Each arrangement has exactly 1 entry point - the row2/row3 pick locks in first, row1 last.
        if (secondOption) {
          const secondLegendaryChancePercent = secondOption.probabilityByGrade[PotentialGrade.LEGENDARY] ?? 0;
          const secondResultText = formatAbilityResultRange(secondOption);

          // Mirror of the result-1 branch above, but targeting the second-picked option.
          branchNodes.push({ id: "result-1b", type: "result", position: { x: RESULT_X, y: 700 }, data: singleOptionTable("row2Col1", secondResultText) });
          branchEdges.push(
            advancedEdge(
              "option->result-1b",
              "option",
              "result-1b",
              `둘째줄 또는 셋째줄 ${secondOption.abbreviation}`,
              advancedResetCost(secondThirdSlots, secondLegendaryChancePercent, 0, discountFactor)
            )
          );

          // finalA: second locked on row2/row3 first, first fills row1 last. finalB is the mirror.
          branchNodes.push(
            { id: "result-finalA", type: "result", position: { x: FINAL_X, y: 170 }, data: legendaryCellsTable(resultText, secondResultText, null) },
            { id: "result-finalB", type: "result", position: { x: FINAL_X, y: 610 }, data: legendaryCellsTable(secondResultText, resultText, null) }
          );
          branchEdges.push(
            advancedEdge("result-1b->result-finalA", "result-1b", "result-finalA", `첫째줄 ${firstOption.abbreviation}`, advancedResetCost([100], legendaryChancePercent, 1, discountFactor)),
            advancedEdge("result-1->result-finalB", "result-1", "result-finalB", `첫째줄 ${secondOption.abbreviation}`, advancedResetCost([100], secondLegendaryChancePercent, 1, discountFactor))
          );

          // 1 combined abyss-circulator try maxes both already-placed rows at once.
          const secondMaxResultText = formatAbilityResultMax(secondOption);
          const secondMaxValueProbabilityPercent = maxValueProbability(secondOption);
          const combinedMaxFraction = (maxValueProbabilityPercent / 100) * (secondMaxValueProbabilityPercent / 100);
          const combinedMaxTries = combinedMaxFraction > 0 ? 1 / combinedMaxFraction : 0;

          branchNodes.push(
            { id: "result-finalA-max", type: "result", position: { x: FINAL_X + 260, y: 170 }, data: legendaryCellsTable(maxResultText, secondMaxResultText, null) },
            { id: "result-finalB-max", type: "result", position: { x: FINAL_X + 260, y: 610 }, data: legendaryCellsTable(secondMaxResultText, maxResultText, null) }
          );
          branchEdges.push(
            abyssMaxEdge("result-finalA->result-finalA-max", "result-finalA", "result-finalA-max", `${firstOption.abbreviation} ${secondOption.abbreviation} 최대치`, combinedMaxTries),
            abyssMaxEdge("result-finalB->result-finalB-max", "result-finalB", "result-finalB-max", `${firstOption.abbreviation} ${secondOption.abbreviation} 최대치`, combinedMaxTries)
          );

          // Both arrangements reach the exact same 2-option outcome, just with the rows swapped -
          // only the actually-cheaper one should be highlighted as the recommended route.
          exclusiveLeafGroups = [["result-finalA-max", "result-finalB-max"]];
        }
      } else {
        // 3 selected options can each land on any of the 3 rows, so a completed build has 3 equally
        // valid "anchor" arrangements - whichever option ends up on row1 (the always-legendary row),
        // with the other 2 filling row2/row3 (assigned by original pick order, since row2 vs row3
        // doesn't affect cost - they're interchangeable). All 3 render in full; only the actually
        // cheapest anchor is highlighted (via exclusiveLeafGroups). Row1 always rolls legendary at
        // 100% odds regardless of lock state, so it's never worth locking in before row2 AND row3
        // have both already landed - the anchor is only ever added last, after both other options.
        const options = [firstOption, secondOption, thirdOption];

        // Each option only ever enters the graph one way (drawn into row2/row3 with nothing else
        // locked yet), regardless of which arrangement it ends up anchoring or filling a column
        // for - so it gets exactly 1 shared node here instead of 1 per arrangement. Its eventual
        // row2/row3 column is decided later (per arrangement, below), so it's shown provisionally
        // in row2's left column.
        const singleNodes = options.map((option, index) => {
          const chance = option.probabilityByGrade[PotentialGrade.LEGENDARY] ?? 0;
          const text = formatAbilityResultRange(option);
          const id = `result-single-${index}`;
          const y = 100 + index * 400;
          branchNodes.push({ id, type: "result", position: { x: RESULT_X, y }, data: legendaryCellsTable(null, text, null) });
          branchEdges.push(
            advancedEdge(`option->${id}`, "option", id, `둘째줄 또는 셋째줄 ${option.abbreviation}`, advancedResetCost(secondThirdSlots, chance, 0, discountFactor))
          );
          return { id, text, chance, y };
        });

        // From the shared single nodes for the 2 non-anchor options: draw the other one into
        // row2/row3 next, then max both via 1 combined abyss-circulator try, then advanced-reset
        // pulls row1 as the anchor option AND its max value at once.
        //
        // The pair node sits vertically centered between its 2 source single nodes (rather than a
        // fixed per-arrangement slot) - since the 3 single nodes are evenly spaced, this keeps every
        // edge's label (which renders at its path midpoint) at a distinct position; a shared fixed
        // slot per arrangement made 2 unrelated edges land on the exact same midpoint and overlap.
        function buildArrangement(anchorIndex: number, aIndex: number, bIndex: number, idPrefix: string): string {
          const anchor = options[anchorIndex];
          const a = options[aIndex];
          const b = options[bIndex];
          const aNode = singleNodes[aIndex];
          const bNode = singleNodes[bIndex];
          const y = (aNode.y + bNode.y) / 2;

          const n3Id = `${idPrefix}-n3`;
          const n3MaxId = `${idPrefix}-n3-max`;
          const finalId = `${idPrefix}-final`;

          branchNodes.push({ id: n3Id, type: "result", position: { x: FINAL_X, y }, data: legendaryCellsTable(null, aNode.text, bNode.text) });
          branchEdges.push(
            advancedEdge(`${aNode.id}->${n3Id}`, aNode.id, n3Id, `둘째줄 또는 셋째줄 ${b.abbreviation}`, advancedResetCost(singleSecondThirdSlot, bNode.chance, 1, discountFactor)),
            advancedEdge(`${bNode.id}->${n3Id}`, bNode.id, n3Id, `둘째줄 또는 셋째줄 ${a.abbreviation}`, advancedResetCost(singleSecondThirdSlot, aNode.chance, 1, discountFactor))
          );

          const anchorChance = anchor.probabilityByGrade[PotentialGrade.LEGENDARY] ?? 0;
          const anchorMaxText = formatAbilityResultMax(anchor);
          const aMaxText = formatAbilityResultMax(a);
          const bMaxText = formatAbilityResultMax(b);
          const anchorMaxProbabilityPercent = maxValueProbability(anchor);
          const aMaxProbabilityPercent = maxValueProbability(a);
          const bMaxProbabilityPercent = maxValueProbability(b);

          const n3MaxFraction = (aMaxProbabilityPercent / 100) * (bMaxProbabilityPercent / 100);

          branchNodes.push(
            { id: n3MaxId, type: "result", position: { x: FINAL_X + 260, y }, data: legendaryCellsTable(null, aMaxText, bMaxText) },
            { id: finalId, type: "result", position: { x: FINAL_X + 520, y }, data: legendaryCellsTable(anchorMaxText, aMaxText, bMaxText) }
          );
          branchEdges.push(
            abyssMaxEdge(`${n3Id}->${n3MaxId}`, n3Id, n3MaxId, `${a.abbreviation} ${b.abbreviation} 최대치`, n3MaxFraction > 0 ? 1 / n3MaxFraction : 0),
            advancedEdge(`${n3MaxId}->${finalId}`, n3MaxId, finalId, `첫째줄 ${anchor.abbreviation} 최대치`, advancedResetCost([100], anchorChance, 2, discountFactor, anchorMaxProbabilityPercent))
          );

          return finalId;
        }

        const finalId1 = buildArrangement(0, 1, 2, "result-t1");
        const finalId2 = buildArrangement(1, 0, 2, "result-t2");
        const finalId3 = buildArrangement(2, 0, 1, "result-t3");

        // All 3 anchor arrangements reach the exact same 3-option outcome, just with the rows
        // permuted - only the actually-cheapest one should be highlighted as the recommended route.
        exclusiveLeafGroups = [[finalId1, finalId2, finalId3]];
      }
    }

    return { branchNodes, branchEdges, exclusiveLeafGroups };
  }, [firstOption, secondOption, thirdOption, resetType, reputationDiscount, circulatorPrice]);

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
          honorMedalPrice,
          onHonorMedalPriceChange: setHonorMedalPrice,
          circulatorPrice,
          onCirculatorPriceChange: setCirculatorPrice,
          isFetchingCirculatorPrice,
        } satisfies OptionPanelData,
      },
      ...branchNodes.map((node) => ({ ...node, data: { ...node.data, pinned: node.id === pinnedNodeId } })),
    ],
    [
      selectedOptionNames,
      onChangeSelected,
      reputationDiscount,
      onToggleDiscount,
      resetType,
      honorMedalPrice,
      circulatorPrice,
      isFetchingCirculatorPrice,
      branchNodes,
      pinnedNodeId,
    ]
  );

  // Hovering (or, on touch, tapping/pinning) a table highlights the cheapest route from THAT table
  // onward to its goal - defaults to "option" (the whole-graph cheapest route) otherwise.
  const activeRouteNodeId = pinnedNodeId ?? hoveredNodeId;

  // Normal reset's circulator has no meso value, so its routes stay compared by 명성치 alone.
  // Advanced reset converts everything (reputation via the 명예의 훈장 price, plus meso costs) into
  // meso so the cheapest route reflects real spend, not just reputation.
  const getEdgeCost = useCallback(
    (edge: Edge) => {
      const edgeData = edge.data as LabeledEdgeData | undefined;
      if (resetType !== ResetType.ADVANCED) return edgeData?.reputationCost ?? 0;
      return convertReputationToMeso(edgeData?.reputationCost ?? 0, honorMedalPrice) + (edgeData?.mesoCost ?? 0);
    },
    [resetType, honorMedalPrice]
  );

  const branchEdges = useMemo(() => {
    const cheapestRouteEdgeIds = findCheapestRouteEdgeIds(branchNodes, rawBranchEdges, activeRouteNodeId, exclusiveLeafGroups, getEdgeCost);
    if (cheapestRouteEdgeIds.size === 0) return rawBranchEdges;
    return rawBranchEdges.map((edge) =>
      cheapestRouteEdgeIds.has(edge.id) ? { ...edge, data: { ...(edge.data as LabeledEdgeData), highlighted: true } } : edge
    );
  }, [rawBranchEdges, branchNodes, activeRouteNodeId, exclusiveLeafGroups, getEdgeCost]);

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
