import { BOSS_DIFFICULTY, BOSS_TYPE } from "../../constants/boss";

export default interface BossPlan {
  name: string;
  image: string;
  order: string;
  boss: {
    type: BOSS_TYPE;
    difficulty: BOSS_DIFFICULTY;
    partyMembers: number;
  }[];
}
