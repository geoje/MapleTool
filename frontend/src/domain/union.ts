export interface Union {
  basic?: UnionBasic;
  artifact?: UnionArtifact;
  raider?: UnionRaider;
}

export interface UnionBasic {
  date?: string;
  union_level?: number;
  union_grade?: string;
  artifact_level?: number;
  artifact_exp?: number;
  artifact_point?: number;
}

export interface UnionArtifact {
  date?: string;
  union_artifact_effect?: UnionArtifactEffect[];
  union_artifact_crystal?: UnionArtifactCrystal[];
}
export interface UnionArtifactEffect {
  name?: string;
  level?: number;
}
export interface UnionArtifactCrystal {
  name?: string;
  validity_flag?: string;
  date_expire?: string;
  level?: number;
  crystal_option_name1?: string;
  crystal_option_name2?: string;
  crystal_option_name3?: string;
}

export interface UnionRaider {
  date?: string;
  union_raider_stat?: string[];
  union_occupied_stat?: string[];
  union_inner_stat?: UnionRaiderStat[];
  union_block?: UnionRaiderBlock[];
}
export interface UnionRaiderStat {
  stat_field_id?: string;
  stat_field_effect?: string;
}
export interface UnionRaiderBlock {
  block_type?: string;
  block_class?: string;
  block_level?: string;
  block_control_point?: UnionRaiderBlockPoint;
  block_position?: UnionRaiderBlockPoint[];
}
export interface UnionRaiderBlockPoint {
  x?: number;
  y?: number;
}
