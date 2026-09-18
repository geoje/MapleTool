export interface SundayEffect {
  key: string;
  label: string;
  description?: string;
}

export const SUNDAY_STARFORCE_EFFECTS: SundayEffect[] = [
  { key: "destructionReduction", label: "파괴 감소", description: "21성 이하에서 스타포스 강화 시 파괴 확률 30% 감소" },
  { key: "enhanceDiscount", label: "강화 할인", description: "스타포스 강화 비용 30% 할인" },
  { key: "restoreDiscount", label: "복구 할인", description: "흔적 복구 비용 20% 할인" },
];

export const MIRACLE_TIME_EFFECT: SundayEffect = { key: "miracleTime", label: "미라클 타임" };
