import { BOSS, BOSS_DIFFICULTY, BOSS_TYPE } from "./bossConstants";

export default abstract class CrystalService {
  static price(bossType: BOSS_TYPE, difficulty: BOSS_DIFFICULTY) {
    return BOSS[bossType].prices[difficulty] ?? 0;
  }
  static getBossIcon(bossType: BOSS_TYPE): string {
    return BOSS[bossType].icon ?? "";
  }
}
