import { BOSS, BOSS_DIFFICULTY, BOSS_TYPE } from "./bossConstants";

export default abstract class CrystalService {
  static price(bossType: BOSS_TYPE, difficulty: BOSS_DIFFICULTY) {
    return BOSS[bossType].price[difficulty] ?? 0;
  }
}
