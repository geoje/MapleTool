import { PotentialGrade } from "@/constants/enhance";

// Source: https://maplestory.nexon.com/Guide/OtherProbability/ability/reputevalue
export interface AbilityOptionValueStep {
  probability: number;
  valueByGrade: Partial<Record<PotentialGrade, number>>;
}

export interface AbilityOptionInfo {
  name: string;
  abbreviation: string;
  // "n" is replaced with the actual rolled value, e.g. "크확 n%" -> "크확 7%".
  resultTemplate: string;
  probabilityByGrade: Partial<Record<PotentialGrade, number>>;
  valueSteps: AbilityOptionValueStep[];
}

export const MAX_SELECTED_ABILITY_OPTIONS = 3;

export const ResetType = {
  NORMAL: "NORMAL",
  ADVANCED: "ADVANCED",
} as const;

export type ResetType = (typeof ResetType)[keyof typeof ResetType];

// Reputation cost for a normal reset, by grade and line count. Only the legendary row is
// actually used - line 1 always rolls legendary, so the epic/unique rows exist for reference only.
// Source: https://maplestory.nexon.com/Guide/OtherProbability/ability/reputevalue
export const NORMAL_RESET_REPUTATION_COST: Partial<Record<PotentialGrade, { none: number; one?: number; two?: number }>> = {
  [PotentialGrade.EPIC]: { none: 200 },
  [PotentialGrade.UNIQUE]: { none: 1500, one: 3000, two: 5500 },
  [PotentialGrade.LEGENDARY]: { none: 8000, one: 11000, two: 16000 },
};

export const ADVANCED_RESET_COST_BY_LOCK_COUNT: { reputation: number; meso: number }[] = [
  { reputation: 20_000, meso: 2_000_000 },
  { reputation: 30_000, meso: 6_000_000 },
  { reputation: 40_000, meso: 15_000_000 },
];

// Chance (%) that lines 2/3 roll legendary in an advanced reset (remainder: epic 83%, unique
// 15%; line 1 is always legendary). Each option's probabilityByGrade[LEGENDARY] is conditional
// on legendary already hitting, so it must be multiplied by this value to get the absolute odds.
export const ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY = 2;

// Chance (%) that lines 2/3 roll unique in a normal reset (remaining 85% is epic; these lines
// can never roll legendary). Same multiplication rule as
// ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY applies.
export const NORMAL_RESET_SECOND_THIRD_UNIQUE_PROBABILITY = 15;

// An option with no UNIQUE-grade values (currently only "패시브 스킬 레벨 증가") can never land on
// the unique-only row2/row3, so it's forced into the first slot (the always-legendary row1)
// regardless of click order - otherwise it could end up picked as the 2nd/3rd option (e.g. after
// being selected in advanced reset, where any slot order is allowed, then switching to normal
// reset), where code targeting row2/row3 would look up UNIQUE values it doesn't have.
export function resolveSelectedOptionOrder(selectedNames: Set<string>): string[] {
  const names = Array.from(selectedNames);
  const legendaryOnlyNames = names.filter((name) => {
    const info = ABILITY_OPTION_INFOS.find((option) => option.name === name);
    return info !== undefined && info.probabilityByGrade[PotentialGrade.UNIQUE] === undefined;
  });
  const rest = names.filter((name) => !legendaryOnlyNames.includes(name));
  return [...legendaryOnlyNames, ...rest];
}

export function formatAbilityResultRange(option: AbilityOptionInfo, grade: PotentialGrade = PotentialGrade.LEGENDARY): string {
  const values = option.valueSteps
    .map((step) => step.valueByGrade[grade])
    .filter((value): value is number => value !== undefined);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = min === max ? `${min}` : `${min}~${max}`;
  return option.resultTemplate.replace("n", range);
}

function maxValueStep(option: AbilityOptionInfo, grade: PotentialGrade): AbilityOptionValueStep {
  const stepsAtGrade = option.valueSteps.filter((step) => step.valueByGrade[grade] !== undefined);
  return stepsAtGrade.reduce((max, step) => (step.valueByGrade[grade]! > max.valueByGrade[grade]! ? step : max));
}

export function formatAbilityResultMax(option: AbilityOptionInfo, grade: PotentialGrade = PotentialGrade.LEGENDARY): string {
  const max = maxValueStep(option, grade).valueByGrade[grade];
  return option.resultTemplate.replace("n", `${max}`);
}

// Chance (%) that a circulator reroll (which keeps the option/grade and only rerolls the numeric
// value) lands on the highest value tier for this option at the given grade. Several of the 6
// value steps often share the same (highest) value - e.g. "패시브 스킬 레벨 증가" is 1 on all 6 steps -
// so every step tied for the max counts as a hit, not just whichever one maxValueStep happens to
// return.
export function maxValueProbability(option: AbilityOptionInfo, grade: PotentialGrade = PotentialGrade.LEGENDARY): number {
  const max = maxValueStep(option, grade).valueByGrade[grade];
  return option.valueSteps
    .filter((step) => step.valueByGrade[grade] === max)
    .reduce((sum, step) => sum + step.probability, 0);
}

export const ABILITY_OPTION_INFOS: AbilityOptionInfo[] = [
  {
    name: "공격력 증가",
    abbreviation: "공격력",
    resultTemplate: "공격력 n",
    probabilityByGrade: { [PotentialGrade.EPIC]: 1.8536, [PotentialGrade.UNIQUE]: 1.4085, [PotentialGrade.LEGENDARY]: 2.3127 },
    valueSteps: [
      { probability: 20, valueByGrade: { [PotentialGrade.EPIC]: 6, [PotentialGrade.UNIQUE]: 15, [PotentialGrade.LEGENDARY]: 27 } },
      { probability: 20, valueByGrade: { [PotentialGrade.EPIC]: 6, [PotentialGrade.UNIQUE]: 18, [PotentialGrade.LEGENDARY]: 27 } },
      { probability: 20, valueByGrade: { [PotentialGrade.EPIC]: 9, [PotentialGrade.UNIQUE]: 18, [PotentialGrade.LEGENDARY]: 27 } },
      { probability: 15, valueByGrade: { [PotentialGrade.EPIC]: 9, [PotentialGrade.UNIQUE]: 18, [PotentialGrade.LEGENDARY]: 30 } },
      { probability: 15, valueByGrade: { [PotentialGrade.EPIC]: 9, [PotentialGrade.UNIQUE]: 21, [PotentialGrade.LEGENDARY]: 30 } },
      { probability: 10, valueByGrade: { [PotentialGrade.EPIC]: 12, [PotentialGrade.UNIQUE]: 21, [PotentialGrade.LEGENDARY]: 30 } },
    ],
  },
  {
    name: "크리티컬 확률 % 증가",
    abbreviation: "크확",
    resultTemplate: "크확 n%",
    probabilityByGrade: { [PotentialGrade.EPIC]: 0.9268, [PotentialGrade.UNIQUE]: 0.4695, [PotentialGrade.LEGENDARY]: 0.4625 },
    valueSteps: [
      { probability: 20, valueByGrade: { [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 15, [PotentialGrade.LEGENDARY]: 25 } },
      { probability: 20, valueByGrade: { [PotentialGrade.EPIC]: 6, [PotentialGrade.UNIQUE]: 16, [PotentialGrade.LEGENDARY]: 26 } },
      { probability: 20, valueByGrade: { [PotentialGrade.EPIC]: 7, [PotentialGrade.UNIQUE]: 17, [PotentialGrade.LEGENDARY]: 27 } },
      { probability: 15, valueByGrade: { [PotentialGrade.EPIC]: 8, [PotentialGrade.UNIQUE]: 18, [PotentialGrade.LEGENDARY]: 28 } },
      { probability: 15, valueByGrade: { [PotentialGrade.EPIC]: 9, [PotentialGrade.UNIQUE]: 19, [PotentialGrade.LEGENDARY]: 29 } },
      { probability: 10, valueByGrade: { [PotentialGrade.EPIC]: 10, [PotentialGrade.UNIQUE]: 20, [PotentialGrade.LEGENDARY]: 30 } },
    ],
  },
  {
    name: "최대 HP % 증가",
    abbreviation: "HP",
    resultTemplate: "HP n%",
    probabilityByGrade: { [PotentialGrade.UNIQUE]: 1.8779, [PotentialGrade.LEGENDARY]: 1.8501 },
    valueSteps: [
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 5, [PotentialGrade.LEGENDARY]: 15 } },
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 6, [PotentialGrade.LEGENDARY]: 16 } },
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 17 } },
      { probability: 15, valueByGrade: { [PotentialGrade.UNIQUE]: 8, [PotentialGrade.LEGENDARY]: 18 } },
      { probability: 15, valueByGrade: { [PotentialGrade.UNIQUE]: 9, [PotentialGrade.LEGENDARY]: 19 } },
      { probability: 10, valueByGrade: { [PotentialGrade.UNIQUE]: 10, [PotentialGrade.LEGENDARY]: 20 } },
    ],
  },
  {
    name: "보스 몬스터 공격 시 데미지 % 증가",
    abbreviation: "보공",
    resultTemplate: "보공 n%",
    probabilityByGrade: { [PotentialGrade.UNIQUE]: 0.939, [PotentialGrade.LEGENDARY]: 2.3127 },
    valueSteps: [
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 5, [PotentialGrade.LEGENDARY]: 15 } },
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 6, [PotentialGrade.LEGENDARY]: 16 } },
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 17 } },
      { probability: 15, valueByGrade: { [PotentialGrade.UNIQUE]: 8, [PotentialGrade.LEGENDARY]: 18 } },
      { probability: 15, valueByGrade: { [PotentialGrade.UNIQUE]: 9, [PotentialGrade.LEGENDARY]: 19 } },
      { probability: 10, valueByGrade: { [PotentialGrade.UNIQUE]: 10, [PotentialGrade.LEGENDARY]: 20 } },
    ],
  },
  {
    name: "일반 몬스터 공격 시 데미지 % 증가",
    abbreviation: "일몹뎀",
    resultTemplate: "일몹뎀 n%",
    probabilityByGrade: {
      [PotentialGrade.RARE]: 3.02768,
      [PotentialGrade.EPIC]: 2.7804,
      [PotentialGrade.UNIQUE]: 1.8779,
      [PotentialGrade.LEGENDARY]: 1.8501,
    },
    valueSteps: [
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 2, [PotentialGrade.EPIC]: 4, [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 9 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 2, [PotentialGrade.EPIC]: 4, [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 9 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 2, [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 10 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 2, [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 10 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 3, [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 8, [PotentialGrade.LEGENDARY]: 10 },
      },
      {
        probability: 10,
        valueByGrade: { [PotentialGrade.RARE]: 3, [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 8, [PotentialGrade.LEGENDARY]: 10 },
      },
    ],
  },
  {
    name: "상태 이상에 걸린 대상 공격 시 데미지 % 증가",
    abbreviation: "상추뎀",
    resultTemplate: "상추뎀 n%",
    probabilityByGrade: {
      [PotentialGrade.RARE]: 3.02768,
      [PotentialGrade.EPIC]: 2.7804,
      [PotentialGrade.UNIQUE]: 1.8779,
      [PotentialGrade.LEGENDARY]: 1.8501,
    },
    valueSteps: [
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 2, [PotentialGrade.EPIC]: 4, [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 9 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 2, [PotentialGrade.EPIC]: 4, [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 9 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 2, [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 10 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 2, [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 10 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 3, [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 8, [PotentialGrade.LEGENDARY]: 10 },
      },
      {
        probability: 10,
        valueByGrade: { [PotentialGrade.RARE]: 3, [PotentialGrade.EPIC]: 5, [PotentialGrade.UNIQUE]: 8, [PotentialGrade.LEGENDARY]: 10 },
      },
    ],
  },
  {
    name: "스킬 사용 시 % 확률로 재사용 대기시간이 미적용",
    abbreviation: "재사용",
    resultTemplate: "재사용 n%",
    probabilityByGrade: { [PotentialGrade.UNIQUE]: 1.8779, [PotentialGrade.LEGENDARY]: 1.8501 },
    valueSteps: [
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 5, [PotentialGrade.LEGENDARY]: 15 } },
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 6, [PotentialGrade.LEGENDARY]: 16 } },
      { probability: 20, valueByGrade: { [PotentialGrade.UNIQUE]: 7, [PotentialGrade.LEGENDARY]: 17 } },
      { probability: 15, valueByGrade: { [PotentialGrade.UNIQUE]: 8, [PotentialGrade.LEGENDARY]: 18 } },
      { probability: 15, valueByGrade: { [PotentialGrade.UNIQUE]: 9, [PotentialGrade.LEGENDARY]: 19 } },
      { probability: 10, valueByGrade: { [PotentialGrade.UNIQUE]: 10, [PotentialGrade.LEGENDARY]: 20 } },
    ],
  },
  {
    name: "패시브 스킬 레벨 증가",
    abbreviation: "패시브",
    resultTemplate: "패시브 n",
    probabilityByGrade: { [PotentialGrade.LEGENDARY]: 0.7401 },
    valueSteps: [
      { probability: 20, valueByGrade: { [PotentialGrade.LEGENDARY]: 1 } },
      { probability: 20, valueByGrade: { [PotentialGrade.LEGENDARY]: 1 } },
      { probability: 20, valueByGrade: { [PotentialGrade.LEGENDARY]: 1 } },
      { probability: 15, valueByGrade: { [PotentialGrade.LEGENDARY]: 1 } },
      { probability: 15, valueByGrade: { [PotentialGrade.LEGENDARY]: 1 } },
      { probability: 10, valueByGrade: { [PotentialGrade.LEGENDARY]: 1 } },
    ],
  },
  {
    name: "버프 스킬의 지속 시간 증가",
    abbreviation: "벞지",
    resultTemplate: "벞지 n%",
    probabilityByGrade: {
      [PotentialGrade.RARE]: 3.4602,
      [PotentialGrade.EPIC]: 1.3902,
      [PotentialGrade.UNIQUE]: 0.939,
      [PotentialGrade.LEGENDARY]: 0.9251,
    },
    valueSteps: [
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 7, [PotentialGrade.EPIC]: 19, [PotentialGrade.UNIQUE]: 32, [PotentialGrade.LEGENDARY]: 44 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 8, [PotentialGrade.EPIC]: 20, [PotentialGrade.UNIQUE]: 33, [PotentialGrade.LEGENDARY]: 45 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 9, [PotentialGrade.EPIC]: 22, [PotentialGrade.UNIQUE]: 34, [PotentialGrade.LEGENDARY]: 47 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 10, [PotentialGrade.EPIC]: 23, [PotentialGrade.UNIQUE]: 35, [PotentialGrade.LEGENDARY]: 48 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 12, [PotentialGrade.EPIC]: 24, [PotentialGrade.UNIQUE]: 37, [PotentialGrade.LEGENDARY]: 49 },
      },
      {
        probability: 10,
        valueByGrade: { [PotentialGrade.RARE]: 13, [PotentialGrade.EPIC]: 25, [PotentialGrade.UNIQUE]: 38, [PotentialGrade.LEGENDARY]: 50 },
      },
    ],
  },
  {
    name: "아이템 드롭률 % 증가",
    abbreviation: "아드",
    resultTemplate: "아드 n%",
    probabilityByGrade: {
      [PotentialGrade.RARE]: 3.4602,
      [PotentialGrade.EPIC]: 2.7804,
      [PotentialGrade.UNIQUE]: 1.8779,
      [PotentialGrade.LEGENDARY]: 1.8501,
    },
    valueSteps: [
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 3, [PotentialGrade.EPIC]: 8, [PotentialGrade.UNIQUE]: 13, [PotentialGrade.LEGENDARY]: 18 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 3, [PotentialGrade.EPIC]: 8, [PotentialGrade.UNIQUE]: 13, [PotentialGrade.LEGENDARY]: 18 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 4, [PotentialGrade.EPIC]: 9, [PotentialGrade.UNIQUE]: 14, [PotentialGrade.LEGENDARY]: 19 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 4, [PotentialGrade.EPIC]: 9, [PotentialGrade.UNIQUE]: 14, [PotentialGrade.LEGENDARY]: 19 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 5, [PotentialGrade.EPIC]: 10, [PotentialGrade.UNIQUE]: 15, [PotentialGrade.LEGENDARY]: 20 },
      },
      {
        probability: 10,
        valueByGrade: { [PotentialGrade.RARE]: 5, [PotentialGrade.EPIC]: 10, [PotentialGrade.UNIQUE]: 15, [PotentialGrade.LEGENDARY]: 20 },
      },
    ],
  },
  {
    name: "메소 획득량 % 증가",
    abbreviation: "메획",
    resultTemplate: "메획 n%",
    probabilityByGrade: {
      [PotentialGrade.RARE]: 3.4602,
      [PotentialGrade.EPIC]: 2.7804,
      [PotentialGrade.UNIQUE]: 1.8779,
      [PotentialGrade.LEGENDARY]: 1.8501,
    },
    valueSteps: [
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 3, [PotentialGrade.EPIC]: 8, [PotentialGrade.UNIQUE]: 13, [PotentialGrade.LEGENDARY]: 18 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 3, [PotentialGrade.EPIC]: 8, [PotentialGrade.UNIQUE]: 13, [PotentialGrade.LEGENDARY]: 18 },
      },
      {
        probability: 20,
        valueByGrade: { [PotentialGrade.RARE]: 4, [PotentialGrade.EPIC]: 9, [PotentialGrade.UNIQUE]: 14, [PotentialGrade.LEGENDARY]: 19 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 4, [PotentialGrade.EPIC]: 9, [PotentialGrade.UNIQUE]: 14, [PotentialGrade.LEGENDARY]: 19 },
      },
      {
        probability: 15,
        valueByGrade: { [PotentialGrade.RARE]: 5, [PotentialGrade.EPIC]: 10, [PotentialGrade.UNIQUE]: 15, [PotentialGrade.LEGENDARY]: 20 },
      },
      {
        probability: 10,
        valueByGrade: { [PotentialGrade.RARE]: 5, [PotentialGrade.EPIC]: 10, [PotentialGrade.UNIQUE]: 15, [PotentialGrade.LEGENDARY]: 20 },
      },
    ],
  },
];
