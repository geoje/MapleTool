export interface UnionRaider {
  date: string;
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: UnionRaiderStat[];
  union_block: UnionRaiderBlock[];
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
