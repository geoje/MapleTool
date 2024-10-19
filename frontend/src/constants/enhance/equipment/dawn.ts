import { ItemEquipmentDetail } from "../../../types/character/itemEquipment/itemEquipment";
import { EMPTY_OPTION } from "../equipment";

import TWILIGHT_MARK from "../../../assets/equipment/dawn/twilight-mark.webp";
import ESTELLA_EARRINGS from "../../../assets/equipment/dawn/estella-earrings.webp";
import DAWN_GUARDIAN_ANGLE_RING from "../../../assets/equipment/dawn/dawn-guardian-angel-ring.webp";
import DAYBREAK_PENDANT from "../../../assets/equipment/dawn/daybreak-pendant.webp";

export const DAWN: Partial<ItemEquipmentDetail>[] = [
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
  {
    item_equipment_part: "귀고리",
    item_equipment_slot: "귀고리",
    item_name: "에스텔라 이어링",
    item_icon: ESTELLA_EARRINGS,
    scroll_upgradeable_count: "6",
    cuttable_count: "10",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "7",
      dex: "7",
      int: "7",
      luk: "7",
      max_hp: "300",
      max_mp: "300",
      attack_power: "2",
      magic_power: "2",
      armor: "100",
    },
  },
  {
    item_equipment_part: "반지",
    item_equipment_slot: "반지",
    item_name: "여명의 가디언 엔젤 링",
    item_icon: DAWN_GUARDIAN_ANGLE_RING,
    scroll_upgradeable_count: "2",
    cuttable_count: "10",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "5",
      dex: "5",
      int: "5",
      luk: "5",
      max_hp: "200",
      max_mp: "200",
      attack_power: "2",
      magic_power: "2",
    },
  },
  {
    item_equipment_part: "펜던트",
    item_equipment_slot: "펜던트",
    item_name: "데이브레이크 펜던트",
    item_icon: DAYBREAK_PENDANT,
    scroll_upgradeable_count: "5",
    cuttable_count: "10",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 140,
      str: "8",
      dex: "8",
      int: "8",
      luk: "8",
      max_hp_rate: "5%",
      attack_power: "2",
      magic_power: "2",
      armor: "100",
    },
  },
];
