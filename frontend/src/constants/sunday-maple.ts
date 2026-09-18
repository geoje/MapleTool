export interface SundayMapleEffect {
  name: string;
  description?: string;
}

export const SUNDAY_MAPLE_EFFECTS: SundayMapleEffect[] = [
  { name: "스타포스 파괴 확률 감소", description: "21성 이하에서 스타포스 강화 시 파괴 확률 30% 감소" },
  { name: "스타포스 강화 비용 할인", description: "스타포스 강화 비용 30% 할인" },
  { name: "스타포스 흔적 복구 할인", description: "흔적 복구 비용 20% 할인" },
  { name: "미라클 타임" },
  {
    name: "헥사 스탯 강화 확률 증가",
    description: "[HEXA 스탯] 메인 스탯이 5레벨 이상일 때, 메인 스탯의 강화 확률 20% 증가",
  },
];
