import { ItemEquipmentDetail } from "../../../types/character/itemEquipment/itemEquipment";
import { EMPTY_OPTION } from "../equipment";

import BERSERKED from "../../../assets/equipment/pitched/berserked.webp";
import MAGIC_EYEPATCH from "../../../assets/equipment/pitched/magic-eyepatch.webp";
import BLACK_HEART from "../../../assets/equipment/pitched/black-heart.webp";
import COMPLETE_UNDER_CONTROL from "../../../assets/equipment/pitched/complete-under-control.png";
import DREAMY_BELT from "../../../assets/equipment/pitched/dreamy-belt.webp";
import SOURCE_OF_SUFFERING from "../../../assets/equipment/pitched/source-of-suffering.webp";
import GENESIS_BADGE from "../../../assets/equipment/pitched/genesis-badge.webp";
import COMMANDING_FORCE_EARRING from "../../../assets/equipment/pitched/commanding-force-earring.webp";
import ENDLESS_TERROR from "../../../assets/equipment/pitched/endless-terror.webp";
import CURSED_RED_SPELLBOOK from "../../../assets/equipment/pitched/cursed-red-spellbook.webp";
import CURSED_BLUE_SPELLBOOK from "../../../assets/equipment/pitched/cursed-blue-spellbook.webp";
import CURSED_GREEN_SPELLBOOK from "../../../assets/equipment/pitched/cursed-green-spellbook.webp";
import CURSED_YELLOW_SPELLBOOK from "../../../assets/equipment/pitched/cursed-yellow-spellbook.webp";
import MITRAS_RAGE_WARRIOR from "../../../assets/equipment/pitched/mitras-rage-warrior.webp";
import MITRAS_RAGE_MAGICIAN from "../../../assets/equipment/pitched/mitras-rage-magician.webp";
import MITRAS_RAGE_BOWMAN from "../../../assets/equipment/pitched/mitras-rage-bowman.webp";
import MITRAS_RAGE_THIEF from "../../../assets/equipment/pitched/mitras-rage-thief.webp";
import MITRAS_RAGE_PIRATE from "../../../assets/equipment/pitched/mitras-rage-pirate.webp";

export const PITCHED: Partial<ItemEquipmentDetail>[] = [
  {
    item_equipment_part: "얼굴장식",
    item_equipment_slot: "얼굴장식",
    item_name: "루즈 컨트롤 머신 마크",
    item_icon: BERSERKED,
    scroll_upgradeable_count: "5",
    cuttable_count: "5",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "10",
      dex: "10",
      int: "10",
      luk: "10",
      attack_power: "10",
      magic_power: "10",
      armor: "200",
    },
  },
  {
    item_equipment_part: "눈장식",
    item_equipment_slot: "눈장식",
    item_name: "마력이 깃든 안대",
    item_icon: MAGIC_EYEPATCH,
    scroll_upgradeable_count: "3",
    cuttable_count: "5",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "15",
      dex: "15",
      int: "15",
      luk: "15",
      attack_power: "3",
      magic_power: "3",
      armor: "300",
    },
  },
  {
    item_equipment_part: "기계 심장",
    item_equipment_slot: "기계 심장",
    item_name: "블랙 하트",
    item_icon: BLACK_HEART,
    scroll_upgrade: "11",
    starforce: "15",
    item_total_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 120,
      str: "50",
      dex: "50",
      int: "50",
      luk: "50",
      max_hp: "100",
      attack_power: "77",
      magic_power: "77",
    },
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 120,
      str: "10",
      dex: "10",
      int: "10",
      luk: "10",
      max_hp: "100",
    },
    item_etc_option: {
      ...EMPTY_OPTION,
      attack_power: "77",
      magic_power: "77",
    },
    item_starforce_option: {
      ...EMPTY_OPTION,
      str: "40",
      dex: "40",
      int: "40",
      luk: "40",
    },
    potential_option_grade: "에픽",
    potential_option_1: "보스 몬스터 공격 시 데미지 : +30%",
    potential_option_2: "몬스터 방어율 무시 : +30%",
  },
  {
    item_equipment_part: "기계 심장",
    item_equipment_slot: "기계 심장",
    item_name: "컴플리트 언더컨트롤",
    item_icon: COMPLETE_UNDER_CONTROL,
    scroll_upgradeable_count: "9",
    cuttable_count: "5",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      str: "25",
      dex: "25",
      int: "25",
      luk: "25",
      max_hp: "1250",
      attack_power: "15",
      magic_power: "15",
      ignore_monster_armor: "30%",
    },
  },
  {
    item_equipment_part: "벨트",
    item_equipment_slot: "벨트",
    item_name: "몽환의 벨트",
    item_icon: DREAMY_BELT,
    scroll_upgradeable_count: "3",
    cuttable_count: "5",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      str: "50",
      dex: "50",
      int: "50",
      luk: "50",
      max_hp: "150",
      max_mp: "150",
      attack_power: "6",
      magic_power: "6",
      armor: "150",
    },
  },
  {
    item_equipment_part: "펜던트",
    item_equipment_slot: "펜던트",
    item_name: "고통의 근원",
    item_icon: SOURCE_OF_SUFFERING,
    scroll_upgradeable_count: "5",
    cuttable_count: "5",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "10",
      dex: "10",
      int: "10",
      luk: "10",
      max_hp_rate: "5%",
      attack_power: "3",
      magic_power: "3",
      armor: "200",
    },
  },
  {
    item_equipment_part: "뱃지",
    item_equipment_slot: "뱃지",
    item_name: "창세의 뱃지",
    item_icon: GENESIS_BADGE,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      str: "15",
      dex: "15",
      int: "15",
      luk: "15",
      attack_power: "10",
      magic_power: "10",
      speed: "10",
      jump: "10",
    },
  },
  {
    item_equipment_part: "귀고리",
    item_equipment_slot: "귀고리",
    item_name: "커맨더 포스 이어링",
    item_icon: COMMANDING_FORCE_EARRING,
    scroll_upgradeable_count: "6",
    cuttable_count: "5",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      str: "7",
      dex: "7",
      int: "7",
      luk: "7",
      max_hp: "500",
      max_mp: "500",
      attack_power: "5",
      magic_power: "5",
      armor: "100",
    },
  },
  {
    item_equipment_part: "반지",
    item_equipment_slot: "반지",
    item_name: "거대한 공포",
    item_icon: ENDLESS_TERROR,
    scroll_upgradeable_count: "2",
    cuttable_count: "5",
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      str: "5",
      dex: "5",
      int: "5",
      luk: "5",
      max_hp: "250",
      max_mp: "250",
      attack_power: "4",
      magic_power: "4",
    },
  },
  {
    item_equipment_part: "포켓 아이템",
    item_equipment_slot: "포켓 아이템",
    item_name: "저주받은 적의 마도서",
    item_icon: CURSED_RED_SPELLBOOK,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "20",
      dex: "10",
      int: "10",
      luk: "10",
      max_hp: "100",
      max_mp: "100",
      attack_power: "10",
      magic_power: "10",
    },
  },
  {
    item_equipment_part: "포켓 아이템",
    item_equipment_slot: "포켓 아이템",
    item_name: "저주받은 청의 마도서",
    item_icon: CURSED_BLUE_SPELLBOOK,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "10",
      dex: "20",
      int: "10",
      luk: "10",
      max_hp: "100",
      max_mp: "100",
      attack_power: "10",
      magic_power: "10",
    },
  },
  {
    item_equipment_part: "포켓 아이템",
    item_equipment_slot: "포켓 아이템",
    item_name: "저주받은 녹의 마도서",
    item_icon: CURSED_GREEN_SPELLBOOK,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "10",
      dex: "10",
      int: "20",
      luk: "10",
      max_hp: "100",
      max_mp: "100",
      attack_power: "10",
      magic_power: "10",
    },
  },
  {
    item_equipment_part: "포켓 아이템",
    item_equipment_slot: "포켓 아이템",
    item_name: "저주받은 황의 마도서",
    item_icon: CURSED_YELLOW_SPELLBOOK,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 160,
      str: "10",
      dex: "10",
      int: "10",
      luk: "20",
      max_hp: "100",
      max_mp: "100",
      attack_power: "10",
      magic_power: "10",
    },
  },
  {
    item_equipment_part: "엠블렘",
    item_equipment_slot: "엠블렘",
    item_name: "미트라의 분노 : 전사",
    item_icon: MITRAS_RAGE_WARRIOR,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      str: "40",
      dex: "40",
      max_hp: "700",
      attack_power: "5",
      magic_power: "5",
    },
  },
  {
    item_equipment_part: "엠블렘",
    item_equipment_slot: "엠블렘",
    item_name: "미트라의 분노 : 마법사",
    item_icon: MITRAS_RAGE_MAGICIAN,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      int: "40",
      luk: "40",
      attack_power: "5",
      magic_power: "5",
    },
  },
  {
    item_equipment_part: "엠블렘",
    item_equipment_slot: "엠블렘",
    item_name: "미트라의 분노 : 궁수",
    item_icon: MITRAS_RAGE_BOWMAN,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      str: "40",
      dex: "40",
      attack_power: "5",
      magic_power: "5",
    },
  },
  {
    item_equipment_part: "엠블렘",
    item_equipment_slot: "엠블렘",
    item_name: "미트라의 분노 : 도적",
    item_icon: MITRAS_RAGE_THIEF,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      dex: "40",
      luk: "40",
      attack_power: "5",
      magic_power: "5",
    },
  },
  {
    item_equipment_part: "엠블렘",
    item_equipment_slot: "엠블렘",
    item_name: "미트라의 분노 : 해적",
    item_icon: MITRAS_RAGE_PIRATE,
    item_base_option: {
      ...EMPTY_OPTION,
      base_equipment_level: 200,
      str: "40",
      dex: "40",
      attack_power: "5",
      magic_power: "5",
    },
  },
];
