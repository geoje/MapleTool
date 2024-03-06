export interface UnionArtifact {
  date: string;
  union_artifact_effect: UnionArtifactEffect[];
  union_artifact_crystal: UnionArtifactCrystal[];
}

export interface UnionArtifactCrystal {
  name: string;
  validity_flag: string;
  date_expire: string;
  level: number;
  crystal_option_name1: string;
  crystal_option_name2: string;
  crystal_option_name3: string;
}

export interface UnionArtifactEffect {
  name: string;
  level: number;
}
