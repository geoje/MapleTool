import { BOSS, BOSS_DIFFICULTY, BOSS_TYPE } from "../constants/boss";
import BossPlan from "../types/user/bossPlan";

export function getPrice(bossType: BOSS_TYPE, difficulty: BOSS_DIFFICULTY) {
  return BOSS[bossType].prices[difficulty] ?? 0;
}
export function getBossIcon(bossType: BOSS_TYPE): string {
  return BOSS[bossType].icon ?? "";
}
export function calculateRevenue(bossPlan: BossPlan) {
  return bossPlan.boss
    .map(({ type, difficulty, members: partyMembers }) =>
      Math.round(getPrice(type, difficulty) / partyMembers)
    )
    .reduce((acc, cur) => acc + cur, 0);
}
export function getMaxMembers(
  bossType: BOSS_TYPE,
  difficulty?: BOSS_DIFFICULTY
) {
  return bossType == BOSS_TYPE.LOTUS && difficulty == BOSS_DIFFICULTY.EXTREME
    ? 2
    : bossType == BOSS_TYPE.LIMBO
    ? 3
    : 6;
}
