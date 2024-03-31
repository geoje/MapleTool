export interface UnionRaider {
  date: string;
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: UnionRaiderStat[];
  union_block: UnionRaiderBlock[];
  use_preset_no: number;
  union_raider_preset_1: UnionRaiderPreset;
  union_raider_preset_2: UnionRaiderPreset;
  union_raider_preset_3: UnionRaiderPreset;
  union_raider_preset_4: UnionRaiderPreset;
  union_raider_preset_5: UnionRaiderPreset;
}

export interface UnionRaiderStat {
  stat_field_id: string;
  stat_field_effect: string;
}

export interface UnionRaiderBlock {
  block_type: string;
  block_class: string;
  block_level: string;
  block_control_point: UnionRaiderBlockPoint;
  block_position: UnionRaiderBlockPoint[];
}

export interface UnionRaiderBlockPoint {
  x: number;
  y: number;
}

export interface UnionRaiderPreset {
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: UnionRaiderStat[];
  union_block: UnionRaiderBlock[];
}
