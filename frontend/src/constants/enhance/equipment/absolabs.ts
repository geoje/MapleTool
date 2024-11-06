import { ItemEquipmentDetail } from "../../../types/character/itemEquipment/itemEquipment";
import { EMPTY_OPTION } from "../equipment";

import SHOES from "../../../assets/equipment/absolabs/common/shoes.webp";
import GLOVES from "../../../assets/equipment/absolabs/common/gloves.webp";
import CAPE from "../../../assets/equipment/absolabs/common/cape.webp";
import SHOULDER from "../../../assets/equipment/absolabs/common/shoulder.webp";

import WARRIOR_HAT from "../../../assets/equipment/absolabs/warrior/armor/hat.webp";
import WARRIOR_OVERALL from "../../../assets/equipment/absolabs/warrior/armor/overall.webp";
import ONE_HANDED_SWORD from "../../../assets/equipment/absolabs/warrior/weapon/one-handed-sword.webp";
import ONE_HANDED_AXE from "../../../assets/equipment/absolabs/warrior/weapon/one-handed-axe.webp";
import ONE_HANDED_BLUNT from "../../../assets/equipment/absolabs/warrior/weapon/one-handed-blunt.webp";
import TWO_HANDED_SWORD from "../../../assets/equipment/absolabs/warrior/weapon/two-handed-sword.webp";
import TWO_HANDED_AXE from "../../../assets/equipment/absolabs/warrior/weapon/two-handed-axe.webp";
import TWO_HANDED_BLUNT from "../../../assets/equipment/absolabs/warrior/weapon/two-handed-blunt.webp";
import SPEAR from "../../../assets/equipment/absolabs/warrior/weapon/spear.webp";
import POLEARM from "../../../assets/equipment/absolabs/warrior/weapon/polearm.webp";
import DESPERADO from "../../../assets/equipment/absolabs/warrior/weapon/desperado.webp";
import KATANA from "../../../assets/equipment/absolabs/warrior/weapon/katana.webp";
import ARM_CANNON from "../../../assets/equipment/absolabs/warrior/weapon/arm-cannon.webp";
import BLADECASTER from "../../../assets/equipment/absolabs/warrior/weapon/bladecaster.webp";
import LONG_SWORD from "../../../assets/equipment/absolabs/warrior/weapon/long-sword.webp";
import HEAVY_SWORD from "../../../assets/equipment/absolabs/warrior/weapon/heavy-sword.webp";

import MAGICIAN_HAT from "../../../assets/equipment/absolabs/magician/armor/hat.webp";
import MAGICIAN_OVERALL from "../../../assets/equipment/absolabs/magician/armor/overall.webp";
import WAND from "../../../assets/equipment/absolabs/magician/weapon/wand.webp";
import STAFF from "../../../assets/equipment/absolabs/magician/weapon/staff.webp";
import SHINING_ROD from "../../../assets/equipment/absolabs/magician/weapon/shining-rod.webp";
import PSY_LIMITER from "../../../assets/equipment/absolabs/magician/weapon/psy-limiter.webp";
import LUCENT_GAUNTLET from "../../../assets/equipment/absolabs/magician/weapon/lucent-gauntlet.webp";
import SCEPTER from "../../../assets/equipment/absolabs/magician/weapon/scepter.webp";
import FAN from "../../../assets/equipment/absolabs/magician/weapon/fan.webp";

import BOWMAN_HAT from "../../../assets/equipment/absolabs/bowman/armor/hat.webp";
import BOWMAN_OVERALL from "../../../assets/equipment/absolabs/bowman/armor/overall.webp";
import BOW from "../../../assets/equipment/absolabs/bowman/weapon/bow.webp";
import CROSSBOW from "../../../assets/equipment/absolabs/bowman/weapon/crossbow.webp";
import DUAL_BOWGUNS from "../../../assets/equipment/absolabs/bowman/weapon/dual-bowguns.webp";
import ANCIENT_BOW from "../../../assets/equipment/absolabs/bowman/weapon/ancient-bow.webp";
import WHISPERSHOT from "../../../assets/equipment/absolabs/bowman/weapon/whispershot.webp";

import THIEF_HAT from "../../../assets/equipment/absolabs/thief/armor/hat.webp";
import THIEF_OVERALL from "../../../assets/equipment/absolabs/thief/armor/overall.webp";
import DAGGER from "../../../assets/equipment/absolabs/thief/weapon/dagger.webp";
import CLAW from "../../../assets/equipment/absolabs/thief/weapon/claw.webp";
import CANE from "../../../assets/equipment/absolabs/thief/weapon/cane.webp";
import WHIP_BLADE from "../../../assets/equipment/absolabs/thief/weapon/whip-blade.webp";
import CHAIN from "../../../assets/equipment/absolabs/thief/weapon/chain.webp";
import RITUAL_FAN from "../../../assets/equipment/absolabs/thief/weapon/ritual-fan.webp";
import CHAKRAM from "../../../assets/equipment/absolabs/thief/weapon/chakram.webp";

import PIRATE_HAT from "../../../assets/equipment/absolabs/pirate/armor/hat.webp";
import PIRATE_OVERALL from "../../../assets/equipment/absolabs/pirate/armor/overall.webp";
import GUN from "../../../assets/equipment/absolabs/pirate/weapon/gun.webp";
import HAND_CANNON from "../../../assets/equipment/absolabs/pirate/weapon/hand-cannon.webp";
import KNUCKLE from "../../../assets/equipment/absolabs/pirate/weapon/knuckle.webp";
import SOUL_SHOOTER from "../../../assets/equipment/absolabs/pirate/weapon/soul-shooter.webp";
import WAR_FIST from "../../../assets/equipment/absolabs/pirate/weapon/war-fist.webp";

export const ABSOLABS: Record<string, Partial<ItemEquipmentDetail>[]> = {
  WARRIOR: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "앱솔랩스 나이트헬름",
      item_icon: WARRIOR_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "45",
        dex: "45",
        attack_power: "3",
        armor: "400",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "앱솔랩스 나이트슈트",
      item_icon: WARRIOR_OVERALL,
      scroll_upgradeable_count: "12",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "65",
        dex: "65",
        attack_power: "5",
        armor: "300",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "앱솔랩스 나이트슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "20",
        dex: "20",
        attack_power: "5",
        armor: "150",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "앱솔랩스 나이트글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "20",
        dex: "20",
        attack_power: "5",
        armor: "150",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "앱솔랩스 나이트케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "15",
        dex: "15",
        int: "15",
        luk: "15",
        attack_power: "2",
        magic_power: "2",
        armor: "250",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "앱솔랩스 나이트숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "14",
        dex: "14",
        int: "14",
        luk: "14",
        attack_power: "10",
        magic_power: "10",
        armor: "100",
      },
    },
    {
      item_equipment_part: "한손검",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 세이버",
      item_icon: ONE_HANDED_SWORD,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "197",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "한손도끼",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 엑스",
      item_icon: ONE_HANDED_AXE,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "197",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "한손둔기",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 비트해머",
      item_icon: ONE_HANDED_BLUNT,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "197",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "두손검",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 브로드세이버",
      item_icon: TWO_HANDED_SWORD,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "205",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "두손도끼",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 브로드엑스",
      item_icon: TWO_HANDED_AXE,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "205",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "두손둔기",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 브로드해머",
      item_icon: TWO_HANDED_BLUNT,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "205",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "창",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 피어싱스피어",
      item_icon: SPEAR,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "205",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "폴암",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 핼버드",
      item_icon: POLEARM,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "184",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "데스페라도",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 데스페라도",
      item_icon: DESPERADO,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        max_hp: "2250",
        attack_power: "205",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "건틀렛 리볼버",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 파일 갓",
      item_icon: ARM_CANNON,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "154",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "태도",
      item_equipment_slot: "무기",
      item_name: "라즐리 8형",
      item_icon: LONG_SWORD,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "203",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "대검",
      item_equipment_slot: "무기",
      item_name: "라피스 8형",
      item_icon: HEAVY_SWORD,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "207",
        armor: "160",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "튜너",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 튜너",
      item_icon: BLADECASTER,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "205",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "카타나",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 카타나",
      item_icon: KATANA,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "197",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
  ],
  MAGICIAN: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "앱솔랩스 메이지헬름",
      item_icon: MAGICIAN_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "45",
        luk: "45",
        magic_power: "3",
        armor: "400",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "앱솔랩스 메이지슈트",
      item_icon: MAGICIAN_OVERALL,
      scroll_upgradeable_count: "12",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "65",
        luk: "65",
        magic_power: "5",
        armor: "300",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "앱솔랩스 메이지슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "20",
        luk: "20",
        magic_power: "5",
        armor: "150",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "앱솔랩스 메이지글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "20",
        luk: "20",
        magic_power: "5",
        armor: "150",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "앱솔랩스 메이지케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "15",
        dex: "15",
        int: "15",
        luk: "15",
        attack_power: "2",
        magic_power: "2",
        armor: "250",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "앱솔랩스 메이지숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "14",
        dex: "14",
        int: "14",
        luk: "14",
        attack_power: "10",
        magic_power: "10",
        armor: "100",
      },
    },
    {
      item_equipment_part: "완드",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 스펠링완드",
      item_icon: WAND,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "60",
        luk: "60",
        attack_power: "143",
        magic_power: "241",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "스태프",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 스펠링스태프",
      item_icon: STAFF,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "60",
        luk: "60",
        attack_power: "151",
        magic_power: "245",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "샤이닝 로드",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 샤이닝로드",
      item_icon: SHINING_ROD,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "60",
        luk: "60",
        attack_power: "143",
        magic_power: "241",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "ESP 리미터",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 ESP리미터",
      item_icon: PSY_LIMITER,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "60",
        luk: "60",
        attack_power: "143",
        magic_power: "241",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "매직 건틀렛",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 매직 건틀렛",
      item_icon: LUCENT_GAUNTLET,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "60",
        luk: "60",
        attack_power: "143",
        magic_power: "241",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "기억의 지팡이",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 스틱",
      item_icon: SCEPTER,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "60",
        luk: "60",
        attack_power: "143",
        magic_power: "241",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "부채",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 부채",
      item_icon: FAN,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        int: "60",
        luk: "60",
        attack_power: "143",
        magic_power: "241",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
  ],
  BOWMAN: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "앱솔랩스 아처헬름",
      item_icon: BOWMAN_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "45",
        dex: "45",
        attack_power: "3",
        armor: "400",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "앱솔랩스 아처슈트",
      item_icon: BOWMAN_OVERALL,
      scroll_upgradeable_count: "12",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "65",
        dex: "65",
        attack_power: "5",
        armor: "300",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "앱솔랩스 아처슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "20",
        dex: "20",
        attack_power: "5",
        armor: "150",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "앱솔랩스 아처글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "20",
        dex: "20",
        attack_power: "5",
        armor: "150",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "앱솔랩스 아처케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "15",
        dex: "15",
        int: "15",
        luk: "15",
        attack_power: "2",
        magic_power: "2",
        armor: "250",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "앱솔랩스 아처숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "14",
        dex: "14",
        int: "14",
        luk: "14",
        attack_power: "10",
        magic_power: "10",
        armor: "100",
      },
    },
    {
      item_equipment_part: "활",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 슈팅보우",
      item_icon: BOW,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "석궁",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 크로스보우",
      item_icon: CROSSBOW,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "197",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "듀얼 보우건",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 듀얼보우건",
      item_icon: DUAL_BOWGUNS,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "에인션트 보우",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 에인션트 보우",
      item_icon: ANCIENT_BOW,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "브레스 슈터",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 브레스 슈터",
      item_icon: WHISPERSHOT,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
  ],
  THIEF: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "앱솔랩스 시프캡",
      item_icon: THIEF_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "45",
        luk: "45",
        attack_power: "3",
        armor: "400",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "앱솔랩스 시프슈트",
      item_icon: THIEF_OVERALL,
      scroll_upgradeable_count: "12",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "65",
        luk: "65",
        attack_power: "5",
        armor: "300",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "앱솔랩스 시프슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "20",
        luk: "20",
        attack_power: "5",
        armor: "150",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "앱솔랩스 시프글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "20",
        luk: "20",
        attack_power: "5",
        armor: "150",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "앱솔랩스 시프케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "15",
        dex: "15",
        int: "15",
        luk: "15",
        attack_power: "2",
        magic_power: "2",
        armor: "250",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "앱솔랩스 시프숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "14",
        dex: "14",
        int: "14",
        luk: "14",
        attack_power: "10",
        magic_power: "10",
        armor: "100",
      },
    },
    {
      item_equipment_part: "단검",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 슬래셔",
      item_icon: DAGGER,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "60",
        luk: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "아대",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 리벤지가즈",
      item_icon: CLAW,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "60",
        luk: "60",
        attack_power: "103",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "케인",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 핀쳐케인",
      item_icon: CANE,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "60",
        luk: "60",
        attack_power: "197",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "에너지소드",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 에너지소드",
      item_icon: WHIP_BLADE,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "60",
        luk: "60",
        attack_power: "154",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "체인",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 체인",
      item_icon: CHAIN,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "60",
        luk: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "부채",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 괴선",
      item_icon: RITUAL_FAN,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "60",
        luk: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "차크람",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 차크람",
      item_icon: CHAKRAM,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        dex: "60",
        luk: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
  ],
  PIRATE: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "앱솔랩스 파이렛페도라",
      item_icon: PIRATE_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "45",
        dex: "45",
        attack_power: "3",
        armor: "400",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "앱솔랩스 파이렛슈트",
      item_icon: PIRATE_OVERALL,
      scroll_upgradeable_count: "12",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "65",
        dex: "65",
        attack_power: "5",
        armor: "300",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "앱솔랩스 파이렛슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "20",
        dex: "20",
        attack_power: "5",
        armor: "150",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "앱솔랩스 파이렛글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "20",
        dex: "20",
        attack_power: "5",
        armor: "150",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "앱솔랩스 파이렛케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "15",
        dex: "15",
        int: "15",
        luk: "15",
        attack_power: "2",
        magic_power: "2",
        armor: "250",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "앱솔랩스 파이렛숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "14",
        dex: "14",
        int: "14",
        luk: "14",
        attack_power: "10",
        magic_power: "10",
        armor: "100",
      },
    },
    {
      item_equipment_part: "건",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 포인팅건",
      item_icon: GUN,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "150",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "너클",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 블로우너클",
      item_icon: KNUCKLE,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "154",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "핸드캐논",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 블래스트캐논",
      item_icon: HAND_CANNON,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "210",
        armor: "160",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "소울 슈터",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 소울슈터",
      item_icon: SOUL_SHOOTER,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "154",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "에너지소드",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 에너지소드",
      item_icon: WHIP_BLADE,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 160,
        str: "60",
        dex: "60",
        attack_power: "154",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "무권",
      item_equipment_slot: "무기",
      item_name: "앱솔랩스 무권",
      item_icon: WAR_FIST,
      scroll_upgradeable_count: "8",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 150,
        str: "60",
        dex: "60",
        attack_power: "154",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
  ],
};
