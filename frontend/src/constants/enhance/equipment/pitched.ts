import { ItemEquipmentDetail } from "../../../types/character/itemEquipment";
import { EMPTY_OPTION } from "../equipment";

import TWILIGHT_MARK from "../../../assets/equipment/dawn/twilight-mark.webp";

export const PITCHED: Partial<ItemEquipmentDetail>[] = [
  {
    item_equipment_part: "얼굴장식",
    item_equipment_slot: "얼굴장식",
    item_name: "트와일라이트 마크",
    item_icon: TWILIGHT_MARK,
    scroll_upgradeable_count: "3",
    cuttable_count: "10",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 140,
      str: "5",
      dex: "5",
      int: "5",
      luk: "5",
      attack_power: "5",
      magic_power: "5",
      armor: "100",
    },
  },
];
