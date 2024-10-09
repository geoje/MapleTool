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
}
export enum BOSS_DIFFICULTY {
  EASY = "EASY",
  NORMAL = "NORMAL",
  HARD = "HARD",
  CHAOS = "CHAOS",
  EXTREME = "EXTREME",
}
export const BOSS_MAXIMUN_SELECTABLE = 12;

interface ColorSet {
  text: string;
  back: string;
  border: string;
}
export const COLOR: Partial<Record<BOSS_DIFFICULTY, ColorSet>> = {
  [BOSS_DIFFICULTY.EASY]: {
    text: "#ffffff",
    back: "#999999",
    border: "#999999",
  },
  [BOSS_DIFFICULTY.NORMAL]: {
    text: "#ffffff",
    back: "#33aabb",
    border: "#33aabb",
  },
  [BOSS_DIFFICULTY.HARD]: {
    text: "#ffffff",
    back: "#dd4489",
    border: "#dd4489",
  },
  [BOSS_DIFFICULTY.CHAOS]: {
    text: "#ffddbb",
    back: "#444444",
    border: "#ddbb88",
  },
  [BOSS_DIFFICULTY.EXTREME]: {
    text: "#ee4455",
    back: "#444444",
    border: "#ee3355",
  },
};

interface Boss {
  name: string;
  icon: string;
  prices: Partial<Record<BOSS_DIFFICULTY, number>>;
}
export const BOSS: Record<BOSS_TYPE, Boss> = {
  [BOSS_TYPE.ZZAKUM]: {
    name: "자쿰",
    icon: zzakum,
    prices: {
      [BOSS_DIFFICULTY.CHAOS]: 8_980_000,
    },
  },
  [BOSS_TYPE.MAGNUS]: {
    name: "매그너스",
    icon: magnus,
    prices: {
      [BOSS_DIFFICULTY.HARD]: 10_700_000,
    },
  },
  [BOSS_TYPE.HILLA]: {
    name: "힐라",
    icon: hilla,
    prices: {
      [BOSS_DIFFICULTY.HARD]: 6_390_000,
    },
  },
  [BOSS_TYPE.PAPULATUS]: {
    name: "파풀라투스",
    icon: papulatus,
    prices: {
      [BOSS_DIFFICULTY.CHAOS]: 24_700_000,
    },
  },
  [BOSS_TYPE.PIERRE]: {
    name: "피에르",
    icon: pierre,
    prices: {
      [BOSS_DIFFICULTY.CHAOS]: 9_080_000,
    },
  },
  [BOSS_TYPE.VON_BON]: {
    name: "반반",
    icon: vonBon,
    prices: {
      [BOSS_DIFFICULTY.CHAOS]: 9_060_000,
    },
  },
  [BOSS_TYPE.CRIMSON_QUEEN]: {
    name: "블러디퀸",
    icon: crimsonQueen,
    prices: {
      [BOSS_DIFFICULTY.CHAOS]: 9_040_000,
    },
  },
  [BOSS_TYPE.VELLUM]: {
    name: "벨룸",
    icon: vellum,
    prices: {
      [BOSS_DIFFICULTY.CHAOS]: 11_600_000,
    },
  },
  [BOSS_TYPE.PINK_BEAN]: {
    name: "핑크빈",
    icon: pinkBean,
    prices: {
      [BOSS_DIFFICULTY.CHAOS]: 7_310_000,
    },
  },
  [BOSS_TYPE.CYGNUS]: {
    name: "시그너스",
    icon: cygnus,
    prices: {
      [BOSS_DIFFICULTY.EASY]: 5_060_000,
      [BOSS_DIFFICULTY.NORMAL]: 8_330_000,
    },
  },
  [BOSS_TYPE.LOTUS]: {
    name: "스우",
    icon: lotus,
    prices: {
      [BOSS_DIFFICULTY.NORMAL]: 31_400_000,
      [BOSS_DIFFICULTY.HARD]: 119_000_000,
      [BOSS_DIFFICULTY.EXTREME]: 392_000_000,
    },
  },
  [BOSS_TYPE.DAMIEN]: {
    name: "데미안",
    icon: damien,
    prices: {
      [BOSS_DIFFICULTY.NORMAL]: 32_900_000,
      [BOSS_DIFFICULTY.HARD]: 113_000_000,
    },
  },
  [BOSS_TYPE.GUARDIAN_ANGEL_SLIME]: {
    name: "가디언 엔젤 슬라임",
    icon: guardianAngelSlime,
    prices: {
      [BOSS_DIFFICULTY.NORMAL]: 47_800_000,
      [BOSS_DIFFICULTY.CHAOS]: 161_000_000,
    },
  },
  [BOSS_TYPE.LUCID]: {
    name: "루시드",
    icon: lucid,
    prices: {
      [BOSS_DIFFICULTY.EASY]: 49_000_000,
      [BOSS_DIFFICULTY.NORMAL]: 58_600_000,
      [BOSS_DIFFICULTY.HARD]: 135_000_000,
    },
  },
  [BOSS_TYPE.WILL]: {
    name: "윌",
    icon: will,
    prices: {
      [BOSS_DIFFICULTY.EASY]: 53_100_000,
      [BOSS_DIFFICULTY.NORMAL]: 67_600_000,
      [BOSS_DIFFICULTY.HARD]: 165_000_000,
    },
  },
  [BOSS_TYPE.GLOOM]: {
    name: "더스크",
    icon: gloom,
    prices: {
      [BOSS_DIFFICULTY.NORMAL]: 72_400_000,
      [BOSS_DIFFICULTY.CHAOS]: 150_000_000,
    },
  },
  [BOSS_TYPE.VERUS_HILLA]: {
    name: "진 힐라",
    icon: verusHilla,
    prices: {
      [BOSS_DIFFICULTY.NORMAL]: 153_000_000,
      [BOSS_DIFFICULTY.HARD]: 200_000_000,
    },
  },
  [BOSS_TYPE.DARKNELL]: {
    name: "듄켈",
    icon: darknell,
    prices: {
      [BOSS_DIFFICULTY.NORMAL]: 78_100_000,
      [BOSS_DIFFICULTY.HARD]: 177_000_000,
    },
  },
  [BOSS_TYPE.CHOSEN_SEREN]: {
    name: "선택받은 세렌",
    icon: chosenSeren,
    prices: {
      [BOSS_DIFFICULTY.NORMAL]: 227_000_000,
      [BOSS_DIFFICULTY.HARD]: 314_000_000,
      [BOSS_DIFFICULTY.EXTREME]: 1_340_000_000,
    },
  },
  [BOSS_TYPE.KALOS_THE_GUARDIAN]: {
    name: "감시자 칼로스",
    icon: kalosTheGuardian,
    prices: {
      [BOSS_DIFFICULTY.EASY]: 265_000_000,
      [BOSS_DIFFICULTY.NORMAL]: 364_000_000,
      [BOSS_DIFFICULTY.CHAOS]: 746_000_000,
      [BOSS_DIFFICULTY.EXTREME]: 1_500_000_000,
    },
  },
  [BOSS_TYPE.KALING]: {
    name: "카링",
    icon: kaling,
    prices: {
      [BOSS_DIFFICULTY.EASY]: 293_000_000,
      [BOSS_DIFFICULTY.NORMAL]: 425_000_000,
      [BOSS_DIFFICULTY.HARD]: 870_000_000,
      [BOSS_DIFFICULTY.EXTREME]: 1_750_000_000,
    },
  },
  [BOSS_TYPE.LIMBO]: {
    name: "림보",
    icon: limbo,
    prices: {
      [BOSS_DIFFICULTY.NORMAL]: 600_000_000,
      [BOSS_DIFFICULTY.HARD]: 1_070_000_000,
    },
  },
};
