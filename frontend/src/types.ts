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

export interface UnionBasic {
  date: string;
  union_level: number;
  union_grade: string;
  union_artifact_level: number;
  union_artifact_exp: number;
  union_artifact_point: number;
}

export interface ArtifactEffect {
  name: string;
  level: number;
}

export interface ArtifactCrystal {
  name: string;
  validity_flag: string;
  date_expire: string;
  level: number;
  crystal_option_name_1: string;
  crystal_option_name_2: string;
  crystal_option_name_3: string;
}

export interface UnionArtifact {
  date: string;
  union_artifact_effect: ArtifactEffect[];
  union_artifact_crystal: ArtifactCrystal[];
  union_artifact_remain_ap: number;
}

export interface ItemEquipmentDetail {
  item_equipment_slot: string;
  item_name: string;
  item_icon: string;
  potential_option_grade: string;
  additional_potential_option_grade: string;
}

export interface ItemEquipment {
  item_equipment_preset_1: ItemEquipmentDetail[];
  item_equipment_preset_2: ItemEquipmentDetail[];
  item_equipment_preset_3: ItemEquipmentDetail[];
}
