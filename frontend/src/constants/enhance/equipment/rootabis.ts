import { ItemEquipmentDetail } from "../../../types/character/itemEquipment";
import { EMPTY_OPTION } from "../equipment";
import WARRIOR_HAT from "../../../assets/equipment/rootabis/warrior/armor/hat.webp";
import MAGICIAN_HAT from "../../../assets/equipment/rootabis/magician/armor/hat.webp";

export const ROOTABIS: Record<string, Partial<ItemEquipmentDetail>[]> = {
  HAT: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "하이네스 워리어헬름",
      item_icon: WARRIOR_HAT,
      scroll_upgradeable_count: "11",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 150,
        str: "40",
        dex: "40",
        max_hp: "360",
        max_mp: "360",
        attack_power: "2",
        armor: "390",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "하이네스 던위치햇",
      item_icon: MAGICIAN_HAT,
      scroll_upgradeable_count: "11",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 150,
        int: "40",
        luk: "40",
        max_hp: "360",
        max_mp: "360",
        magic_power: "2",
        armor: "180",
        ignore_monster_armor: "10%",
      },
    },
  ],
};
