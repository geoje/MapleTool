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

// 일반(명성치) 재설정 요구 명성치 - 등급별 x 고정 개수별. 에픽/유니크 행은 참고용으로만 보관하고,
// 실제 계산에는 레전드리 행만 쓴다 (1번째 줄만 레전드리가 나오는 구조라 나머지는 의미가 없음).
// Source: https://maplestory.nexon.com/Guide/OtherProbability/ability/reputevalue
export const NORMAL_RESET_REPUTATION_COST: Partial<Record<PotentialGrade, { none: number; one?: number; two?: number }>> = {
  [PotentialGrade.EPIC]: { none: 200 },
  [PotentialGrade.UNIQUE]: { none: 1500, one: 3000, two: 5500 },
  [PotentialGrade.LEGENDARY]: { none: 8000, one: 11000, two: 16000 },
};

// 고급(서큘레이터) 재설정 요구 명성치/메소 - 잠금 개수(0/1/2)별.
export const ADVANCED_RESET_COST_BY_LOCK_COUNT: { reputation: number; meso: number }[] = [
  { reputation: 20_000, meso: 2_000_000 },
  { reputation: 30_000, meso: 6_000_000 },
  { reputation: 40_000, meso: 15_000_000 },
];

// 고급 재설정에서 2/3번째 줄이 레전드리로 나올 확률(%). 1번째 줄은 항상 100% 레전드리.
export const ADVANCED_RESET_SECOND_THIRD_LEGENDARY_PROBABILITY = 2;

// 옵션의 레전드리 등급 수치 범위를 "최소~최대"로 채운 결과 문자열을 만든다. 예: 아드 -> "아드 18~20%".
export function formatAbilityResultRange(option: AbilityOptionInfo): string {
  const values = option.valueSteps
    .map((step) => step.valueByGrade[PotentialGrade.LEGENDARY])
    .filter((value): value is number => value !== undefined);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = min === max ? `${min}` : `${min}~${max}`;
  return option.resultTemplate.replace("n", range);
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
