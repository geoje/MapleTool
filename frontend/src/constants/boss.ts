import zzakum from "../assets/boss/zakum.png";
import magnus from "../assets/boss/magnus.png";
import hilla from "../assets/boss/hilla.png";
import papulatus from "../assets/boss/papulatus.png";
import pierre from "../assets/boss/pierre.png";
import vonBon from "../assets/boss/von-bon.png";
import crimsonQueen from "../assets/boss/crimson-queen.png";
import vellum from "../assets/boss/vellum.png";
import pinkBean from "../assets/boss/pink-bean.png";
import cygnus from "../assets/boss/cygnus.png";
import lotus from "../assets/boss/lotus.png";
import damien from "../assets/boss/damien.png";
import guardianAngelSlime from "../assets/boss/guardian-angel-slime.png";
import lucid from "../assets/boss/lucid.png";
import will from "../assets/boss/will.png";
import gloom from "../assets/boss/gloom.png";
import verusHilla from "../assets/boss/verus-hilla.png";
import darknell from "../assets/boss/darknell.png";
import chosenSeren from "../assets/boss/chosen-seren.png";
import kalosTheGuardian from "../assets/boss/kalos-the-guardian.png";
import kaling from "../assets/boss/kaling.png";
import limbo from "../assets/boss/limbo.png";
import baldrix from "../assets/boss/baldrix.png";

export enum BOSS_TYPE {
  ZZAKUM = "ZZAKUM",
  MAGNUS = "MAGNUS",
  HILLA = "HILLA",
  PAPULATUS = "PAPULATUS",
  PIERRE = "PIERRE",
  VON_BON = "VON_BON",
  CRIMSON_QUEEN = "CRIMSON_QUEEN",
  VELLUM = "VELLUM",
  PINK_BEAN = "PINK_BEAN",
  CYGNUS = "CYGNUS",
  LOTUS = "LOTUS",
  DAMIEN = "DAMIEN",
  GUARDIAN_ANGEL_SLIME = "GUARDIAN_ANGEL_SLIME",
  LUCID = "LUCID",
  WILL = "WILL",
  GLOOM = "GLOOM",
  VERUS_HILLA = "VERUS_HILLA",
  DARKNELL = "DARKNELL",
  CHOSEN_SEREN = "CHOSEN_SEREN",
  KALOS_THE_GUARDIAN = "KALOS_THE_GUARDIAN",
  KALING = "KALING",
  LIMBO = "LIMBO",
  BALDRIX = "BALDRIX",
}
export enum BOSS_DIFFICULTY {
  EASY = "EASY",
  NORMAL = "NORMAL",
  HARD = "HARD",
  CHAOS = "CHAOS",
  EXTREME = "EXTREME",
}
export const MAX_BOSS_SELECTABLE = 12;

interface ColorSet {
  text: string;
  back: string;
  border: string;
}
export const COLOR: Partial<Record<BOSS_DIFFICULTY, ColorSet>> = {
  EASY: {
    text: "#ffffff",
    back: "#999999",
    border: "#999999",
  },
  NORMAL: {
    text: "#ffffff",
    back: "#33aabb",
    border: "#33aabb",
  },
  HARD: {
    text: "#ffffff",
    back: "#dd4489",
    border: "#dd4489",
  },
  CHAOS: {
    text: "#ffddbb",
    back: "#444444",
    border: "#ddbb88",
  },
  EXTREME: {
    text: "#ee4455",
    back: "#444444",
    border: "#ee3355",
  },
};

interface Boss {
  name: string;
  abbreviate: string;
  icon: string;
  prices: Partial<Record<BOSS_DIFFICULTY, number>>;
}
export const BOSS: Record<BOSS_TYPE, Boss> = {
  ZZAKUM: {
    name: "자쿰",
    abbreviate: "자쿰",
    icon: zzakum,
    prices: { CHAOS: 8080000 },
  },
  MAGNUS: {
    name: "매그너스",
    abbreviate: "매그",
    icon: magnus,
    prices: { HARD: 8560000 },
  },
  HILLA: {
    name: "힐라",
    abbreviate: "힐라",
    icon: hilla,
    prices: { HARD: 5750000 },
  },
  PAPULATUS: {
    name: "파풀라투스",
    abbreviate: "파풀",
    icon: papulatus,
    prices: { CHAOS: 17300000 },
  },
  PIERRE: {
    name: "피에르",
    abbreviate: "피에르",
    icon: pierre,
    prices: { CHAOS: 8170000 },
  },
  VON_BON: {
    name: "반반",
    abbreviate: "반반",
    icon: vonBon,
    prices: { CHAOS: 8150000 },
  },
  CRIMSON_QUEEN: {
    name: "블러디퀸",
    abbreviate: "블퀸",
    icon: crimsonQueen,
    prices: { CHAOS: 8140000 },
  },
  VELLUM: {
    name: "벨룸",
    abbreviate: "벨룸",
    icon: vellum,
    prices: { CHAOS: 9280000 },
  },
  PINK_BEAN: {
    name: "핑크빈",
    abbreviate: "핑크빈",
    icon: pinkBean,
    prices: { CHAOS: 6580000 },
  },
  CYGNUS: {
    name: "시그너스",
    abbreviate: "시그",
    icon: cygnus,
    prices: { EASY: 4550000, NORMAL: 7500000 },
  },
  LOTUS: {
    name: "스우",
    abbreviate: "스우",
    icon: lotus,
    prices: { NORMAL: 22000000, HARD: 77400000, EXTREME: 549000000 },
  },
  DAMIEN: {
    name: "데미안",
    abbreviate: "데미안",
    icon: damien,
    prices: { NORMAL: 23000000, HARD: 73500000 },
  },
  GUARDIAN_ANGEL_SLIME: {
    name: "가디언 엔젤 슬라임",
    abbreviate: "가엔슬",
    icon: guardianAngelSlime,
    prices: { NORMAL: 33500000, CHAOS: 113000000 },
  },
  LUCID: {
    name: "루시드",
    abbreviate: "루시드",
    icon: lucid,
    prices: { EASY: 39200000, NORMAL: 46900000, HARD: 94500000 },
  },
  WILL: {
    name: "윌",
    abbreviate: "윌",
    icon: will,
    prices: { EASY: 42500000, NORMAL: 54100000, HARD: 116000000 },
  },
  GLOOM: {
    name: "더스크",
    abbreviate: "더스크",
    icon: gloom,
    prices: { NORMAL: 57900000, CHAOS: 105000000 },
  },
  VERUS_HILLA: {
    name: "진 힐라",
    abbreviate: "진힐라",
    icon: verusHilla,
    prices: { NORMAL: 62500000, HARD: 142000000 },
  },
  DARKNELL: {
    name: "듄켈",
    abbreviate: "듄켈",
    icon: darknell,
    prices: { NORMAL: 107000000, HARD: 160000000 },
  },
  CHOSEN_SEREN: {
    name: "선택받은 세렌",
    abbreviate: "세렌",
    icon: chosenSeren,
    prices: {
      NORMAL: 295000000,
      HARD: 440000000,
      EXTREME: 2420000000,
    },
  },
  KALOS_THE_GUARDIAN: {
    name: "감시자 칼로스",
    abbreviate: "칼로스",
    icon: kalosTheGuardian,
    prices: {
      EASY: 345000000,
      NORMAL: 510000000,
      CHAOS: 1120000000,
      EXTREME: 2700000000,
    },
  },
  KALING: {
    name: "카링",
    abbreviate: "카링",
    icon: kaling,
    prices: {
      EASY: 381000000,
      NORMAL: 595000000,
      HARD: 1310000000,
      EXTREME: 3150000000,
    },
  },
  LIMBO: {
    name: "림보",
    abbreviate: "림보",
    icon: limbo,
    prices: { NORMAL: 900000000, HARD: 1930000000 },
  },
  BALDRIX: {
    name: "발드릭스",
    abbreviate: "발드",
    icon: baldrix,
    prices: { NORMAL: 1200000000, HARD: 2160000000 },
  },
};
export const BOSS_PREV_PRICE: Record<
  BOSS_TYPE,
  Partial<Record<BOSS_DIFFICULTY, number>>
> = {
  [BOSS_TYPE.ZZAKUM]: { CHAOS: 8980000 },
  [BOSS_TYPE.MAGNUS]: { HARD: 10700000 },
  [BOSS_TYPE.HILLA]: { HARD: 6390000 },
  [BOSS_TYPE.PAPULATUS]: { CHAOS: 24700000 },
  [BOSS_TYPE.PIERRE]: { CHAOS: 9080000 },
  [BOSS_TYPE.VON_BON]: { CHAOS: 9060000 },
  [BOSS_TYPE.CRIMSON_QUEEN]: { CHAOS: 9040000 },
  [BOSS_TYPE.VELLUM]: { CHAOS: 11600000 },
  [BOSS_TYPE.PINK_BEAN]: { CHAOS: 7310000 },
  [BOSS_TYPE.CYGNUS]: { EASY: 5060000, NORMAL: 8330000 },
  [BOSS_TYPE.LOTUS]: { NORMAL: 31400000, HARD: 119000000, EXTREME: 392000000 },
  [BOSS_TYPE.DAMIEN]: { NORMAL: 32900000, HARD: 113000000 },
  [BOSS_TYPE.GUARDIAN_ANGEL_SLIME]: { NORMAL: 47800000, CHAOS: 161000000 },
  [BOSS_TYPE.LUCID]: { EASY: 49000000, NORMAL: 58600000, HARD: 135000000 },
  [BOSS_TYPE.WILL]: { EASY: 53100000, NORMAL: 67600000, HARD: 165000000 },
  [BOSS_TYPE.GLOOM]: { NORMAL: 72400000, CHAOS: 150000000 },
  [BOSS_TYPE.VERUS_HILLA]: { NORMAL: 153000000, HARD: 200000000 },
  [BOSS_TYPE.DARKNELL]: { NORMAL: 78100000, HARD: 177000000 },
  [BOSS_TYPE.CHOSEN_SEREN]: {
    NORMAL: 227000000,
    HARD: 314000000,
    EXTREME: 1340000000,
  },
  [BOSS_TYPE.KALOS_THE_GUARDIAN]: {
    EASY: 265000000,
    NORMAL: 364000000,
    CHAOS: 746000000,
    EXTREME: 1500000000,
  },
  [BOSS_TYPE.KALING]: {
    EASY: 293000000,
    NORMAL: 425000000,
    HARD: 870000000,
    EXTREME: 1750000000,
  },
  [BOSS_TYPE.LIMBO]: {
    NORMAL: 600000000,
    HARD: 1070000000,
  },
  [BOSS_TYPE.BALDRIX]: {
    NORMAL: 800000000,
    HARD: 1200000000,
  },
};
