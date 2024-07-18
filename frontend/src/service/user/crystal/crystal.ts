import BossPlan from "../../../dto/user/crystal/bossPlan";
import { BOSS, BOSS_DIFFICULTY, BOSS_TYPE } from "./bossConstants";

export default abstract class CrystalService {
  static price(bossType: BOSS_TYPE, difficulty: BOSS_DIFFICULTY) {
    return BOSS[bossType].prices[difficulty] ?? 0;
  }
  static getBossIcon(bossType: BOSS_TYPE): string {
    return BOSS[bossType].icon ?? "";
  }
  static calculateRevenue(bossPlan: BossPlan) {
    return bossPlan.boss
      .map(({ type, difficulty, partyMembers }) =>
        Math.round(CrystalService.price(type, difficulty) / partyMembers)
      )
      .reduce((acc, cur) => acc + cur, 0);
  }
}
