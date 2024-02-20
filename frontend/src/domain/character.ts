export interface Character {
  basic: CharacterBasic;
  itemEquipment: CharacterItemEquipment;
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

export interface CharacterItemEquipment {
  date: string;
  character_gender: string;
  character_class: string;
  preset_no: number;
  item_equipment: CharacterItemEquipmentDetail[];
  item_equipment_preset1: CharacterItemEquipmentDetail[];
  item_equipment_preset2: CharacterItemEquipmentDetail[];
  item_equipment_preset3: CharacterItemEquipmentDetail[];
  item_equipment_preset_1: CharacterItemEquipmentDetail[];
  item_equipment_preset_2: CharacterItemEquipmentDetail[];
  item_equipment_preset_3: CharacterItemEquipmentDetail[];
  title: CharacterItemEquipmentTitle;
  dragon_equipment: CharacterItemEquipmentDetail[];
  mechanic_equipment: CharacterItemEquipmentDetail[];
}
export interface CharacterItemEquipmentDetail {
  item_equipment_part: string;
  item_equipment_slot: string;
  item_name: string;
  item_icon: string;
  item_description: string;
  item_shape_name: string;
  item_shape_icon: string;
  item_gender: string;
  item_total_option: CharacterItemEquipmentOption;
  item_base_option: CharacterItemEquipmentOption;
  potential_option_grade: string;
  additional_potential_option_grade: string;
  potential_option_1: string;
  potential_option_2: string;
  potential_option_3: string;
  additional_potential_option_1: string;
  additional_potential_option_2: string;
  additional_potential_option_3: string;
  equipment_level_increase: number;
  item_exceptional_option: CharacterItemEquipmentOption;
  item_add_option: CharacterItemEquipmentOption;
  growth_exp: number;
  growth_level: number;
  scroll_upgrade: string;
  cuttable_count: string;
  golden_hammer_flag: string;
  scroll_resilience_count: string;
  scroll_upgradeable_count: string;
  soul_name: string;
  soul_option: string;
  item_etc_option: CharacterItemEquipmentOption;
  starforce: string;
  starforce_scroll_flag: string;
  item_starforce_option: CharacterItemEquipmentOption;
  special_ring_level: number;
  date_expire: string;
}
export interface CharacterItemEquipmentOption {
  str: string;
  dex: string;
  intellect: string;
  luk: string;
  max_hp: string;
  max_mp: string;
  attack_power: string;
  magic_power: string;
  armor: string;
  speed: string;
  jump: string;
  boss_damage: string;
  ignore_monster_armor: string;
  all_stat: string;
  damage: string;
  equipment_level_decrease: number;
  max_hp_rate: string;
  max_mp_rate: string;
  base_equipment_level: number;
}
export interface CharacterItemEquipmentTitle {
  title_name: string;
  title_icon: string;
  title_description: string;
  date_expire: string;
  date_option_expire: string;
}
