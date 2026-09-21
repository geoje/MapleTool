import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CubeType, EquipmentLevelTier, PotentialGrade, POTENTIAL_GRADE_INFOS } from "@/constants/enhance";
import type { CubeGrade, CubeOptionGroup, CubeProbabilityData } from "@/hooks/use-cube-probability";
import { extractPotentialOptionValue } from "@/lib/potential-option";
import { formatCostExact, formatCostRounded } from "@/lib/format";

const GRADE_ORDER: CubeGrade[] = ["rare", "epic", "unique", "legendary"];

const GRADE_LABELS: Record<CubeGrade, string> = {
  rare: POTENTIAL_GRADE_INFOS[PotentialGrade.RARE].name,
  epic: POTENTIAL_GRADE_INFOS[PotentialGrade.EPIC].name,
  unique: POTENTIAL_GRADE_INFOS[PotentialGrade.UNIQUE].name,
  legendary: POTENTIAL_GRADE_INFOS[PotentialGrade.LEGENDARY].name,
};

const GRADE_BADGE_LETTERS: Record<CubeGrade, string> = {
  rare: "R",
  epic: "E",
  unique: "U",
  legendary: "L",
};

// Tailwind's standard palette, matching each grade's real in-game color
// (rare cyan, epic purple, unique yellow, legendary green) via shadcn's usual
// light/dark color-pair convention (see Alert's "warning" variant).
const GRADE_BADGE_COLORS: Record<CubeGrade, string> = {
  rare: "border-cyan-500/50 bg-cyan-50 text-cyan-900 dark:border-cyan-500/30 dark:bg-cyan-950/30 dark:text-cyan-300",
  epic: "border-purple-500/50 bg-purple-50 text-purple-900 dark:border-purple-500/30 dark:bg-purple-950/30 dark:text-purple-300",
  unique: "border-yellow-500/50 bg-yellow-50 text-yellow-900 dark:border-yellow-500/30 dark:bg-yellow-950/30 dark:text-yellow-300",
  legendary: "border-green-500/50 bg-green-50 text-green-900 dark:border-green-500/30 dark:bg-green-950/30 dark:text-green-300",
};

function GradeBadge({ grade }: { grade: CubeGrade }) {
  return (
    <Badge variant="outline" className={cn("h-4 min-w-4 justify-center rounded-sm px-1 text-[10px]", GRADE_BADGE_COLORS[grade])}>
      {GRADE_BADGE_LETTERS[grade]}
    </Badge>
  );
}

type GradeUpFromGrade = Exclude<CubeGrade, "legendary">;

interface GradeUpStep {
  probability: number;
  // Guaranteed-success try count ("등급 상승 보장 횟수"); undefined = no guarantee.
  pity?: number;
}

// From-grade -> chance of moving up one tier, per cube. Source: Nexon's official
// "등급 상승 확률표" / "등급 상승 보장 시스템" (게임산업법 시행령 공시).
// RESET/ADDI_RESET are their own selectable buttons (잠재능력 재설정 /
// 에디셔널 잠재능력 재설정) rather than rows folded into BLACK/ADDI. RESET shares
// BLACK's numbers (Nexon discloses one merged table there). ADDI_RESET has its
// own guarantee counts, disclosed as a separate column from ADDI's (rare/epic
// differ, unique matches - verified against the live disclosure page).
// MASTER/ARTISAN/STRANGE_ADDI have no guarantee system.
const GRADE_UP_STEPS: Record<CubeType, Partial<Record<GradeUpFromGrade, GradeUpStep>>> = {
  [CubeType.RESET]: {
    rare: { probability: 0.15, pity: 10 },
    epic: { probability: 0.035, pity: 42 },
    unique: { probability: 0.014, pity: 107 },
  },
  [CubeType.BLACK]: {
    rare: { probability: 0.15, pity: 10 },
    epic: { probability: 0.035, pity: 42 },
    unique: { probability: 0.014, pity: 107 },
  },
  [CubeType.MASTER]: {
    rare: { probability: 0.047619 },
    epic: { probability: 0.011858 },
  },
  [CubeType.ARTISAN]: {
    rare: { probability: 0.079994 },
    epic: { probability: 0.016959 },
    unique: { probability: 0.001996 },
  },
  [CubeType.ADDI_RESET]: {
    rare: { probability: 0.047619, pity: 62 },
    epic: { probability: 0.019608, pity: 152 },
    unique: { probability: 0.007, pity: 214 },
  },
  [CubeType.ADDI]: {
    rare: { probability: 0.047619, pity: 31 },
    epic: { probability: 0.019608, pity: 76 },
    unique: { probability: 0.007, pity: 214 },
  },
  [CubeType.STRANGE_ADDI]: {
    rare: { probability: 0.004 },
  },
};

// Exact (un-rounded) expected try count for a Bernoulli(probability) event,
// where reaching `pity` consecutive failures forces a success on that attempt.
// Kept un-rounded so RESET/ADDI_RESET can multiply it by a per-try cost
// without compounding rounding error - see buildGradeUpRows.
function expectedGradeUpTriesRaw(probability: number, pity?: number): number {
  if (!pity) return 1 / probability;

  let expected = 0;
  let survivalProbability = 1;
  for (let attempt = 1; attempt < pity; attempt++) {
    expected += attempt * survivalProbability * probability;
    survivalProbability *= 1 - probability;
  }
  expected += pity * survivalProbability;
  return expected;
}

const MIRACLE_TIME_PROBABILITY_MULTIPLIER = 2;

function buildGradeUpRows(step: GradeUpStep | undefined): OptionRow[] {
  if (!step) return [];
  const miracleProbability = step.probability * MIRACLE_TIME_PROBABILITY_MULTIPLIER;
  const cubeTriesRaw = expectedGradeUpTriesRaw(step.probability, step.pity);
  const miracleCubeTriesRaw = expectedGradeUpTriesRaw(miracleProbability, step.pity);
  return [
    { label: "등급업", averageTries: Math.ceil(cubeTriesRaw), rawTries: cubeTriesRaw },
    { label: "등급업 (미라클)", averageTries: Math.ceil(miracleCubeTriesRaw), rawTries: miracleCubeTriesRaw },
  ].sort((a, b) => a.averageTries - b.averageTries);
}

// RESET/ADDI_RESET show 평균 비용 (average cost) instead of 평균 횟수 (average
// try count) - the reset cost per attempt depends on the item's current
// potential grade (this table's column) and level tier, per Nexon's official
// disclosure. BLACK/ADDI (real cube items with a market price) keep the plain
// try-count display, since their cost depends on market price the app doesn't
// track here.
const RESET_COSTS: Partial<Record<CubeType, Record<EquipmentLevelTier, Record<CubeGrade, number>>>> = {
  [CubeType.RESET]: {
    [EquipmentLevelTier.HIGH]: { rare: 5_000_000, epic: 20_000_000, unique: 42_500_000, legendary: 50_000_000 },
    [EquipmentLevelTier.LOW]: { rare: 4_500_000, epic: 18_000_000, unique: 38_250_000, legendary: 45_000_000 },
  },
  [CubeType.ADDI_RESET]: {
    [EquipmentLevelTier.HIGH]: { rare: 12_250_000, epic: 34_300_000, unique: 83_300_000, legendary: 98_000_000 },
    [EquipmentLevelTier.LOW]: { rare: 11_000_000, epic: 30_800_000, unique: 74_800_000, legendary: 88_000_000 },
  },
};

interface OptionRow {
  label: string;
  averageTries: number;
  // Exact (un-rounded) expected try count, used to compute RESET/ADDI_RESET's
  // 평균 비용 without compounding the ceil'd averageTries's rounding error.
  rawTries: number;
  // Hover-tooltip text for the label cell (e.g. which 공/보/방 line combinations
  // count as "유효") - only soul ring rows set this.
  tooltip?: string;
}

type Distribution = Map<number, number>; // value -> probability

// All 3 option lines roll independently, and any of them can land a matching
// option - so a slot's distribution is "one of the matching values" plus a
// bucket at 0 for "this line rolled something else entirely".
function buildSlotDistribution(items: CubeOptionGroup["items"], templates: string[]): Distribution {
  const distribution: Distribution = new Map();
  let matchedProbability = 0;
  for (const item of items) {
    const { name, value } = extractPotentialOptionValue(item.name);
    if (!templates.includes(name)) continue;
    distribution.set(value, (distribution.get(value) ?? 0) + item.probability);
    matchedProbability += item.probability;
  }
  const otherProbability = 1 - matchedProbability;
  if (otherProbability > 0) {
    distribution.set(0, (distribution.get(0) ?? 0) + otherProbability);
  }
  return distribution;
}

function convolve(a: Distribution, b: Distribution): Distribution {
  const result: Distribution = new Map();
  for (const [aValue, aProbability] of a) {
    for (const [bValue, bProbability] of b) {
      const total = aValue + bValue;
      result.set(total, (result.get(total) ?? 0) + aProbability * bProbability);
    }
  }
  return result;
}

// A row labeled "n%" means "n% or more" (e.g. hitting 21% also satisfies the
// 18% row), so its probability is the tail sum from that total upward - this
// guarantees a higher total never needs fewer tries than a lower one.
function toAtLeastDistribution(distribution: Distribution): Distribution {
  const descendingTotals = [...distribution.keys()].sort((a, b) => b - a);
  const cumulative: Distribution = new Map();
  let runningProbability = 0;
  for (const total of descendingTotals) {
    runningProbability += distribution.get(total) ?? 0;
    cumulative.set(total, runningProbability);
  }
  return cumulative;
}

// The 1st option line only ever rolls the single strongest tier of a given
// option (lines 2/3 draw from the full range) - so it sets a floor below which
// a total is just a weaker line rolling alone and isn't worth showing.
function slotOneMinimum(groups: CubeOptionGroup[], templates: string[]): number {
  const firstSlot = groups.find((group) => group.optionNumber === 1);
  if (!firstSlot) return 0;

  let minimum: number | null = null;
  for (const item of firstSlot.items) {
    const { name, value } = extractPotentialOptionValue(item.name);
    if (!templates.includes(name)) continue;
    if (minimum === null || value < minimum) minimum = value;
  }
  return minimum ?? 0;
}

// `templates` are the "n"-substituted name shapes from extractPotentialOptionValue
// (e.g. "STR +n%") that should be treated as the same option for this row group.
// Since all 3 lines can independently roll a matching option, the row for a given
// total is the sum across every combination of per-line values that adds up to it
// (e.g. 12+9+9 and 15+9+6 both count toward a "30%" row, if both are possible).
function buildOptionRows(groups: CubeOptionGroup[], templates: string[], formatLabel: (value: number) => string): OptionRow[] {
  const slotDistributions = groups.map((group) => buildSlotDistribution(group.items, templates));
  const combined = slotDistributions.reduce<Distribution>((acc, slot) => convolve(acc, slot), new Map([[0, 1]]));
  const atLeast = toAtLeastDistribution(combined);
  const floor = slotOneMinimum(groups, templates);

  const rows: OptionRow[] = [];
  for (const [total, probability] of atLeast) {
    if (total <= 0 || total < floor || probability <= 0) continue;
    rows.push({ label: formatLabel(total), averageTries: Math.ceil(1 / probability), rawTries: 1 / probability });
  }
  return rows.sort((a, b) => a.averageTries - b.averageTries);
}

// Counts how many of the 3 lines (independently) land any option from
// `templates`, ignoring the specific value entirely - used for "드메 n줄"
// where all that matters is how many lines are drop-rate/meso-obtain, not
// which one or its tier. Builds the Poisson-binomial distribution of match
// count across the 3 slots, then reports "at least k matches" for each
// requested `counts` entry.
function buildLineCountRows(
  groups: CubeOptionGroup[],
  templates: string[],
  counts: number[],
  formatLabel: (count: number) => string
): OptionRow[] {
  const slotMatchProbabilities = groups.map((group) => {
    let matched = 0;
    for (const item of group.items) {
      const { name } = extractPotentialOptionValue(item.name);
      if (templates.includes(name)) matched += item.probability;
    }
    return matched;
  });

  let distribution = new Map<number, number>([[0, 1]]);
  for (const matchProbability of slotMatchProbabilities) {
    const next = new Map<number, number>();
    for (const [count, probability] of distribution) {
      next.set(count, (next.get(count) ?? 0) + probability * (1 - matchProbability));
      next.set(count + 1, (next.get(count + 1) ?? 0) + probability * matchProbability);
    }
    distribution = next;
  }

  const rows: OptionRow[] = [];
  for (const targetCount of counts) {
    let atLeastProbability = 0;
    for (const [count, probability] of distribution) {
      if (count >= targetCount) atLeastProbability += probability;
    }
    if (atLeastProbability <= 0) continue;
    rows.push({
      label: formatLabel(targetCount),
      averageTries: Math.ceil(1 / atLeastProbability),
      rawTries: 1 / atLeastProbability,
    });
  }
  return rows.sort((a, b) => a.averageTries - b.averageTries);
}

interface WeightedSlotValue {
  value: number;
  probability: number;
  isPrimary: boolean;
}

// A slot rolls at most one option: a `primaryTemplates` match, a `bonusTemplates`
// match, or something unrelated (contributes 0, counted in the leftover entry).
function buildWeightedSlot(
  items: CubeOptionGroup["items"],
  primaryTemplates: string[],
  bonusTemplates: string[]
): WeightedSlotValue[] {
  const entries: WeightedSlotValue[] = [];
  let matchedProbability = 0;
  for (const item of items) {
    const { name, value } = extractPotentialOptionValue(item.name);
    if (primaryTemplates.includes(name)) {
      entries.push({ value, probability: item.probability, isPrimary: true });
      matchedProbability += item.probability;
    } else if (bonusTemplates.includes(name)) {
      entries.push({ value, probability: item.probability, isPrimary: false });
      matchedProbability += item.probability;
    }
  }
  entries.push({ value: 0, probability: 1 - matchedProbability, isPrimary: false });
  return entries;
}

// Core of buildPrimaryWithBonusRows, factored out so buildAnyStatRows can run
// it once per stat (STR/DEX/INT/LUK) and combine the results - see that
// function's comment for why a bonus-template line (올스탯) only counts
// toward the total once a primary-template line has also appeared.
function buildPrimaryQualifyingAtLeastDistribution(
  groups: CubeOptionGroup[],
  primaryTemplates: string[],
  bonusTemplates: string[]
): { atLeast: Distribution; floor: number } {
  const slots = groups.map((group) => buildWeightedSlot(group.items, primaryTemplates, bonusTemplates));
  // Floor from the primary (STR) template only - the 1st line's 올스탯 value
  // (if any) is often lower, and blending it in would let weaker totals through.
  const floor = slotOneMinimum(groups, primaryTemplates);

  // State key encodes the running total plus whether a primary-template line
  // has appeared yet, since only the latter qualifies a total for output.
  let states = new Map<string, number>([["0:0", 1]]);
  for (const slot of slots) {
    const next = new Map<string, number>();
    for (const [key, probability] of states) {
      const [totalPart, hasPrimaryPart] = key.split(":");
      const total = Number(totalPart);
      const hasPrimary = hasPrimaryPart === "1";
      for (const entry of slot) {
        const newKey = `${total + entry.value}:${hasPrimary || entry.isPrimary ? 1 : 0}`;
        next.set(newKey, (next.get(newKey) ?? 0) + probability * entry.probability);
      }
    }
    states = next;
  }

  // Only outcomes with a genuine primary line qualify at all; everything else
  // (bonus-only or no match) is dropped before converting to "n% or more".
  const qualifying: Distribution = new Map();
  for (const [key, probability] of states) {
    const [totalPart, hasPrimaryPart] = key.split(":");
    if (hasPrimaryPart !== "1") continue;
    const total = Number(totalPart);
    qualifying.set(total, (qualifying.get(total) ?? 0) + probability);
  }
  return { atLeast: toAtLeastDistribution(qualifying), floor };
}

// Same "sum across the 3 lines" idea as buildOptionRows, but a bonus-template
// line (올스탯) only counts toward the total when at least one line actually
// rolled a primary-template option (STR) - a lone 올스탯 line with no STR line
// anywhere isn't treated as satisfying "주스탯" on its own.
function buildPrimaryWithBonusRows(
  groups: CubeOptionGroup[],
  primaryTemplates: string[],
  bonusTemplates: string[],
  formatLabel: (value: number) => string
): OptionRow[] {
  const { atLeast, floor } = buildPrimaryQualifyingAtLeastDistribution(groups, primaryTemplates, bonusTemplates);

  const rows: OptionRow[] = [];
  for (const [total, probability] of atLeast) {
    if (total <= 0 || total < floor || probability <= 0) continue;
    rows.push({ label: formatLabel(total), averageTries: Math.ceil(1 / probability), rawTries: 1 / probability });
  }
  return rows.sort((a, b) => a.averageTries - b.averageTries);
}

// 아무스탯 n% = P(STR>=n%) + P(DEX>=n%) + P(INT>=n%) + P(LUK>=n%), i.e. landing
// n%+ in *some* main stat, approximated as a plain sum of the four
// (mutually-exclusive-per-line, symmetric) per-stat probabilities rather than
// an exact inclusion-exclusion union - this is the user-specified definition,
// and it's why 아무스탯's average tries comes out roughly 4x lower than
// 주스탯's for the same n%. Each per-stat probability still includes the
// 올스탯 bonus rule from buildPrimaryQualifyingAtLeastDistribution.
function buildAnyStatRows(
  groups: CubeOptionGroup[],
  statTemplates: string[][],
  bonusTemplates: string[],
  formatLabel: (value: number) => string
): OptionRow[] {
  let floor = Infinity;
  const summedProbabilityByTotal = new Map<number, number>();
  for (const primaryTemplates of statTemplates) {
    const { atLeast, floor: statFloor } = buildPrimaryQualifyingAtLeastDistribution(
      groups,
      primaryTemplates,
      bonusTemplates
    );
    floor = Math.min(floor, statFloor);
    for (const [total, probability] of atLeast) {
      summedProbabilityByTotal.set(total, (summedProbabilityByTotal.get(total) ?? 0) + probability);
    }
  }

  const rows: OptionRow[] = [];
  for (const [total, probability] of summedProbabilityByTotal) {
    if (total <= 0 || total < floor || probability <= 0) continue;
    const clampedProbability = Math.min(probability, 1);
    rows.push({ label: formatLabel(total), averageTries: Math.ceil(1 / clampedProbability), rawTries: 1 / clampedProbability });
  }
  return rows.sort((a, b) => a.averageTries - b.averageTries);
}

// Some potential options only ever roll on one equipment category and are
// worth their own "pure" section plus "secondary + 주스탯/올스탯/HP" combo rows
// merged into each stat section - 스킬 재사용 대기시간 감소 ("쿨감") on 모자, and
// 크리티컬 데미지 (잠재능력 전용 8% tier, not the 에디셔널 common +1%/+3% one - see
// CRIT_DAMAGE_TEMPLATE) on 장갑. Confirmed by there being no matching item in
// any other category's 잠재능력 cube data.
const COOLDOWN_TEMPLATE = "스킬 재사용 대기시간 -n초";
const HAT_CATEGORY = "모자";
const CRIT_DAMAGE_TEMPLATE = "크리티컬 데미지 +n%";
const GLOVE_CATEGORY = "장갑";

interface SecondaryStatOption {
  template: string;
  formatPure: (value: number) => string;
}

const SECONDARY_STAT_OPTIONS: Record<string, SecondaryStatOption> = {
  [HAT_CATEGORY]: { template: COOLDOWN_TEMPLATE, formatPure: (value) => `쿨 ${value}초` },
  [GLOVE_CATEGORY]: { template: CRIT_DAMAGE_TEMPLATE, formatPure: (value) => `크뎀 ${value}%` },
};

interface JointSlotEntry {
  statValue: number;
  isPrimaryStat: boolean;
  secondaryValue: number;
  probability: number;
}

// Like buildWeightedSlot, but a slot can independently land a primary-stat
// match, a bonus-stat (올스탯) match, a secondary-option match, or neither -
// never two at once, since a line only ever rolls a single option.
// `secondaryValueOf` maps a secondary match's extracted number to its
// contribution: identity for value-summed options (쿨감 seconds, 크뎀 %), or a
// constant 1 for count-only options (드메, where the % on the line doesn't
// matter - only that a drop/meso line landed at all).
function buildJointSlot(
  items: CubeOptionGroup["items"],
  primaryTemplates: string[],
  bonusTemplates: string[],
  secondaryTemplates: string[],
  secondaryValueOf: (value: number) => number
): JointSlotEntry[] {
  const entries: JointSlotEntry[] = [];
  let matchedProbability = 0;
  for (const item of items) {
    const { name, value } = extractPotentialOptionValue(item.name);
    if (primaryTemplates.includes(name)) {
      entries.push({ statValue: value, isPrimaryStat: true, secondaryValue: 0, probability: item.probability });
      matchedProbability += item.probability;
    } else if (bonusTemplates.includes(name)) {
      entries.push({ statValue: value, isPrimaryStat: false, secondaryValue: 0, probability: item.probability });
      matchedProbability += item.probability;
    } else if (secondaryTemplates.includes(name)) {
      entries.push({
        statValue: 0,
        isPrimaryStat: false,
        secondaryValue: secondaryValueOf(value),
        probability: item.probability,
      });
      matchedProbability += item.probability;
    }
  }
  const otherProbability = 1 - matchedProbability;
  if (otherProbability > 0) {
    entries.push({ statValue: 0, isPrimaryStat: false, secondaryValue: 0, probability: otherProbability });
  }
  return entries;
}

// Joint (statTotal, hasPrimaryStat, secondaryTotal) distribution across the 3
// lines - same "hasPrimaryStat" qualifying idea as
// buildPrimaryQualifyingAtLeastDistribution (a bonus-only total doesn't
// qualify), extended with an independent secondaryTotal tally. When
// `bonusTemplates` is empty (올스탯/HP combos have no separate bonus line),
// every matched stat line is primary, which collapses this back to a plain
// sum - matching buildOptionRows' semantics for those two groups.
function buildStatSecondaryJointStates(
  groups: CubeOptionGroup[],
  primaryTemplates: string[],
  bonusTemplates: string[],
  secondaryTemplates: string[],
  secondaryValueOf: (value: number) => number
): Map<string, number> {
  const slots = groups.map((group) =>
    buildJointSlot(group.items, primaryTemplates, bonusTemplates, secondaryTemplates, secondaryValueOf)
  );
  let states = new Map<string, number>([["0:0:0", 1]]);
  for (const slot of slots) {
    const next = new Map<string, number>();
    for (const [key, probability] of states) {
      const [statPart, hasPrimaryPart, secondaryPart] = key.split(":");
      const statTotal = Number(statPart);
      const hasPrimary = hasPrimaryPart === "1";
      const secondaryTotal = Number(secondaryPart);
      for (const entry of slot) {
        const nextHasPrimary = hasPrimary || entry.isPrimaryStat;
        const nextKey = `${statTotal + entry.statValue}:${nextHasPrimary ? 1 : 0}:${secondaryTotal + entry.secondaryValue}`;
        next.set(nextKey, (next.get(nextKey) ?? 0) + probability * entry.probability);
      }
    }
    states = next;
  }
  return states;
}

interface StatSecondaryPair {
  statTotal: number;
  secondaryTotal: number;
  probability: number;
}

// Every (statTotal, secondaryTotal, probability) outcome where a qualifying
// stat line and a secondary-option line both appear (statTotal>0 &&
// secondaryTotal>0) - a secondary-only or stat-only outcome is already
// covered by the plain sections these combo rows get merged into. Shared by
// buildStatSecondaryComboRows (single stat) and buildAnyStatSecondaryComboRows
// (summed across STR/DEX/INT/LUK).
function buildQualifyingStatSecondaryPairs(
  groups: CubeOptionGroup[],
  primaryTemplates: string[],
  bonusTemplates: string[],
  secondaryTemplates: string[],
  secondaryValueOf: (value: number) => number
): StatSecondaryPair[] {
  const states = buildStatSecondaryJointStates(groups, primaryTemplates, bonusTemplates, secondaryTemplates, secondaryValueOf);

  const qualifying: StatSecondaryPair[] = [];
  for (const [key, probability] of states) {
    const [statPart, hasPrimaryPart, secondaryPart] = key.split(":");
    if (hasPrimaryPart !== "1" || probability <= 0) continue;
    const statTotal = Number(statPart);
    const secondaryTotal = Number(secondaryPart);
    if (statTotal <= 0 || secondaryTotal <= 0) continue;
    qualifying.push({ statTotal, secondaryTotal, probability });
  }
  return qualifying;
}

// Rows for "secondary + 주스탯/올스탯/HP" combos (쿨감/크뎀/드메 + a single stat).
// For each achievable (statTarget, secondaryTarget) pair, the row's
// probability is the tail sum over every qualifying outcome that clears both
// targets at once - the 2-D analogue of toAtLeastDistribution.
//
// Unlike the plain single-stat rows, this intentionally skips the
// slotOneMinimum floor (see buildOptionRows/buildPrimaryWithBonusRows): that
// floor hides totals reachable only via lines 2/3 without line 1's help, but
// a combo already needs the stat and the secondary option to land on
// different lines, so a "weak" stat total paired with it is exactly the kind
// of split this section exists to surface (e.g. 쿨 1초 + 주스탯 9%).
function buildStatSecondaryComboRows(
  groups: CubeOptionGroup[],
  primaryTemplates: string[],
  bonusTemplates: string[],
  secondaryTemplates: string[],
  secondaryValueOf: (value: number) => number,
  formatLabel: (statValue: number, secondaryValue: number) => string
): OptionRow[] {
  const qualifying = buildQualifyingStatSecondaryPairs(
    groups,
    primaryTemplates,
    bonusTemplates,
    secondaryTemplates,
    secondaryValueOf
  );

  const statTargets = [...new Set(qualifying.map((q) => q.statTotal))];
  const secondaryTargets = [...new Set(qualifying.map((q) => q.secondaryTotal))];

  const rows: OptionRow[] = [];
  for (const statTarget of statTargets) {
    for (const secondaryTarget of secondaryTargets) {
      const probability = qualifying
        .filter((q) => q.statTotal >= statTarget && q.secondaryTotal >= secondaryTarget)
        .reduce((sum, q) => sum + q.probability, 0);
      if (probability <= 0) continue;
      rows.push({
        label: formatLabel(statTarget, secondaryTarget),
        averageTries: Math.ceil(1 / probability),
        rawTries: 1 / probability,
      });
    }
  }
  return rows;
}

// 아무스탯 version of buildStatSecondaryComboRows - same "sum the 4 stats'
// probabilities, clamp to 1" approximation as buildAnyStatRows (see its
// comment), just extended with the secondary-option axis.
function buildAnyStatSecondaryComboRows(
  groups: CubeOptionGroup[],
  statTemplates: string[][],
  bonusTemplates: string[],
  secondaryTemplates: string[],
  secondaryValueOf: (value: number) => number,
  formatLabel: (statValue: number, secondaryValue: number) => string
): OptionRow[] {
  const perStatQualifying = statTemplates.map((primaryTemplates) =>
    buildQualifyingStatSecondaryPairs(groups, primaryTemplates, bonusTemplates, secondaryTemplates, secondaryValueOf)
  );

  const statTargets = new Set<number>();
  const secondaryTargets = new Set<number>();
  for (const qualifying of perStatQualifying) {
    for (const q of qualifying) {
      statTargets.add(q.statTotal);
      secondaryTargets.add(q.secondaryTotal);
    }
  }

  const rows: OptionRow[] = [];
  for (const statTarget of statTargets) {
    for (const secondaryTarget of secondaryTargets) {
      let probability = 0;
      for (const qualifying of perStatQualifying) {
        probability += qualifying
          .filter((q) => q.statTotal >= statTarget && q.secondaryTotal >= secondaryTarget)
          .reduce((sum, q) => sum + q.probability, 0);
      }
      const clampedProbability = Math.min(probability, 1);
      if (clampedProbability <= 0) continue;
      rows.push({
        label: formatLabel(statTarget, secondaryTarget),
        averageTries: Math.ceil(1 / clampedProbability),
        rawTries: 1 / clampedProbability,
      });
    }
  }
  return rows;
}

// Merges a section's plain rows with its combo rows (if any) and re-sorts by
// average tries, so the combo rows land wherever they naturally belong among
// the plain rows rather than being appended at the end.
function mergeComboRows(rows: OptionRow[], comboRows: OptionRow[]): OptionRow[] {
  if (comboRows.length === 0) return rows;
  return [...rows, ...comboRows].sort((a, b) => a.averageTries - b.averageTries);
}

// A stat section (주스탯/올스탯/HP) plus, when this category has a
// SECONDARY_STAT_OPTIONS entry, its "secondary + stat" combo rows merged in -
// see mergeComboRows. Other combo sources (e.g. 드메 on accessories) are
// merged separately by the caller with the same helper.
function buildStatSectionRows(
  groups: CubeOptionGroup[],
  primaryTemplates: string[],
  bonusTemplates: string[],
  statLabel: string,
  secondaryOption: SecondaryStatOption | undefined
): OptionRow[] {
  const plainRows =
    bonusTemplates.length > 0
      ? buildPrimaryWithBonusRows(groups, primaryTemplates, bonusTemplates, (value) => `${statLabel} ${value}%`)
      : buildOptionRows(groups, primaryTemplates, (value) => `${statLabel} ${value}%`);
  if (!secondaryOption) return plainRows;

  const comboRows = buildStatSecondaryComboRows(
    groups,
    primaryTemplates,
    bonusTemplates,
    [secondaryOption.template],
    (value) => value,
    (statValue, secondaryValue) => `${secondaryOption.formatPure(secondaryValue)} + ${statLabel} ${statValue}%`
  );
  return mergeComboRows(plainRows, comboRows);
}

// 아무스탯/드메 are only meaningful on these accessory categories - other
// categories (weapons, armor, ...) can coincidentally match the same
// STR/DEX/INT/LUK templates and would otherwise leak these sections in too.
// Category strings match EQUIPMENT_CATEGORIES (frontend/src/constants/starforce.ts).
const ANY_STAT_CATEGORIES: string[] = ["얼굴장식", "눈장식", "귀고리", "펜던트", "벨트", "반지"];
const DROP_MESO_CATEGORIES: string[] = ANY_STAT_CATEGORIES.filter((category) => category !== "벨트");
const DROP_MESO_TEMPLATES = ["아이템 드롭률 +n%", "메소 획득량 +n%"];
// 드메's per-line % doesn't matter for the combo axis, only whether a line
// landed drop rate or meso obtain at all - so every matching line counts as
// exactly 1 toward the "드메 n줄" total, regardless of its rolled value.
// (3 lines total means a stat/아무스탯 combo, which needs >=1 non-드메 line,
// can only ever pair with 1 or 2 드메 lines; 3 always leaves 0 for the stat.)
const countDropMesoLine = (): number => 1;

// 무기/보조무기/포스실드,소울링/엠블렘 only ever matter for 공격력%, 보스 몬스터
// 데미지%, 몬스터 방어율 무시% - 주스탯/올스탯/HP rows are irrelevant here and are
// replaced entirely by the "방무 1줄 포함" 유효 N줄 rows (방무가 섞인 조합은 구체적
// %보다 몇 줄이 유효한지가 더 중요) plus the "공 n% + 보공 m%" combo rows (방무가
// 없는 조합은 정확한 % 조합이 더 중요) below. 엠블렘 never rolls 보스 몬스터
// 데미지 in-game, so it only ever gets a plain "공 n%" section instead of a
// combo (buildEmblemRowGroups).
const SOUL_RING_WEAPON_CATEGORIES: string[] = [
  "무기",
  "보조무기(포스실드, 소울링 제외)",
  "포스실드, 소울링",
  "방패", // 보조무기 취급
];
const SOUL_RING_EMBLEM_CATEGORY = "엠블렘";

const ATTACK_TEMPLATE = "공격력 +n%";
const BOSS_DAMAGE_TEMPLATE = "보스 몬스터 데미지 +n%";
const IGNORE_DEFENSE_TEMPLATE = "몬스터 방어율 무시 +n%";

// One-character shorthand used in the "옵션" tooltip, so e.g. a 3-line combo
// of 공격력/공격력/보스 몬스터 데미지 renders as "공공보".
const TEMPLATE_ABBREVIATIONS: Record<string, string> = {
  [ATTACK_TEMPLATE]: "공",
  [BOSS_DAMAGE_TEMPLATE]: "보",
  [IGNORE_DEFENSE_TEMPLATE]: "방",
};

// Every way to split `count` lines across `templates` (order = priority, used
// for both traversal order and label tie-breaking below). Walks each
// template's count from high to low so the result is already in "heaviest
// first template" order.
function buildPlainCombinationCounts(templates: string[], count: number): number[][] {
  const results: number[][] = [];

  function recurse(index: number, remaining: number, current: number[]) {
    if (index === templates.length - 1) {
      results.push([...current, remaining]);
      return;
    }
    for (let c = remaining; c >= 0; c--) {
      recurse(index + 1, remaining - c, [...current, c]);
    }
  }
  recurse(0, count, []);
  return results;
}

// Same as buildPlainCombinationCounts, but grouped by how many lines land on
// `capTemplate` (0 first, then 1, ... up to `capLimit`) rather than
// interleaved with the other templates - this keeps every capTemplate-free
// combination together at the front and every capped combination together at
// the back, so a truncated preview's tail always shows capTemplate examples
// instead of just whichever combo happened to sort last.
function buildSoulRingCombinationCounts(
  templates: string[],
  count: number,
  capTemplate?: string,
  capLimit = 1
): number[][] {
  const capIndex = capTemplate ? templates.indexOf(capTemplate) : -1;
  if (capIndex === -1) return buildPlainCombinationCounts(templates, count);

  const otherTemplates = templates.filter((_, index) => index !== capIndex);
  const results: number[][] = [];
  for (let capCount = 0; capCount <= Math.min(capLimit, count); capCount++) {
    for (const otherCounts of buildPlainCombinationCounts(otherTemplates, count - capCount)) {
      const combination = [...otherCounts];
      combination.splice(capIndex, 0, capCount);
      results.push(combination);
    }
  }
  return results;
}

// Renders one combination as its abbreviation string, grouping same-template
// letters together and ordering groups by count descending (ties broken by
// template priority) - e.g. counts [1, 2, 0] over [공, 보, 방] -> "보보공".
function formatSoulRingCombination(counts: number[], templates: string[]): string {
  return templates
    .map((template, index) => ({ abbreviation: TEMPLATE_ABBREVIATIONS[template], count: counts[index], index }))
    .filter((part) => part.count > 0)
    .sort((a, b) => b.count - a.count || a.index - b.index)
    .map((part) => part.abbreviation.repeat(part.count))
    .join("");
}

// Above this many combinations the full list is too long to show in a
// tooltip, so only the first/last couple are shown with a middle ellipsis.
const MAX_VISIBLE_COMBINATIONS = 5;

function buildSoulRingComboTooltip(templates: string[], count: number, capTemplate?: string): string {
  const combinations = buildSoulRingCombinationCounts(templates, count, capTemplate).map((counts) =>
    formatSoulRingCombination(counts, templates)
  );
  if (combinations.length <= MAX_VISIBLE_COMBINATIONS) return combinations.join(", ");
  return `${combinations.slice(0, 2).join(", ")}, ... , ${combinations.slice(-2).join(", ")}`;
}

type SoulRingLineOutcome = { normal: number; deviated: number; none: number; capNormal: number; capDeviated: number };

// Line 1 never "이탈"s (whatever it rolls counts as 정옵) - only lines 2/3 can
// roll a higher-than-baseline ("이탈") value for the same template. Baseline
// is the smallest disclosed value for that template on that line; anything
// above it is 이탈. capTemplate additionally tracks how much of normal/deviated
// specifically comes from that one template (used to cap 방무 lines below).
function buildSoulRingLineOutcome(
  group: CubeOptionGroup,
  templates: string[],
  capTemplate?: string
): SoulRingLineOutcome {
  if (group.optionNumber === 1) {
    let matched = 0;
    let capMatched = 0;
    for (const item of group.items) {
      const { name } = extractPotentialOptionValue(item.name);
      if (!templates.includes(name)) continue;
      matched += item.probability;
      if (name === capTemplate) capMatched += item.probability;
    }
    return { normal: matched, deviated: 0, none: 1 - matched, capNormal: capMatched, capDeviated: 0 };
  }

  const baselineByTemplate = new Map<string, number>();
  for (const item of group.items) {
    const { name, value } = extractPotentialOptionValue(item.name);
    if (!templates.includes(name)) continue;
    const current = baselineByTemplate.get(name);
    if (current === undefined || value < current) baselineByTemplate.set(name, value);
  }

  let normal = 0;
  let deviated = 0;
  let capNormal = 0;
  let capDeviated = 0;
  for (const item of group.items) {
    const { name, value } = extractPotentialOptionValue(item.name);
    if (!templates.includes(name)) continue;
    const isNormal = value <= baselineByTemplate.get(name)!;
    if (isNormal) normal += item.probability;
    else deviated += item.probability;
    if (name === capTemplate) {
      if (isNormal) capNormal += item.probability;
      else capDeviated += item.probability;
    }
  }
  return { normal, deviated, none: 1 - normal - deviated, capNormal, capDeviated };
}

// Joint distribution of (valid line count, deviated line count, capTemplate line
// count) across the 3 independent lines - state key is
// `${validCount}:${deviatedCount}:${capCount}`. capCount stays 0 throughout when
// no capTemplate is given, collapsing back to the plain (valid, deviated) case.
function buildSoulRingJointDistribution(
  groups: CubeOptionGroup[],
  templates: string[],
  capTemplate?: string
): Map<string, number> {
  let states = new Map<string, number>([["0:0:0", 1]]);
  for (const group of groups) {
    const outcome = buildSoulRingLineOutcome(group, templates, capTemplate);
    const next = new Map<string, number>();
    const branches: [number, number, number, number][] = [
      [outcome.capNormal, 1, 0, 1],
      [outcome.normal - outcome.capNormal, 1, 0, 0],
      [outcome.capDeviated, 1, 1, 1],
      [outcome.deviated - outcome.capDeviated, 1, 1, 0],
      [outcome.none, 0, 0, 0],
    ];
    for (const [key, probability] of states) {
      const [validPart, deviatedPart, capPart] = key.split(":").map(Number);
      for (const [branchProbability, validDelta, deviatedDelta, capDelta] of branches) {
        if (branchProbability <= 0) continue;
        const nextKey = `${validPart + validDelta}:${deviatedPart + deviatedDelta}:${capPart + capDelta}`;
        next.set(nextKey, (next.get(nextKey) ?? 0) + probability * branchProbability);
      }
    }
    states = next;
  }
  return states;
}

function soulRingOutcomeProbability(
  states: Map<string, number>,
  predicate: (validCount: number, deviatedCount: number) => boolean
): number {
  let total = 0;
  for (const [key, probability] of states) {
    const [validCount, deviatedCount] = key.split(":").map(Number);
    if (predicate(validCount, deviatedCount)) total += probability;
  }
  return total;
}

// 방무는 실제로는 한 아이템에 1줄까지만 나올 수 있으므로, capTemplate이 2줄 이상
// 걸린 상태는 애초에 나올 수 없는 조합으로 보고 확률에서 제외한다(재분배하지 않음).
function dropOverCappedStates(states: Map<string, number>, capLimit: number): Map<string, number> {
  const filtered = new Map<string, number>();
  for (const [key, probability] of states) {
    const capCount = Number(key.split(":")[2]);
    if (capCount > capLimit) continue;
    filtered.set(key, probability);
  }
  return filtered;
}

// 2줄 only distinguishes "no deviation" vs "any deviation" (deviatedCount can
// be 1 or 2 depending on whether line 1 is one of the 2 valid lines); 3줄
// splits all 3 possibilities since line 1 always counts as one of the 3 and
// never deviates, leaving exactly 0/1/2 deviated among lines 2-3.
// Returns 2줄급/3줄급 as separate groups (rather than one flat row list) so
// the table can shade them with alternating backgrounds like any other
// top-level group - see PotentialTable's `isGroupMuted`.
function buildSoulRingRows(
  groups: CubeOptionGroup[],
  templates: string[],
  labelPrefix: string,
  capTemplate?: string
): OptionRow[][] {
  let states = buildSoulRingJointDistribution(groups, templates, capTemplate);
  if (capTemplate) states = dropOverCappedStates(states, 1);
  const specGroups: { suffix: string; validCount: number; predicate: (validCount: number, deviatedCount: number) => boolean }[][] = [
    [{ suffix: "유효 2줄 (정옵)", validCount: 2, predicate: (v, d) => v === 2 && d === 0 }],
    [
      { suffix: "유효 3줄 (정옵)", validCount: 3, predicate: (v, d) => v === 3 && d === 0 },
      { suffix: "유효 3줄 (1줄 이탈)", validCount: 3, predicate: (v, d) => v === 3 && d === 1 },
      { suffix: "유효 3줄 (올이탈)", validCount: 3, predicate: (v, d) => v === 3 && d >= 2 },
    ],
  ];

  return specGroups
    .map((specs) => {
      const rows: OptionRow[] = [];
      for (const spec of specs) {
        const probability = soulRingOutcomeProbability(states, spec.predicate);
        if (probability <= 0) continue;
        rows.push({
          label: `${labelPrefix} ${spec.suffix}`,
          averageTries: Math.ceil(1 / probability),
          rawTries: 1 / probability,
          tooltip: buildSoulRingComboTooltip(templates, spec.validCount, capTemplate),
        });
      }
      return rows;
    })
    .filter((rows) => rows.length > 0);
}

// 공 n% + 보공 m% - both a 공격력 line and a 보스 몬스터 데미지 line must appear
// together (같은 joint-distribution 방식은 쿨감+주스탯/드메+주스탯 조합과 동일 -
// see buildStatSecondaryComboRows), 방무X 대신 실제 % 조합을 그대로 보여준다.
function buildAttackBossDamageComboRows(groups: CubeOptionGroup[]): OptionRow[] {
  return buildStatSecondaryComboRows(
    groups,
    [ATTACK_TEMPLATE],
    [],
    [BOSS_DAMAGE_TEMPLATE],
    (value) => value,
    (attackValue, bossDamageValue) => `공 ${attackValue}% + 보공 ${bossDamageValue}%`
  ).sort((a, b) => a.averageTries - b.averageTries);
}

// 방무 1줄 포함 그룹(2줄급/3줄급 각각 별도 그룹)을 먼저, 공+보공 조합 행을 그
// 아래에 배치.
function buildSoulRingRowGroups(groups: CubeOptionGroup[], includeIgnoreDefenseTemplates: string[]): OptionRow[][] {
  return [
    ...buildSoulRingRows(groups, includeIgnoreDefenseTemplates, "방무 1줄 포함", IGNORE_DEFENSE_TEMPLATE),
    buildAttackBossDamageComboRows(groups),
  ].filter((rows) => rows.length > 0);
}

// 에디셔널 잠재능력의 무기류/엠블렘은 방무/유효 N줄 표기를 전부 걷어내고 다른
// 부위처럼 공 n% 합산으로만 보여준다 (잠재능력 쪽은 그대로 유지).
function buildAttackOnlyRowGroups(groups: CubeOptionGroup[]): OptionRow[][] {
  return [buildOptionRows(groups, [ATTACK_TEMPLATE], (value) => `공 ${value}%`)].filter((rows) => rows.length > 0);
}

// 엠블렘은 공격력 템플릿 하나뿐이라 "방무 제외 유효 N줄"이 그냥 공격력 총합%와
// 동일한 의미라, 유효 N줄 표기 대신 다른 부위처럼 공 n% 합산 표기로 보여준다.
function buildEmblemRowGroups(groups: CubeOptionGroup[]): OptionRow[][] {
  return [
    ...buildSoulRingRows(groups, [ATTACK_TEMPLATE, IGNORE_DEFENSE_TEMPLATE], "방무 1줄 포함", IGNORE_DEFENSE_TEMPLATE),
    buildOptionRows(groups, [ATTACK_TEMPLATE], (value) => `공 ${value}%`),
  ].filter((rows) => rows.length > 0);
}

// Only the "%" variants are shown - flat (non-percent) stat bumps are excluded.
// 아무스탯 = P(STR>=n%) + P(DEX>=n%) + P(INT>=n%) + P(LUK>=n%) (see
// buildAnyStatRows) - landing n%+ in any one of the four main stats. Shown
// only for ANY_STAT_CATEGORIES.
// 주스탯 = STR/DEX/INT/LUK % (all four are symmetric, so STR alone represents them),
// with 올스탯 % riding along on top whenever a real STR line is also present.
// HP % and 올스탯 % (standalone) are their own independent options.
// 드메 n줄 (아이템 드롭률/메소 획득량, either one counting toward the line count)
// only applies to the 잠재능력 table (not 에디셔널, per `includeDropMeso`) and
// only to DROP_MESO_CATEGORIES (ANY_STAT_CATEGORIES minus 벨트). Its pure 2/3줄
// section is shown first (above 아무스탯), and its 1/2줄 variants additionally
// ride along as "드메 n줄 + 아무스탯/주스탯/올스탯/HP" combo rows merged into each
// of those sections (드메 3줄 has no combo - it uses all 3 lines, leaving none
// for a stat). SECONDARY_STAT_OPTIONS-listed categories (모자 -> 쿨감, 장갑 ->
// 크뎀) similarly get an extra pure section (주스탯 위) plus their own
// "secondary + 주스탯/올스탯/HP" combo rows - see buildStatSectionRows. Both
// combo sources use mergeComboRows, re-sorting by average tries so they land
// wherever they naturally belong among the plain stat rows.
// Groups always render in this fixed order (드메 2/3줄(해당 부위만) -> 아무스탯 ->
// 순수 쿨감/크뎀(해당 부위만) -> 주스탯 -> 올스탯 -> HP), each already sorted by
// average tries ascending - never interleaved across groups (except the combo
// rows merged inside their own section). Empty groups (e.g. a grade with no
// HP option at all) are dropped entirely.
function buildGradeRowGroups(
  groups: CubeOptionGroup[],
  category: string,
  includeDropMeso: boolean
): OptionRow[][] {
  if (SOUL_RING_WEAPON_CATEGORIES.includes(category)) {
    if (!includeDropMeso) return buildAttackOnlyRowGroups(groups);
    return buildSoulRingRowGroups(groups, [ATTACK_TEMPLATE, BOSS_DAMAGE_TEMPLATE, IGNORE_DEFENSE_TEMPLATE]);
  }
  if (category === SOUL_RING_EMBLEM_CATEGORY) {
    if (!includeDropMeso) return buildAttackOnlyRowGroups(groups);
    return buildEmblemRowGroups(groups);
  }

  const secondaryOption = SECONDARY_STAT_OPTIONS[category];
  const includeDropMesoSection = includeDropMeso && DROP_MESO_CATEGORIES.includes(category);

  // 드메 1/2줄 + 아무스탯/주스탯/올스탯/HP combo rows, merged into their
  // respective section below via mergeComboRows - same joint-distribution
  // approach as the 쿨감/크뎀 combos above (buildStatSecondaryComboRows), just
  // with 드메's per-line count (countDropMesoLine) as the secondary axis.
  const anyStatRows = ANY_STAT_CATEGORIES.includes(category)
    ? buildAnyStatRows(
        groups,
        [["STR +n%"], ["DEX +n%"], ["INT +n%"], ["LUK +n%"]],
        ["올스탯 +n%"],
        (value) => `아무스탯 ${value}%`
      )
    : [];
  const anyStatComboRows = includeDropMesoSection
    ? buildAnyStatSecondaryComboRows(
        groups,
        [["STR +n%"], ["DEX +n%"], ["INT +n%"], ["LUK +n%"]],
        ["올스탯 +n%"],
        DROP_MESO_TEMPLATES,
        countDropMesoLine,
        (statValue, dropMesoLines) => `드메 ${dropMesoLines}줄 + 아무스탯 ${statValue}%`
      )
    : [];

  const buildDropMesoComboRows = (
    primaryTemplates: string[],
    bonusTemplates: string[],
    statLabel: string
  ): OptionRow[] =>
    includeDropMesoSection
      ? buildStatSecondaryComboRows(
          groups,
          primaryTemplates,
          bonusTemplates,
          DROP_MESO_TEMPLATES,
          countDropMesoLine,
          (statValue, dropMesoLines) => `드메 ${dropMesoLines}줄 + ${statLabel} ${statValue}%`
        )
      : [];

  return [
    ...(includeDropMesoSection
      ? [buildLineCountRows(groups, DROP_MESO_TEMPLATES, [2, 3], (count) => `드메 ${count}줄`)]
      : []),
    mergeComboRows(anyStatRows, anyStatComboRows),
    ...(secondaryOption ? [buildOptionRows(groups, [secondaryOption.template], secondaryOption.formatPure)] : []),
    mergeComboRows(
      buildStatSectionRows(groups, ["STR +n%"], ["올스탯 +n%"], "주스탯", secondaryOption),
      buildDropMesoComboRows(["STR +n%"], ["올스탯 +n%"], "주스탯")
    ),
    mergeComboRows(
      buildStatSectionRows(groups, ["올스탯 +n%"], [], "올스탯", secondaryOption),
      buildDropMesoComboRows(["올스탯 +n%"], [], "올스탯")
    ),
    mergeComboRows(
      buildStatSectionRows(groups, ["최대 HP +n%"], [], "HP", secondaryOption),
      buildDropMesoComboRows(["최대 HP +n%"], [], "HP")
    ),
  ].filter((rows) => rows.length > 0);
}

// Renders either the plain try count or, when `costPerTry` is given (RESET/
// ADDI_RESET), the average cost - row.rawTries (un-rounded) times the reset
// cost for this grade, formatted the same way as StarforceCard's 평균 비용.
function TriesCell({ isLoading, row, costPerTry }: { isLoading: boolean; row: OptionRow; costPerTry?: number }) {
  if (isLoading) return <SkeletonCell className="ml-auto h-4 w-10" />;
  if (costPerTry != null) {
    const cost = row.rawTries * costPerTry;
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{formatCostRounded(cost)}</span>
        </TooltipTrigger>
        <TooltipContent side="top">{formatCostExact(cost)}</TooltipContent>
      </Tooltip>
    );
  }
  return <>{`${row.averageTries.toLocaleString("en-US")}회`}</>;
}

// How many placeholder rows to guess when there's no previous table shape to
// borrow from yet (very first load, before any grade/category has ever
// resolved data).
const SKELETON_ROW_COUNT = 4;

// Overrides Skeleton's default bg-muted, which is invisible on rows that
// already have a bg-muted background (every other option group).
function SkeletonCell({ className }: { className: string }) {
  return <Skeleton className={cn("bg-muted-foreground/20", className)} />;
}

function SkeletonRows({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <tr key={index} className="border-b last:border-b-0">
          <td className="border-r px-3 py-1">
            <SkeletonCell className="h-4 w-20" />
          </td>
          <td className="px-3 py-1 text-right">
            <SkeletonCell className="ml-auto h-4 w-10" />
          </td>
        </tr>
      ))}
    </>
  );
}

// Shown only when there's no known table shape yet (first load with nothing
// cached). Once any data has ever resolved, the real grade sections below
// take over and skeletonize their own cells instead, keeping the same
// section/row count while a new fetch is in flight.
function GenericLoadingSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="flex items-center gap-1.5 rounded-t-md bg-muted/50 px-3 py-1.5">
        <Skeleton className="h-4 w-4 rounded-sm bg-muted-foreground/20" />
        <Skeleton className="h-4 w-12 bg-muted-foreground/20" />
      </div>
      <table className="border-collapse w-full text-xs">
        <thead>
          <tr className="border-b">
            <th className="border-r px-3 py-1 text-left font-medium text-muted-foreground">옵션</th>
            <th className="px-3 py-1 text-right font-medium text-muted-foreground">평균 횟수</th>
          </tr>
        </thead>
        <tbody>
          <SkeletonRows count={SKELETON_ROW_COUNT} />
        </tbody>
      </table>
    </div>
  );
}

export function PotentialTable({
  data,
  isLoading,
  cubeType,
  levelTier,
  excludedGrades,
  category,
  includeDropMeso = false,
}: {
  data: CubeProbabilityData | null;
  isLoading: boolean;
  cubeType: CubeType | null;
  levelTier: EquipmentLevelTier;
  excludedGrades?: CubeGrade[];
  category: string;
  includeDropMeso?: boolean;
}) {
  const grades = GRADE_ORDER.filter(
    (grade) => (data?.[grade]?.length ?? 0) > 0 && !excludedGrades?.includes(grade)
  );

  // RESET/ADDI_RESET show 평균 비용 (cost) instead of 평균 횟수 (try count) - see
  // RESET_COSTS above.
  const costsByGrade = cubeType ? RESET_COSTS[cubeType]?.[levelTier] : undefined;

  const [expandedGrades, setExpandedGrades] = useState<Set<CubeGrade>>(new Set());
  const hasInitializedRef = useRef(false);

  // Default to only the highest grade expanded, but only the very first time
  // data actually arrives - never again afterward. Switching cube/category can
  // make a grade disappear and later reappear (e.g. 골드 -> 실버 -> 골드), and
  // when it does, it should come back exactly as the user left it rather than
  // snapping back to the "only the max grade" default.
  useEffect(() => {
    if (hasInitializedRef.current || grades.length === 0) return;
    hasInitializedRef.current = true;
    setExpandedGrades(new Set([grades[grades.length - 1]]));
  }, [grades]);

  const toggleGrade = (grade: CubeGrade) => {
    setExpandedGrades((prev) => {
      const next = new Set(prev);
      if (next.has(grade)) next.delete(grade);
      else next.add(grade);
      return next;
    });
  };

  // `grades` is empty both on a genuine "no data" result and on the very
  // first load before anything has ever resolved (data is still null) - in
  // the latter case there's no previous shape to skeletonize, so fall back
  // to a generic guessed skeleton instead of collapsing to an empty state.
  if (!data || grades.length === 0) {
    if (isLoading) return <GenericLoadingSkeleton />;
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-muted-foreground">데이터를 불러올 수 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {grades.map((grade, gradeIndex) => {
        const isExpanded = expandedGrades.has(grade);
        const isLastGrade = gradeIndex === grades.length - 1;
        const optionRowGroups = buildGradeRowGroups(data[grade]!, category, includeDropMeso);

        const gradeUpStep = !isLastGrade && cubeType ? GRADE_UP_STEPS[cubeType][grade as GradeUpFromGrade] : undefined;
        const gradeUpRows = buildGradeUpRows(gradeUpStep);
        const costPerTry = costsByGrade?.[grade];

        return (
          <div key={grade} className={cn("rounded-md border", isExpanded && "rounded-b-none")}>
            <button
              type="button"
              onClick={() => toggleGrade(grade)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-left text-xs font-medium transition-colors hover:bg-muted",
                isExpanded && "rounded-b-none"
              )}
            >
              <span className="flex items-center gap-1.5">
                <GradeBadge grade={grade} />
                {GRADE_LABELS[grade]}
              </span>
              {isExpanded ? (
                <ChevronUp className="size-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="size-4 text-muted-foreground" />
              )}
            </button>

            {isExpanded && (
              <table className="border-collapse w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="border-r px-3 py-1 text-left font-medium text-muted-foreground">옵션</th>
                    <th className="px-3 py-1 text-right font-medium text-muted-foreground">
                      {costsByGrade ? "평균 비용" : "평균 횟수"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gradeUpRows.map((gradeUpRow, rowIndex) => (
                    <tr
                      key={gradeUpRow.label}
                      className={cn(
                        "border-b bg-muted",
                        rowIndex === gradeUpRows.length - 1 && optionRowGroups.length === 0 && "border-b-0"
                      )}
                    >
                      <td className="border-r px-3 py-1">
                        {isLoading ? <SkeletonCell className="h-4 w-20" /> : gradeUpRow.label}
                      </td>
                      <td className="px-3 py-1 text-right whitespace-nowrap tabular-nums">
                        <TriesCell isLoading={isLoading} row={gradeUpRow} costPerTry={costPerTry} />
                      </td>
                    </tr>
                  ))}
                  {optionRowGroups.flatMap((groupRows, groupIndex) => {
                    const isGroupMuted = groupIndex % 2 === 1;
                    return groupRows.map((row) => (
                      <tr key={row.label} className={cn("border-b last:border-b-0", isGroupMuted && "bg-muted")}>
                        <td className="border-r px-3 py-1">
                          {isLoading ? (
                            <SkeletonCell className="h-4 w-20" />
                          ) : row.tooltip ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-default">{row.label}</span>
                              </TooltipTrigger>
                              <TooltipContent>{row.tooltip}</TooltipContent>
                            </Tooltip>
                          ) : (
                            row.label
                          )}
                        </td>
                        <td className="px-3 py-1 text-right whitespace-nowrap tabular-nums">
                          <TriesCell isLoading={isLoading} row={row} costPerTry={costPerTry} />
                        </td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}
