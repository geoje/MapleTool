import { ItemEquipmentDetail } from "../../../types/character/itemEquipment";
import { EMPTY_OPTION } from "../equipment";

import WHISPERS_OF_THE_SOURCE from "../../../assets/equipment/radiance/whispers-of-the-source.webp";

export const RADIANCE: Partial<ItemEquipmentDetail>[] = [
  {
    item_equipment_part: "반지",
    item_equipment_slot: "반지",
    item_name: "근원의 속삭임",
    item_icon: WHISPERS_OF_THE_SOURCE,
    scroll_upgradeable_count: "3",
    cuttable_count: "5",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 250,
      str: "10",
      dex: "10",
      int: "10",
      luk: "10",
      max_hp: "500",
      max_mp: "500",
      attack_power: "5",
      magic_power: "5",
    },
  },
];
