import { BOSS_DIFFICULTY } from "../../../service/user/crystal/bossConstants";

export interface CharacterBoss {
  name: string;
  boss: {
    icon: string;
    difficulty: BOSS_DIFFICULTY;
    partMembers: number;
  }[];
}
