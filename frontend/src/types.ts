import type { BossDifficulty, BossType } from "@/constants/boss";

export type BossOrder = "" | "price-asc" | "price-desc";

export interface BossPlanItem {
  type: BossType;
  difficulty: BossDifficulty;
  members: number;
}

export interface BossPlan {
  name: string;
  order: BossOrder;
  boss: BossPlanItem[];
}

export interface CharacterBasic {
  date: string;
  character_name: string;
  world_name: string;
  character_gender: string;
  character_class: string;
  character_class_level: string;
  character_level: number;
  character_exp: number;
  character_exp_rate: number;
  character_guild_name: string;
  character_image: string;
}
