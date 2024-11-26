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
    prices: {
      CHAOS: 8_980_000,
    },
  },
  MAGNUS: {
    name: "매그너스",
    abbreviate: "매그",
    icon: magnus,
    prices: {
      HARD: 10_700_000,
    },
  },
  HILLA: {
    name: "힐라",
    abbreviate: "힐라",
    icon: hilla,
    prices: {
      HARD: 6_390_000,
    },
  },
  PAPULATUS: {
    name: "파풀라투스",
    abbreviate: "파풀",
    icon: papulatus,
    prices: {
      CHAOS: 24_700_000,
    },
  },
  PIERRE: {
    name: "피에르",
    abbreviate: "피에르",
    icon: pierre,
    prices: {
      CHAOS: 9_080_000,
    },
  },
  VON_BON: {
    name: "반반",
    abbreviate: "반반",
    icon: vonBon,
    prices: {
      CHAOS: 9_060_000,
    },
  },
  CRIMSON_QUEEN: {
    name: "블러디퀸",
    abbreviate: "블퀸",
    icon: crimsonQueen,
    prices: {
      CHAOS: 9_040_000,
    },
  },
  VELLUM: {
    name: "벨룸",
    abbreviate: "벨룸",
    icon: vellum,
    prices: {
      CHAOS: 11_600_000,
    },
  },
  PINK_BEAN: {
    name: "핑크빈",
    abbreviate: "핑크빈",
    icon: pinkBean,
    prices: {
      CHAOS: 7_310_000,
    },
  },
  CYGNUS: {
    name: "시그너스",
    abbreviate: "시그",
    icon: cygnus,
    prices: {
      EASY: 5_060_000,
      NORMAL: 8_330_000,
    },
  },
  LOTUS: {
    name: "스우",
    abbreviate: "스우",
    icon: lotus,
    prices: {
      NORMAL: 31_400_000,
      HARD: 119_000_000,
      EXTREME: 392_000_000,
    },
  },
  DAMIEN: {
    name: "데미안",
    abbreviate: "데미안",
    icon: damien,
    prices: {
      NORMAL: 32_900_000,
      HARD: 113_000_000,
    },
  },
  GUARDIAN_ANGEL_SLIME: {
    name: "가디언 엔젤 슬라임",
    abbreviate: "가엔슬",
    icon: guardianAngelSlime,
    prices: {
      NORMAL: 47_800_000,
      CHAOS: 161_000_000,
    },
  },
  LUCID: {
    name: "루시드",
    abbreviate: "루시드",
    icon: lucid,
    prices: {
      EASY: 49_000_000,
      NORMAL: 58_600_000,
      HARD: 135_000_000,
    },
  },
  WILL: {
    name: "윌",
    abbreviate: "윌",
    icon: will,
    prices: {
      EASY: 53_100_000,
      NORMAL: 67_600_000,
      HARD: 165_000_000,
    },
  },
  GLOOM: {
    name: "더스크",
    abbreviate: "더스크",
    icon: gloom,
    prices: {
      NORMAL: 72_400_000,
      CHAOS: 150_000_000,
    },
  },
  VERUS_HILLA: {
    name: "진 힐라",
    abbreviate: "진힐라",
    icon: verusHilla,
    prices: {
      NORMAL: 153_000_000,
      HARD: 200_000_000,
    },
  },
  DARKNELL: {
    name: "듄켈",
    abbreviate: "듄켈",
    icon: darknell,
    prices: {
      NORMAL: 78_100_000,
      HARD: 177_000_000,
    },
  },
  CHOSEN_SEREN: {
    name: "선택받은 세렌",
    abbreviate: "세렌",
    icon: chosenSeren,
    prices: {
      NORMAL: 227_000_000,
      HARD: 314_000_000,
      EXTREME: 1_340_000_000,
    },
  },
  KALOS_THE_GUARDIAN: {
    name: "감시자 칼로스",
    abbreviate: "칼로스",
    icon: kalosTheGuardian,
    prices: {
      EASY: 265_000_000,
      NORMAL: 364_000_000,
      CHAOS: 746_000_000,
      EXTREME: 1_500_000_000,
    },
  },
  KALING: {
    name: "카링",
    abbreviate: "카링",
    icon: kaling,
    prices: {
      EASY: 293_000_000,
      NORMAL: 425_000_000,
      HARD: 870_000_000,
      EXTREME: 1_750_000_000,
    },
  },
  LIMBO: {
    name: "림보",
    abbreviate: "림보",
    icon: limbo,
    prices: {
      NORMAL: 600_000_000,
      HARD: 1_070_000_000,
    },
  },
};
