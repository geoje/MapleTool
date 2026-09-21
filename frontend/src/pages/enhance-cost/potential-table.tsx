import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CubeType, PotentialGrade, POTENTIAL_GRADE_INFOS } from "@/constants/enhance";
import type { CubeGrade, CubeOptionGroup, CubeProbabilityData } from "@/hooks/use-cube-probability";
import { extractPotentialOptionValue } from "@/lib/potential-option";

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
  // ADDI only: separate guarantee count for "에디셔널 잠재능력 재설정", which Nexon
  // discloses as its own column and does NOT match the 에디셔널/화이트 에디셔널 큐브
  // column (verified against the live disclosure page - rare/epic differ, unique matches).
  resetPity?: number;
}

// From-grade -> chance of moving up one tier, per cube. Source: Nexon's official
// "등급 상승 확률표" / "등급 상승 보장 시스템" (게임산업법 시행령 공시).
// BLACK's page discloses one merged "잠재능력 재설정/블랙 큐브" table, so no split
// is needed there. ADDI's page discloses two separate tables (재설정 vs
// 에디셔널/화이트 에디셔널 큐브) with different rare/epic guarantee counts - see
// `resetPity` below. MASTER/ARTISAN/STRANGE_ADDI have no guarantee system.
const GRADE_UP_STEPS: Record<CubeType, Partial<Record<GradeUpFromGrade, GradeUpStep>>> = {
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
  [CubeType.ADDI]: {
    rare: { probability: 0.047619, pity: 31, resetPity: 62 },
    epic: { probability: 0.019608, pity: 76, resetPity: 152 },
    unique: { probability: 0.007, pity: 214, resetPity: 214 },
  },
  [CubeType.STRANGE_ADDI]: {
    rare: { probability: 0.004 },
  },
};

// Expected try count for a Bernoulli(probability) event, where reaching `pity`
// consecutive failures forces a success on that attempt.
function expectedGradeUpTries(probability: number, pity?: number): number {
  if (!pity) return Math.ceil(1 / probability);

  let expected = 0;
  let survivalProbability = 1;
  for (let attempt = 1; attempt < pity; attempt++) {
    expected += attempt * survivalProbability * probability;
    survivalProbability *= 1 - probability;
  }
  expected += pity * survivalProbability;
  return Math.ceil(expected);
}

const MIRACLE_TIME_PROBABILITY_MULTIPLIER = 2;

function buildGradeUpRows(step: GradeUpStep | undefined): OptionRow[] {
  if (!step) return [];
  const miracleProbability = step.probability * MIRACLE_TIME_PROBABILITY_MULTIPLIER;
  const cubeTries = expectedGradeUpTries(step.probability, step.pity);
  const miracleCubeTries = expectedGradeUpTries(miracleProbability, step.pity);
  const rows: OptionRow[] =
    step.resetPity === undefined || step.resetPity === step.pity
      ? [
          { label: "등급업", averageTries: cubeTries },
          { label: "등급업 (미라클)", averageTries: miracleCubeTries },
        ]
      : [
          { label: "등급업 (재설정)", averageTries: expectedGradeUpTries(step.probability, step.resetPity) },
          { label: "등급업 (미라클+재설정)", averageTries: expectedGradeUpTries(miracleProbability, step.resetPity) },
          { label: "등급업 (큐브)", averageTries: cubeTries },
          { label: "등급업 (미라클+큐브)", averageTries: miracleCubeTries },
        ];
  return rows.sort((a, b) => a.averageTries - b.averageTries);
}

interface OptionRow {
  label: string;
  averageTries: number;
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
    rows.push({ label: formatLabel(total), averageTries: Math.ceil(1 / probability) });
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
    rows.push({ label: formatLabel(targetCount), averageTries: Math.ceil(1 / atLeastProbability) });
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
    rows.push({ label: formatLabel(total), averageTries: Math.ceil(1 / probability) });
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
    rows.push({ label: formatLabel(total), averageTries: Math.ceil(1 / Math.min(probability, 1)) });
  }
  return rows.sort((a, b) => a.averageTries - b.averageTries);
}

// 아무스탯/드메 are only meaningful on these accessory categories - other
// categories (weapons, armor, ...) can coincidentally match the same
// STR/DEX/INT/LUK templates and would otherwise leak these sections in too.
// Category strings match EQUIPMENT_CATEGORIES (frontend/src/constants/starforce.ts).
const ANY_STAT_CATEGORIES: string[] = ["얼굴장식", "눈장식", "귀고리", "펜던트", "벨트", "반지"];
const DROP_MESO_CATEGORIES: string[] = ANY_STAT_CATEGORIES.filter((category) => category !== "벨트");

// Only the "%" variants are shown - flat (non-percent) stat bumps are excluded.
// 아무스탯 = P(STR>=n%) + P(DEX>=n%) + P(INT>=n%) + P(LUK>=n%) (see
// buildAnyStatRows) - landing n%+ in any one of the four main stats. Shown
// only for ANY_STAT_CATEGORIES.
// 주스탯 = STR/DEX/INT/LUK % (all four are symmetric, so STR alone represents them),
// with 올스탯 % riding along on top whenever a real STR line is also present.
// HP % and 올스탯 % (standalone) are their own independent options.
// 드메 n줄 (아이템 드롭률/메소 획득량, either one counting toward the line count)
// only applies to the 잠재능력 table (not 에디셔널, per `includeDropMeso`) and
// only to DROP_MESO_CATEGORIES (ANY_STAT_CATEGORIES minus 벨트).
// Groups always render in this fixed order (아무스탯 -> 주스탯 -> 올스탯 -> HP ->
// 드메), each already sorted by average tries ascending - never interleaved
// across groups. Empty groups (e.g. a grade with no HP option at all) are
// dropped entirely.
function buildGradeRowGroups(
  groups: CubeOptionGroup[],
  category: string,
  includeDropMeso: boolean
): OptionRow[][] {
  return [
    ...(ANY_STAT_CATEGORIES.includes(category)
      ? [
          buildAnyStatRows(
            groups,
            [["STR +n%"], ["DEX +n%"], ["INT +n%"], ["LUK +n%"]],
            ["올스탯 +n%"],
            (value) => `아무스탯 ${value}%`
          ),
        ]
      : []),
    buildPrimaryWithBonusRows(groups, ["STR +n%"], ["올스탯 +n%"], (value) => `주스탯 ${value}%`),
    buildOptionRows(groups, ["올스탯 +n%"], (value) => `올스탯 ${value}%`),
    buildOptionRows(groups, ["최대 HP +n%"], (value) => `HP ${value}%`),
    ...(includeDropMeso && DROP_MESO_CATEGORIES.includes(category)
      ? [
          buildLineCountRows(
            groups,
            ["아이템 드롭률 +n%", "메소 획득량 +n%"],
            [2, 3],
            (count) => `드메 ${count}줄`
          ),
        ]
      : []),
  ].filter((rows) => rows.length > 0);
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
  excludedGrades,
  category,
  includeDropMeso = false,
}: {
  data: CubeProbabilityData | null;
  isLoading: boolean;
  cubeType: CubeType | null;
  excludedGrades?: CubeGrade[];
  category: string;
  includeDropMeso?: boolean;
}) {
  const grades = GRADE_ORDER.filter(
    (grade) => (data?.[grade]?.length ?? 0) > 0 && !excludedGrades?.includes(grade)
  );

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
                    <th className="px-3 py-1 text-right font-medium text-muted-foreground">평균 횟수</th>
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
                        {isLoading ? (
                          <SkeletonCell className="ml-auto h-4 w-10" />
                        ) : (
                          `${gradeUpRow.averageTries.toLocaleString("en-US")}회`
                        )}
                      </td>
                    </tr>
                  ))}
                  {optionRowGroups.flatMap((groupRows, groupIndex) => {
                    const isGroupMuted = groupIndex % 2 === 1;
                    return groupRows.map((row) => (
                      <tr key={row.label} className={cn("border-b last:border-b-0", isGroupMuted && "bg-muted")}>
                        <td className="border-r px-3 py-1">
                          {isLoading ? <SkeletonCell className="h-4 w-20" /> : row.label}
                        </td>
                        <td className="px-3 py-1 text-right whitespace-nowrap tabular-nums">
                          {isLoading ? (
                            <SkeletonCell className="ml-auto h-4 w-10" />
                          ) : (
                            `${row.averageTries.toLocaleString("en-US")}회`
                          )}
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
