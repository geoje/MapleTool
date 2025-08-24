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
import theFirstAdversary from "../assets/boss/the-first-adversary.png";
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
  THE_FIRST_ADVERSARY = "THE_FIRST_ADVERSARY",
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
    prices: { CHAOS: 8_080_000 },
  },
  MAGNUS: {
    name: "매그너스",
    abbreviate: "매그",
    icon: magnus,
    prices: { HARD: 8_560_000 },
  },
  HILLA: {
    name: "힐라",
    abbreviate: "힐라",
    icon: hilla,
    prices: { HARD: 5_750_000 },
  },
  PAPULATUS: {
    name: "파풀라투스",
    abbreviate: "파풀",
    icon: papulatus,
    prices: { CHAOS: 17_300_000 },
  },
  PIERRE: {
    name: "피에르",
    abbreviate: "피에르",
    icon: pierre,
    prices: { CHAOS: 8_170_000 },
  },
  VON_BON: {
    name: "반반",
    abbreviate: "반반",
    icon: vonBon,
    prices: { CHAOS: 8_150_000 },
  },
  CRIMSON_QUEEN: {
    name: "블러디퀸",
    abbreviate: "블퀸",
    icon: crimsonQueen,
    prices: { CHAOS: 8_140_000 },
  },
  VELLUM: {
    name: "벨룸",
    abbreviate: "벨룸",
    icon: vellum,
    prices: { CHAOS: 9_280_000 },
  },
  PINK_BEAN: {
    name: "핑크빈",
    abbreviate: "핑크빈",
    icon: pinkBean,
    prices: { CHAOS: 6_580_000 },
  },
  CYGNUS: {
    name: "시그너스",
    abbreviate: "시그",
    icon: cygnus,
    prices: { EASY: 4_550_000, NORMAL: 7_500_000 },
  },
  LOTUS: {
    name: "스우",
    abbreviate: "스우",
    icon: lotus,
    prices: { NORMAL: 22_000_000, HARD: 77_400_000, EXTREME: 549_000_000 },
  },
  DAMIEN: {
    name: "데미안",
    abbreviate: "데미안",
    icon: damien,
    prices: { NORMAL: 23_000_000, HARD: 73_500_000 },
  },
  GUARDIAN_ANGEL_SLIME: {
    name: "가디언 엔젤 슬라임",
    abbreviate: "가엔슬",
    icon: guardianAngelSlime,
    prices: { NORMAL: 33_500_000, CHAOS: 113_000_000 },
  },
  LUCID: {
    name: "루시드",
    abbreviate: "루시드",
    icon: lucid,
    prices: { EASY: 39_200_000, NORMAL: 46_900_000, HARD: 94_500_000 },
  },
  WILL: {
    name: "윌",
    abbreviate: "윌",
    icon: will,
    prices: { EASY: 42_500_000, NORMAL: 54_100_000, HARD: 116_000_000 },
  },
  GLOOM: {
    name: "더스크",
    abbreviate: "더스크",
    icon: gloom,
    prices: { NORMAL: 57_900_000, CHAOS: 105_000_000 },
  },
  VERUS_HILLA: {
    name: "진 힐라",
    abbreviate: "진힐라",
    icon: verusHilla,
    prices: { NORMAL: 107_000_000, HARD: 160_000_000 },
  },
  DARKNELL: {
    name: "듄켈",
    abbreviate: "듄켈",
    icon: darknell,
    prices: { NORMAL: 62_500_000, HARD: 142_000_000 },
  },
  CHOSEN_SEREN: {
    name: "선택받은 세렌",
    abbreviate: "세렌",
    icon: chosenSeren,
    prices: {
      NORMAL: 295_000_000,
      HARD: 440_000_000,
      EXTREME: 2_420_000_000,
    },
  },
  KALOS_THE_GUARDIAN: {
    name: "감시자 칼로스",
    abbreviate: "칼로스",
    icon: kalosTheGuardian,
    prices: {
      EASY: 345_000_000,
      NORMAL: 510_000_000,
      CHAOS: 1_120_000_000,
      EXTREME: 2_700_000_000,
    },
  },
  THE_FIRST_ADVERSARY: {
    name: "최초의 대적자",
    abbreviate: "대적자",
    icon: theFirstAdversary,
    prices: {
      EASY: 361_000_000,
      NORMAL: 530_000_000,
      HARD: 1_260_000_000,
      EXTREME: 2_920_000_000,
    },
  },
  KALING: {
    name: "카링",
    abbreviate: "카링",
    icon: kaling,
    prices: {
      EASY: 381_000_000,
      NORMAL: 595_000_000,
      HARD: 1_310_000_000,
      EXTREME: 3_150_000_000,
    },
  },
  LIMBO: {
    name: "림보",
    abbreviate: "림보",
    icon: limbo,
    prices: { NORMAL: 900_000_000, HARD: 1_930_000_000 },
  },
  BALDRIX: {
    name: "발드릭스",
    abbreviate: "발드",
    icon: baldrix,
    prices: { NORMAL: 1_200_000_000, HARD: 2_160_000_000 },
  },
};
