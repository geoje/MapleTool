export interface Artifact {
  date: string;
  union_artifact_effect: ArtifactEffect[];
  union_artifact_crystal: ArtifactCrystal[];
  union_artifact_remain_ap: number;
}

export interface ArtifactCrystal {
  name: string;
  validity_flag: string;
  date_expire: string;
  level: number;
  crystal_option_name1: string;
  crystal_option_name2: string;
  crystal_option_name3: string;
}

export interface ArtifactEffect {
  name: string;
  level: number;
}
