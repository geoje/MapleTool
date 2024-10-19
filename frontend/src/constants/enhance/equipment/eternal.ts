import { ItemEquipmentDetail } from "../../../types/character/itemEquipment";
import { EMPTY_OPTION } from "../equipment";

import SHOES from "../../../assets/equipment/eternal/common/shoes.png";
import GLOVES from "../../../assets/equipment/eternal/common/gloves.png";
import CAPE from "../../../assets/equipment/eternal/common/cape.png";
import SHOULDER from "../../../assets/equipment/eternal/common/shoulder.webp";

import WARRIOR_HAT from "../../../assets/equipment/eternal/warrior/armor/hat.webp";
import WARRIOR_TOP from "../../../assets/equipment/eternal/warrior/armor/top.webp";
import WARRIOR_BOTTOM from "../../../assets/equipment/eternal/warrior/armor/bottom.webp";
import ONE_HANDED_SWORD from "../../../assets/equipment/eternal/warrior/weapon/one-handed-sword.webp";
import ONE_HANDED_AXE from "../../../assets/equipment/eternal/warrior/weapon/one-handed-axe.webp";
import ONE_HANDED_BLUNT from "../../../assets/equipment/eternal/warrior/weapon/one-handed-blunt.webp";
import TWO_HANDED_SWORD from "../../../assets/equipment/eternal/warrior/weapon/two-handed-sword.webp";
import TWO_HANDED_AXE from "../../../assets/equipment/eternal/warrior/weapon/two-handed-axe.webp";
import TWO_HANDED_BLUNT from "../../../assets/equipment/eternal/warrior/weapon/two-handed-blunt.webp";
import SPEAR from "../../../assets/equipment/eternal/warrior/weapon/spear.webp";
import POLEARM from "../../../assets/equipment/eternal/warrior/weapon/polearm.webp";
import DESPERADO from "../../../assets/equipment/eternal/warrior/weapon/desperado.webp";
import KATANA from "../../../assets/equipment/eternal/warrior/weapon/katana.webp";
import ARM_CANNON from "../../../assets/equipment/eternal/warrior/weapon/arm-cannon.webp";
import BLADECASTER from "../../../assets/equipment/eternal/warrior/weapon/bladecaster.webp";
import LONG_SWORD from "../../../assets/equipment/eternal/warrior/weapon/long-sword.webp";
import HEAVY_SWORD from "../../../assets/equipment/eternal/warrior/weapon/heavy-sword.webp";

import MAGICIAN_HAT from "../../../assets/equipment/eternal/magician/armor/hat.webp";
import MAGICIAN_TOP from "../../../assets/equipment/eternal/magician/armor/top.webp";
import MAGICIAN_BOTTOM from "../../../assets/equipment/eternal/magician/armor/bottom.webp";
import WAND from "../../../assets/equipment/eternal/magician/weapon/wand.webp";
import STAFF from "../../../assets/equipment/eternal/magician/weapon/staff.webp";
import SHINING_ROD from "../../../assets/equipment/eternal/magician/weapon/shining-rod.webp";
import PSY_LIMITER from "../../../assets/equipment/eternal/magician/weapon/psy-limiter.webp";
import LUCENT_GAUNTLET from "../../../assets/equipment/eternal/magician/weapon/lucent-gauntlet.webp";
import SCEPTER from "../../../assets/equipment/eternal/magician/weapon/scepter.webp";
import FAN from "../../../assets/equipment/eternal/magician/weapon/fan.webp";

import BOWMAN_HAT from "../../../assets/equipment/eternal/bowman/armor/hat.webp";
import BOWMAN_TOP from "../../../assets/equipment/eternal/bowman/armor/top.webp";
import BOWMAN_BOTTOM from "../../../assets/equipment/eternal/bowman/armor/bottom.webp";
import BOW from "../../../assets/equipment/eternal/bowman/weapon/bow.webp";
import CROSSBOW from "../../../assets/equipment/eternal/bowman/weapon/crossbow.webp";
import DUAL_BOWGUNS from "../../../assets/equipment/eternal/bowman/weapon/dual-bowguns.webp";
import ANCIENT_BOW from "../../../assets/equipment/eternal/bowman/weapon/ancient-bow.webp";
import WHISPERSHOT from "../../../assets/equipment/eternal/bowman/weapon/whispershot.webp";

import THIEF_HAT from "../../../assets/equipment/eternal/thief/armor/hat.webp";
import THIEF_TOP from "../../../assets/equipment/eternal/thief/armor/top.webp";
import THIEF_BOTTOM from "../../../assets/equipment/eternal/thief/armor/bottom.webp";
import DAGGER from "../../../assets/equipment/eternal/thief/weapon/dagger.webp";
import CLAW from "../../../assets/equipment/eternal/thief/weapon/claw.webp";
import CANE from "../../../assets/equipment/eternal/thief/weapon/cane.webp";
import WHIP_BLADE from "../../../assets/equipment/eternal/thief/weapon/whip-blade.webp";
import CHAIN from "../../../assets/equipment/eternal/thief/weapon/chain.webp";
import RITUAL_FAN from "../../../assets/equipment/eternal/thief/weapon/ritual-fan.webp";
import CHAKRAM from "../../../assets/equipment/eternal/thief/weapon/chakram.webp";

import PIRATE_HAT from "../../../assets/equipment/eternal/pirate/armor/hat.webp";
import PIRATE_TOP from "../../../assets/equipment/eternal/pirate/armor/top.webp";
import PIRATE_BOTTOM from "../../../assets/equipment/eternal/pirate/armor/bottom.webp";
import GUN from "../../../assets/equipment/eternal/pirate/weapon/gun.webp";
import HAND_CANNON from "../../../assets/equipment/eternal/pirate/weapon/hand-cannon.webp";
import KNUCKLE from "../../../assets/equipment/eternal/pirate/weapon/knuckle.webp";
import SOUL_SHOOTER from "../../../assets/equipment/eternal/pirate/weapon/soul-shooter.webp";
import WAR_FIST from "../../../assets/equipment/eternal/pirate/weapon/war-fist.webp";

export const ETERNAL: Record<string, Partial<ItemEquipmentDetail>[]> = {
  WARRIOR: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "에테르넬 나이트헬름",
      item_icon: WARRIOR_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "80",
        dex: "80",
        attack_power: "10",
        armor: "750",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "상의",
      item_equipment_slot: "상의",
      item_name: "에테르넬 나이트아머",
      item_icon: WARRIOR_TOP,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        attack_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "하의",
      item_equipment_slot: "하의",
      item_name: "에테르넬 나이트팬츠",
      item_icon: WARRIOR_BOTTOM,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        attack_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "에테르넬 나이트슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "5",
        dex: "5",
        attack_power: "12",
        armor: "325",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "에테르넬 나이트글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "55",
        dex: "55",
        attack_power: "12",
        armor: "325",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "에테르넬 나이트케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        int: "50",
        luk: "50",
        attack_power: "9",
        magic_power: "9",
        armor: "600",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "에테르넬 나이트숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "51",
        dex: "51",
        int: "51",
        luk: "51",
        attack_power: "28",
        magic_power: "28",
        armor: "450",
      },
    },
    {
      item_equipment_part: "한손검",
      item_equipment_slot: "무기",
      item_name: "제네시스 세이버",
      item_icon: ONE_HANDED_SWORD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "326",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "한손도끼",
      item_equipment_slot: "무기",
      item_name: "제네시스 엑스",
      item_icon: ONE_HANDED_AXE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "326",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "한손둔기",
      item_equipment_slot: "무기",
      item_name: "제네시스 해머",
      item_icon: ONE_HANDED_BLUNT,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "326",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "두손검",
      item_equipment_slot: "무기",
      item_name: "제네시스 투핸드소드",
      item_icon: TWO_HANDED_SWORD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "340",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "두손도끼",
      item_equipment_slot: "무기",
      item_name: "제네시스 투핸드엑스",
      item_icon: TWO_HANDED_AXE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "340",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "두손둔기",
      item_equipment_slot: "무기",
      item_name: "제네시스 투핸드해머",
      item_icon: TWO_HANDED_BLUNT,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "340",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "창",
      item_equipment_slot: "무기",
      item_name: "제네시스 스피어",
      item_icon: SPEAR,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "340",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "폴암",
      item_equipment_slot: "무기",
      item_name: "제네시스 폴암",
      item_icon: POLEARM,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "304",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "데스페라도",
      item_equipment_slot: "무기",
      item_name: "제네시스 데스페라도",
      item_icon: DESPERADO,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        max_hp: "2800",
        attack_power: "340",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "건틀렛 리볼버",
      item_equipment_slot: "무기",
      item_name: "제네시스 엘라하",
      item_icon: ARM_CANNON,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "255",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "태도",
      item_equipment_slot: "무기",
      item_name: "제네시스 라즐리",
      item_icon: LONG_SWORD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "337",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "대검",
      item_equipment_slot: "무기",
      item_name: "제네시스 라피스",
      item_icon: HEAVY_SWORD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "342",
        armor: "250",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "튜너",
      item_equipment_slot: "무기",
      item_name: "제네시스 튜너",
      item_icon: BLADECASTER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "150",
        attack_power: "340",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "카타나",
      item_equipment_slot: "무기",
      item_name: "제네시스 카타나",
      item_icon: KATANA,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "283",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
  ],
  MAGICIAN: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "에테르넬 메이지햇",
      item_icon: MAGICIAN_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        int: "80",
        luk: "80",
        magic_power: "10",
        armor: "750",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "상의",
      item_equipment_slot: "상의",
      item_name: "에테르넬 메이지로브",
      item_icon: MAGICIAN_TOP,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        int: "50",
        luk: "50",
        magic_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "하의",
      item_equipment_slot: "하의",
      item_name: "에테르넬 메이지팬츠",
      item_icon: MAGICIAN_BOTTOM,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        int: "50",
        luk: "50",
        magic_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "에테르넬 메이지슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "5",
        dex: "5",
        magic_power: "12",
        armor: "325",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "에테르넬 메이지글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        int: "55",
        luk: "55",
        magic_power: "12",
        armor: "325",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "에테르넬 메이지케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        int: "50",
        luk: "50",
        attack_power: "9",
        magic_power: "9",
        armor: "600",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "에테르넬 메이지숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "51",
        dex: "51",
        int: "51",
        luk: "51",
        attack_power: "28",
        magic_power: "28",
        armor: "450",
      },
    },
    {
      item_equipment_part: "완드",
      item_equipment_slot: "무기",
      item_name: "제네시스 완드",
      item_icon: WAND,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "150",
        attack_power: "237",
        magic_power: "400",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "스태프",
      item_equipment_slot: "무기",
      item_name: "제네시스 스태프",
      item_icon: STAFF,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "150",
        attack_power: "251",
        magic_power: "406",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "샤이닝 로드",
      item_equipment_slot: "무기",
      item_name: "제네시스 샤이닝로드",
      item_icon: SHINING_ROD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "150",
        attack_power: "237",
        magic_power: "400",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "ESP 리미터",
      item_equipment_slot: "무기",
      item_name: "제네시스 ESP 리미터",
      item_icon: PSY_LIMITER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "150",
        attack_power: "237",
        magic_power: "400",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "매직 건틀렛",
      item_equipment_slot: "무기",
      item_name: "제네시스 매직 건틀렛",
      item_icon: LUCENT_GAUNTLET,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "150",
        attack_power: "237",
        magic_power: "400",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "기억의 지팡이",
      item_equipment_slot: "무기",
      item_name: "제네시스 스틱",
      item_icon: SCEPTER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "150",
        attack_power: "237",
        magic_power: "400",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "부채",
      item_equipment_slot: "무기",
      item_name: "제네시스 부채",
      item_icon: FAN,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "150",
        attack_power: "237",
        magic_power: "400",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
  ],
  BOWMAN: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "에테르넬 아처햇",
      item_icon: BOWMAN_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "80",
        dex: "80",
        attack_power: "10",
        armor: "750",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "상의",
      item_equipment_slot: "상의",
      item_name: "에테르넬 아처후드",
      item_icon: BOWMAN_TOP,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        attack_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "하의",
      item_equipment_slot: "하의",
      item_name: "에테르넬 아처팬츠",
      item_icon: BOWMAN_BOTTOM,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        attack_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "에테르넬 아처슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "5",
        dex: "5",
        attack_power: "12",
        armor: "325",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "에테르넬 아처글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "55",
        dex: "55",
        attack_power: "12",
        armor: "325",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "에테르넬 아처케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        int: "50",
        luk: "50",
        attack_power: "9",
        magic_power: "9",
        armor: "600",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "에테르넬 아처숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "51",
        dex: "51",
        int: "51",
        luk: "51",
        attack_power: "28",
        magic_power: "28",
        armor: "450",
      },
    },
    {
      item_equipment_part: "활",
      item_equipment_slot: "무기",
      item_name: "제네시스 보우",
      item_icon: BOW,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "318",
        speed: "+19",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "석궁",
      item_equipment_slot: "무기",
      item_name: "제네시스 크로스보우",
      item_icon: CROSSBOW,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "326",
        speed: "+19",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "듀얼보우건",
      item_equipment_slot: "무기",
      item_name: "제네시스 듀얼보우건",
      item_icon: DUAL_BOWGUNS,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "318",
        speed: "+19",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "에인션트 보우",
      item_equipment_slot: "무기",
      item_name: "제네시스 에인션트 보우",
      item_icon: ANCIENT_BOW,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "318",
        speed: "+19",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "브레스 슈터",
      item_equipment_slot: "무기",
      item_name: "제네시스 브레스 슈터",
      item_icon: WHISPERSHOT,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "318",
        speed: "+19",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
  ],
  THIEF: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "에테르넬 시프반다나",
      item_icon: THIEF_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        dex: "80",
        luk: "80",
        attack_power: "10",
        armor: "750",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "상의",
      item_equipment_slot: "상의",
      item_name: "에테르넬 시프셔츠",
      item_icon: THIEF_TOP,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        dex: "50",
        luk: "50",
        attack_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "하의",
      item_equipment_slot: "하의",
      item_name: "에테르넬 시프팬츠",
      item_icon: THIEF_BOTTOM,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        dex: "50",
        luk: "50",
        attack_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "에테르넬 시프슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        dex: "5",
        luk: "5",
        attack_power: "12",
        armor: "325",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "에테르넬 시프글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        dex: "55",
        luk: "55",
        attack_power: "12",
        armor: "325",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "에테르넬 시프케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        int: "50",
        luk: "50",
        attack_power: "9",
        magic_power: "9",
        armor: "600",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "에테르넬 시프숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "51",
        dex: "51",
        int: "51",
        luk: "51",
        attack_power: "28",
        magic_power: "28",
        armor: "450",
      },
    },
    {
      item_equipment_part: "단검",
      item_equipment_slot: "무기",
      item_name: "제네시스 대거",
      item_icon: DAGGER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "150",
        luk: "150",
        attack_power: "318",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "아대",
      item_equipment_slot: "무기",
      item_name: "제네시스 가즈",
      item_icon: CLAW,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "150",
        luk: "150",
        attack_power: "172",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "케인",
      item_equipment_slot: "무기",
      item_name: "제네시스 케인",
      item_icon: CANE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "150",
        luk: "150",
        attack_power: "326",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "에너지소드",
      item_equipment_slot: "무기",
      item_name: "제네시스 에너지체인",
      item_icon: WHIP_BLADE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "150",
        luk: "150",
        attack_power: "255",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "체인",
      item_equipment_slot: "무기",
      item_name: "제네시스 체인",
      item_icon: CHAIN,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "150",
        luk: "150",
        attack_power: "318",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "부채",
      item_equipment_slot: "무기",
      item_name: "제네시스 창세선",
      item_icon: RITUAL_FAN,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "150",
        luk: "150",
        attack_power: "318",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "차크람",
      item_equipment_slot: "무기",
      item_name: "제네시스 이클립스",
      item_icon: CHAKRAM,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "150",
        luk: "150",
        attack_power: "318",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
  ],
  PIRATE: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "에테르넬 파이렛햇",
      item_icon: PIRATE_HAT,
      scroll_upgradeable_count: "11",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "80",
        dex: "80",
        attack_power: "10",
        armor: "750",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "상의",
      item_equipment_slot: "상의",
      item_name: "에테르넬 파이렛코트",
      item_icon: PIRATE_TOP,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        attack_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "하의",
      item_equipment_slot: "하의",
      item_name: "에테르넬 파이렛팬츠",
      item_icon: PIRATE_BOTTOM,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        attack_power: "6",
        armor: "325",
        ignore_monster_armor: "5%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "에테르넬 파이렛슈즈",
      item_icon: SHOES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "5",
        dex: "5",
        attack_power: "12",
        armor: "325",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "에테르넬 파이렛글러브",
      item_icon: GLOVES,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "55",
        dex: "55",
        attack_power: "12",
        armor: "325",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "에테르넬 파이렛케이프",
      item_icon: CAPE,
      scroll_upgradeable_count: "7",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "50",
        dex: "50",
        int: "50",
        luk: "50",
        attack_power: "9",
        magic_power: "9",
        armor: "600",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "에테르넬 파이렛숄더",
      item_icon: SHOULDER,
      scroll_upgradeable_count: "1",
      cuttable_count: "10",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 250,
        str: "51",
        dex: "51",
        int: "51",
        luk: "51",
        attack_power: "28",
        magic_power: "28",
        armor: "450",
      },
    },
    {
      item_equipment_part: "건",
      item_equipment_slot: "무기",
      item_name: "제네시스 피스톨",
      item_icon: GUN,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "249",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "너클",
      item_equipment_slot: "무기",
      item_name: "제네시스 클로",
      item_icon: KNUCKLE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "255",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "핸드캐논",
      item_equipment_slot: "무기",
      item_name: "제네시스 시즈건",
      item_icon: HAND_CANNON,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "348",
        armor: "250",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "소울 슈터",
      item_equipment_slot: "무기",
      item_name: "제네시스 소울슈터",
      item_icon: SOUL_SHOOTER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "255",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "에너지소드",
      item_equipment_slot: "무기",
      item_name: "제네시스 에너지체인",
      item_icon: WHIP_BLADE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "255",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "무권",
      item_equipment_slot: "무기",
      item_name: "제네시스 무권",
      item_icon: WAR_FIST,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "150",
        dex: "150",
        attack_power: "255",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
  ],
};
