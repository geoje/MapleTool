import { ItemEquipmentDetail } from "../../../types/character/itemEquipment";
import { EMPTY_OPTION } from "../equipment";

import WARRIOR_HAT from "../../../assets/equipment/arcaneumbra/warrior/armor/hat.webp";
import WARRIOR_OVERALL from "../../../assets/equipment/arcaneumbra/warrior/armor/overall.webp";
import WARRIOR_SHOES from "../../../assets/equipment/arcaneumbra/warrior/armor/shoes.webp";
import WARRIOR_GLOVES from "../../../assets/equipment/arcaneumbra/warrior/armor/gloves.webp";
import WARRIOR_CAPE from "../../../assets/equipment/arcaneumbra/warrior/armor/cape.webp";
import WARRIOR_SHOULDER from "../../../assets/equipment/arcaneumbra/warrior/armor/shoulder.webp";
import ONE_HANDED_SWORD from "../../../assets/equipment/arcaneumbra/warrior/weapon/one-handed-sword.webp";
import ONE_HANDED_AXE from "../../../assets/equipment/arcaneumbra/warrior/weapon/one-handed-axe.webp";
import ONE_HANDED_BLUNT from "../../../assets/equipment/arcaneumbra/warrior/weapon/one-handed-blunt.webp";
import TWO_HANDED_SWORD from "../../../assets/equipment/arcaneumbra/warrior/weapon/two-handed-sword.webp";
import TWO_HANDED_AXE from "../../../assets/equipment/arcaneumbra/warrior/weapon/two-handed-axe.webp";
import TWO_HANDED_BLUNT from "../../../assets/equipment/arcaneumbra/warrior/weapon/two-handed-blunt.webp";
import SPEAR from "../../../assets/equipment/arcaneumbra/warrior/weapon/spear.webp";
import POLEARM from "../../../assets/equipment/arcaneumbra/warrior/weapon/polearm.webp";
import DESPERADO from "../../../assets/equipment/arcaneumbra/warrior/weapon/desperado.webp";
import KATANA from "../../../assets/equipment/arcaneumbra/warrior/weapon/katana.webp";
import ARM_CANNON from "../../../assets/equipment/arcaneumbra/warrior/weapon/arm-cannon.webp";
import BLADECASTER from "../../../assets/equipment/arcaneumbra/warrior/weapon/bladecaster.webp";
import LONG_SWORD from "../../../assets/equipment/arcaneumbra/warrior/weapon/long-sword.webp";
import HEAVY_SWORD from "../../../assets/equipment/arcaneumbra/warrior/weapon/heavy-sword.webp";

import MAGICIAN_HAT from "../../../assets/equipment/arcaneumbra/magician/armor/hat.webp";
import MAGICIAN_OVERALL from "../../../assets/equipment/arcaneumbra/magician/armor/overall.webp";
import MAGICIAN_SHOES from "../../../assets/equipment/arcaneumbra/magician/armor/shoes.webp";
import MAGICIAN_GLOVES from "../../../assets/equipment/arcaneumbra/magician/armor/gloves.webp";
import MAGICIAN_CAPE from "../../../assets/equipment/arcaneumbra/magician/armor/cape.webp";
import MAGICIAN_SHOULDER from "../../../assets/equipment/arcaneumbra/magician/armor/shoulder.webp";
import WAND from "../../../assets/equipment/arcaneumbra/magician/weapon/wand.webp";
import STAFF from "../../../assets/equipment/arcaneumbra/magician/weapon/staff.webp";
import SHINING_ROD from "../../../assets/equipment/arcaneumbra/magician/weapon/shining-rod.webp";
import PSY_LIMITER from "../../../assets/equipment/arcaneumbra/magician/weapon/psy-limiter.webp";
import LUCENT_GAUNTLET from "../../../assets/equipment/arcaneumbra/magician/weapon/lucent-gauntlet.webp";
import SCEPTER from "../../../assets/equipment/arcaneumbra/magician/weapon/scepter.webp";
import FAN from "../../../assets/equipment/arcaneumbra/magician/weapon/fan.webp";

import BOWMAN_HAT from "../../../assets/equipment/arcaneumbra/bowman/armor/hat.webp";
import BOWMAN_OVERALL from "../../../assets/equipment/arcaneumbra/bowman/armor/overall.webp";
import BOWMAN_SHOES from "../../../assets/equipment/arcaneumbra/bowman/armor/shoes.webp";
import BOWMAN_GLOVES from "../../../assets/equipment/arcaneumbra/bowman/armor/gloves.webp";
import BOWMAN_CAPE from "../../../assets/equipment/arcaneumbra/bowman/armor/cape.webp";
import BOWMAN_SHOULDER from "../../../assets/equipment/arcaneumbra/bowman/armor/shoulder.webp";
import BOW from "../../../assets/equipment/arcaneumbra/bowman/weapon/bow.webp";
import CROSSBOW from "../../../assets/equipment/arcaneumbra/bowman/weapon/crossbow.webp";
import DUAL_BOWGUNS from "../../../assets/equipment/arcaneumbra/bowman/weapon/dual-bowguns.webp";
import ANCIENT_BOW from "../../../assets/equipment/arcaneumbra/bowman/weapon/ancient-bow.webp";
import WHISPERSHOT from "../../../assets/equipment/arcaneumbra/bowman/weapon/whispershot.webp";

import THIEF_HAT from "../../../assets/equipment/arcaneumbra/thief/armor/hat.webp";
import THIEF_OVERALL from "../../../assets/equipment/arcaneumbra/thief/armor/overall.webp";
import THIEF_SHOES from "../../../assets/equipment/arcaneumbra/thief/armor/shoes.webp";
import THIEF_GLOVES from "../../../assets/equipment/arcaneumbra/thief/armor/gloves.webp";
import THIEF_CAPE from "../../../assets/equipment/arcaneumbra/thief/armor/cape.webp";
import THIEF_SHOULDER from "../../../assets/equipment/arcaneumbra/thief/armor/shoulder.webp";
import DAGGER from "../../../assets/equipment/arcaneumbra/thief/weapon/dagger.webp";
import CLAW from "../../../assets/equipment/arcaneumbra/thief/weapon/claw.webp";
import CANE from "../../../assets/equipment/arcaneumbra/thief/weapon/cane.webp";
import WHIP_BLADE from "../../../assets/equipment/arcaneumbra/thief/weapon/whip-blade.webp";
import CHAIN from "../../../assets/equipment/arcaneumbra/thief/weapon/chain.webp";
import RITUAL_FAN from "../../../assets/equipment/arcaneumbra/thief/weapon/ritual-fan.webp";
import CHAKRAM from "../../../assets/equipment/arcaneumbra/thief/weapon/chakram.webp";

import PIRATE_HAT from "../../../assets/equipment/arcaneumbra/pirate/armor/hat.webp";
import PIRATE_OVERALL from "../../../assets/equipment/arcaneumbra/pirate/armor/overall.webp";
import PIRATE_SHOES from "../../../assets/equipment/arcaneumbra/pirate/armor/shoes.webp";
import PIRATE_GLOVES from "../../../assets/equipment/arcaneumbra/pirate/armor/gloves.webp";
import PIRATE_CAPE from "../../../assets/equipment/arcaneumbra/pirate/armor/cape.webp";
import PIRATE_SHOULDER from "../../../assets/equipment/arcaneumbra/pirate/armor/shoulder.webp";
import GUN from "../../../assets/equipment/arcaneumbra/pirate/weapon/gun.webp";
import HAND_CANNON from "../../../assets/equipment/arcaneumbra/pirate/weapon/hand-cannon.webp";
import KNUCKLE from "../../../assets/equipment/arcaneumbra/pirate/weapon/knuckle.webp";
import SOUL_SHOOTER from "../../../assets/equipment/arcaneumbra/pirate/weapon/soul-shooter.webp";
import WAR_FIST from "../../../assets/equipment/arcaneumbra/pirate/weapon/war-fist.webp";

export const ARCANEUMBRA: Record<string, Partial<ItemEquipmentDetail>[]> = {
  WARRIOR: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "아케인셰이드 나이트햇",
      item_icon: WARRIOR_HAT,
      scroll_upgradeable_count: "11",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "65",
        dex: "65",
        attack_power: "7",
        armor: "600",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "아케인셰이드 나이트슈트",
      item_icon: WARRIOR_OVERALL,
      scroll_upgradeable_count: "12",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "85",
        dex: "85",
        attack_power: "9",
        armor: "500",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "아케인셰이드 나이트슈즈",
      item_icon: WARRIOR_SHOES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "40",
        dex: "40",
        attack_power: "9",
        armor: "250",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "아케인셰이드 나이트글러브",
      item_icon: WARRIOR_GLOVES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "40",
        dex: "40",
        attack_power: "9",
        armor: "250",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "아케인셰이드 나이트케이프",
      item_icon: WARRIOR_CAPE,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "35",
        dex: "35",
        int: "35",
        luk: "35",
        attack_power: "6",
        magic_power: "6",
        armor: "450",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "아케인셰이드 나이트숄더",
      item_icon: WARRIOR_SHOULDER,
      scroll_upgradeable_count: "1",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "35",
        dex: "35",
        int: "35",
        luk: "35",
        attack_power: "20",
        magic_power: "20",
        armor: "300",
      },
    },
    {
      item_equipment_part: "한손검",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 세이버",
      item_icon: ONE_HANDED_SWORD,
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
    {
      item_equipment_part: "한손도끼",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 엑스",
      item_icon: ONE_HANDED_AXE,
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
    {
      item_equipment_part: "한손둔기",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 해머",
      item_icon: ONE_HANDED_BLUNT,
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
    {
      item_equipment_part: "두손검",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 투핸드소드",
      item_icon: TWO_HANDED_SWORD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "295",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "두손도끼",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 투핸드엑스",
      item_icon: TWO_HANDED_AXE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "295",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "두손둔기",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 투핸드해머",
      item_icon: TWO_HANDED_BLUNT,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "295",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "창",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 스피어",
      item_icon: SPEAR,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "295",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "폴암",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 폴암",
      item_icon: POLEARM,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "264",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "데스페라도",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 데스페라도",
      item_icon: DESPERADO,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        max_hp: "2500",
        attack_power: "295",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "건틀렛 리볼버",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 엘라하",
      item_icon: ARM_CANNON,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "221",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "태도",
      item_equipment_slot: "무기",
      item_name: "태도",
      item_icon: LONG_SWORD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "293",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "대검",
      item_equipment_slot: "무기",
      item_name: "대검",
      item_icon: HEAVY_SWORD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "297",
        armor: "200",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "튜너",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 튜너",
      item_icon: BLADECASTER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "100",
        attack_power: "295",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "카타나",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 카타나",
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
      item_name: "아케인셰이드 매이지햇",
      item_icon: MAGICIAN_HAT,
      scroll_upgradeable_count: "11",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "65",
        luk: "65",
        magic_power: "7",
        armor: "600",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "아케인셰이드 메이지슈트",
      item_icon: MAGICIAN_OVERALL,
      scroll_upgradeable_count: "12",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "85",
        luk: "85",
        magic_power: "9",
        armor: "500",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "아케인셰이드 메이지슈즈",
      item_icon: MAGICIAN_SHOES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "40",
        luk: "40",
        magic_power: "9",
        armor: "250",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "아케인셰이드 메이지글러브",
      item_icon: MAGICIAN_GLOVES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "40",
        luk: "40",
        magic_power: "9",
        armor: "250",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "아케인셰이드 메이지케이프",
      item_icon: MAGICIAN_CAPE,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "35",
        luk: "35",
        str: "35",
        dex: "35",
        magic_power: "6",
        armor: "450",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "아케인셰이드 메이지숄더",
      item_icon: MAGICIAN_SHOULDER,
      scroll_upgradeable_count: "1",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "35",
        luk: "35",
        str: "35",
        dex: "35",
        attack_power: "20",
        magic_power: "20",
        armor: "300",
      },
    },
    {
      item_equipment_part: "완드",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 완드",
      item_icon: WAND,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "100",
        attack_power: "206",
        magic_power: "347",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "스태프",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 스태프",
      item_icon: STAFF,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "100",
        attack_power: "218",
        magic_power: "353",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "샤이닝 로드",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 샤이닝로드",
      item_icon: SHINING_ROD,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "100",
        attack_power: "206",
        magic_power: "347",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "ESP 리미터",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 ESP 리미터",
      item_icon: PSY_LIMITER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "100",
        attack_power: "206",
        magic_power: "347",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "매직 건틀렛",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 매직 건틀렛",
      item_icon: LUCENT_GAUNTLET,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "100",
        attack_power: "206",
        magic_power: "347",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "기억의 지팡이",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 스틱",
      item_icon: SCEPTER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "100",
        attack_power: "206",
        magic_power: "347",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "부채",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 부채",
      item_icon: FAN,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        int: "600",
        luk: "100",
        attack_power: "206",
        magic_power: "347",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
  ],
  BOWMAN: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "아케인셰이드 아처햇",
      item_icon: BOWMAN_HAT,
      scroll_upgradeable_count: "11",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "65",
        str: "65",
        attack_power: "7",
        armor: "600",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "아케인셰이드 아처슈트",
      item_icon: BOWMAN_OVERALL,
      scroll_upgradeable_count: "12",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "85",
        str: "85",
        attack_power: "9",
        armor: "500",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "아케인셰이드 아처슈즈",
      item_icon: BOWMAN_SHOES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "40",
        str: "40",
        attack_power: "9",
        armor: "250",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "아케인셰이드 아처글러브",
      item_icon: BOWMAN_GLOVES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "40",
        str: "40",
        attack_power: "9",
        armor: "250",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "아케인셰이드 아처케이프",
      item_icon: BOWMAN_CAPE,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "35",
        dex: "35",
        int: "35",
        luk: "35",
        attack_power: "6",
        magic_power: "6",
        armor: "450",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "아케인셰이드 아처숄더",
      item_icon: BOWMAN_SHOULDER,
      scroll_upgradeable_count: "1",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "35",
        dex: "35",
        int: "35",
        luk: "35",
        attack_power: "20",
        magic_power: "20",
        armor: "300",
      },
    },
    {
      item_equipment_part: "활",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 보우",
      item_icon: BOW,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "65",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "석궁",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 크로스보우",
      item_icon: CROSSBOW,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "85",
        attack_power: "197",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "듀얼보우건",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 듀얼보우건",
      item_icon: DUAL_BOWGUNS,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "65",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "에이션트 보우",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 에인션트 보우",
      item_icon: ANCIENT_BOW,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
        dex: "60",
        attack_power: "192",
        boss_damage: "30%",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "브레스 슈터",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 브레스 슈터",
      item_icon: WHISPERSHOT,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "600",
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
      item_name: "아케인셰이드 시프햇",
      item_icon: THIEF_HAT,
      scroll_upgradeable_count: "11",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        luk: "65",
        dex: "65",
        attack_power: "7",
        armor: "600",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "아케인셰이드 시프슈트",
      item_icon: THIEF_OVERALL,
      scroll_upgradeable_count: "12",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        luk: "85",
        dex: "85",
        attack_power: "9",
        armor: "500",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "아케인셰이드 시프슈즈",
      item_icon: THIEF_SHOES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        luk: "40",
        dex: "40",
        attack_power: "9",
        armor: "250",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "아케인셰이드 시프글러브",
      item_icon: THIEF_GLOVES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        luk: "40",
        dex: "40",
        attack_power: "9",
        armor: "250",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "아케인셰이드 시프케이프",
      item_icon: THIEF_CAPE,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "35",
        dex: "35",
        int: "35",
        luk: "35",
        attack_power: "6",
        magic_power: "6",
        armor: "450",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "아케인셰이드 시프숄더",
      item_icon: THIEF_SHOULDER,
      scroll_upgradeable_count: "1",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "35",
        dex: "35",
        int: "35",
        luk: "35",
        attack_power: "20",
        magic_power: "20",
        armor: "300",
      },
    },
    {
      item_equipment_part: "단검",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 대거",
      item_icon: DAGGER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "100",
        luk: "100",
        attack_power: "276",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "아대",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 가즈",
      item_icon: CLAW,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "100",
        luk: "100",
        attack_power: "149",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "케인",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 케인",
      item_icon: CANE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "100",
        luk: "100",
        attack_power: "283",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "에너지소드",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 에너지체인",
      item_icon: WHIP_BLADE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "100",
        luk: "100",
        attack_power: "221",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "체인",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 체인",
      item_icon: CHAIN,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "100",
        luk: "100",
        attack_power: "276",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "부채",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 초선",
      item_icon: RITUAL_FAN,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "100",
        luk: "100",
        attack_power: "276",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "차크람",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 차크람",
      item_icon: CHAKRAM,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        dex: "100",
        luk: "100",
        attack_power: "276",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
  ],
  PIRATE: [
    {
      item_equipment_part: "모자",
      item_equipment_slot: "모자",
      item_name: "아케인셰이드 파이렛햇",
      item_icon: PIRATE_HAT,
      scroll_upgradeable_count: "11",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "65",
        dex: "65",
        attack_power: "7",
        armor: "600",
        ignore_monster_armor: "15%",
      },
    },
    {
      item_equipment_part: "한벌옷",
      item_equipment_slot: "상의",
      item_name: "아케인셰이드 파이렛슈트",
      item_icon: PIRATE_OVERALL,
      scroll_upgradeable_count: "12",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "85",
        dex: "85",
        attack_power: "9",
        armor: "500",
        ignore_monster_armor: "10%",
      },
    },
    {
      item_equipment_part: "신발",
      item_equipment_slot: "신발",
      item_name: "아케인셰이드 파이렛슈즈",
      item_icon: PIRATE_SHOES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "40",
        dex: "40",
        attack_power: "9",
        armor: "250",
        speed: "10",
        jump: "7",
      },
    },
    {
      item_equipment_part: "장갑",
      item_equipment_slot: "장갑",
      item_name: "아케인셰이드 파이렛글러브",
      item_icon: PIRATE_GLOVES,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "40",
        dex: "40",
        attack_power: "9",
        armor: "250",
      },
    },
    {
      item_equipment_part: "망토",
      item_equipment_slot: "망토",
      item_name: "아케인셰이드 파이렛케이프",
      item_icon: PIRATE_CAPE,
      scroll_upgradeable_count: "7",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "35",
        dex: "35",
        int: "35",
        luk: "35",
        attack_power: "6",
        magic_power: "6",
        armor: "450",
      },
    },
    {
      item_equipment_part: "어깨장식",
      item_equipment_slot: "어깨장식",
      item_name: "아케인셰이드 파이렛숄더",
      item_icon: PIRATE_SHOULDER,
      scroll_upgradeable_count: "1",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "35",
        dex: "35",
        int: "35",
        luk: "35",
        attack_power: "20",
        magic_power: "20",
        armor: "300",
      },
    },
    {
      item_equipment_part: "건",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 피스톨",
      item_icon: GUN,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "100",
        dex: "100",
        attack_power: "216",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "너클",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 클로",
      item_icon: KNUCKLE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "100",
        dex: "100",
        attack_power: "221",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "핸드캐논",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 시즈건",
      item_icon: HAND_CANNON,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "100",
        dex: "100",
        attack_power: "302",
        armor: "200",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "소울 슈터",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 소울슈터",
      item_icon: SOUL_SHOOTER,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "100",
        dex: "100",
        attack_power: "221",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "에너지소드",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 에너지체인",
      item_icon: WHIP_BLADE,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "100",
        dex: "100",
        attack_power: "221",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
    {
      item_equipment_part: "무권",
      item_equipment_slot: "무기",
      item_name: "아케인셰이드 무권",
      item_icon: WAR_FIST,
      scroll_upgradeable_count: "8",
      item_base_option: {
        ...EMPTY_OPTION,
        base_equipment_level: 200,
        str: "100",
        dex: "100",
        attack_power: "221",
        boss_damage: "30%",
        ignore_monster_armor: "20%",
      },
    },
  ],
};
