import { BOSS_DIFFICULTY, BOSS_TYPE } from "../../constants/boss";

export default interface BossPlan {
  name: string;
  order: string; // "" | "price-asc" | "price-desc"
  boss: {
    type: BOSS_TYPE;
    difficulty: BOSS_DIFFICULTY;
    partyMembers: number;
  }[];
}
