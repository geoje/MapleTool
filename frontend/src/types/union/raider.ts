export interface Raider {
  date: string;
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: RaiderStat[];
  union_block: RaiderBlock[];
  use_preset_no: number;
  union_raider_preset_1: RaiderPreset;
  union_raider_preset_2: RaiderPreset;
  union_raider_preset_3: RaiderPreset;
  union_raider_preset_4: RaiderPreset;
  union_raider_preset_5: RaiderPreset;
}

export interface RaiderStat {
  stat_field_id: string;
  stat_field_effect: string;
}

export interface RaiderBlock {
  block_type: string;
  block_class: string;
  block_level: string;
  block_control_point: RaiderBlockPoint;
  block_position: RaiderBlockPoint[];
}

export interface RaiderBlockPoint {
  x: number;
  y: number;
}

export interface RaiderPreset {
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: RaiderStat[];
  union_block: RaiderBlock[];
}
