import zzakum from "../assets/boss/zakum.png";
import magnus from "../assets/boss/magnus.png";
import papulatus from "../assets/boss/papulatus.png";
import pierre from "../assets/boss/pierre.png";
import vonBon from "../assets/boss/von-bon.png";
import crimsonQueen from "../assets/boss/crimson-queen.png";
import vellum from "../assets/boss/vellum.png";
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
import radiantMaleficStar from "../assets/boss/radiant-malefic-star.png";
import limbo from "../assets/boss/limbo.png";
import baldrix from "../assets/boss/baldrix.png";
import jupiter from "../assets/boss/jupiter.png";

export const SHOW_BOSS_COMPARISON = true;
export const BOSS_VERSION = "7/1";

export enum BOSS_TYPE {
  ZZAKUM = "ZZAKUM",
  MAGNUS = "MAGNUS",
  PAPULATUS = "PAPULATUS",
  PIERRE = "PIERRE",
  VON_BON = "VON_BON",
  CRIMSON_QUEEN = "CRIMSON_QUEEN",
  VELLUM = "VELLUM",
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
  RADIANT_MALEFIC_STAR = "RADIANT_MALEFIC_STAR",
  LIMBO = "LIMBO",
  BALDRIX = "BALDRIX",
  JUPITER = "JUPITER",
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
  prev_prices: Partial<Record<BOSS_DIFFICULTY, number>>;
}
export const BOSS: Record<BOSS_TYPE, Boss> = {
  ZZAKUM: {
    name: "자쿰",
    abbreviate: "자쿰",
    icon: zzakum,
    prices: { CHAOS: 8_080_000 },
    prev_prices: { CHAOS: 8_080_000 },
  },
  MAGNUS: {
    name: "매그너스",
    abbreviate: "매그",
    icon: magnus,
    prices: { HARD: 8_560_000 },
    prev_prices: { HARD: 8_560_000 },
  },
  PAPULATUS: {
    name: "파풀라투스",
    abbreviate: "파풀",
    icon: papulatus,
    prices: { CHAOS: 13_100_000 },
    prev_prices: { CHAOS: 13_800_000 },
  },
  PIERRE: {
    name: "피에르",
    abbreviate: "피에르",
    icon: pierre,
    prices: { CHAOS: 8_170_000 },
    prev_prices: { CHAOS: 8_170_000 },
  },
  VON_BON: {
    name: "반반",
    abbreviate: "반반",
    icon: vonBon,
    prices: { CHAOS: 8_150_000 },
    prev_prices: { CHAOS: 8_150_000 },
  },
  CRIMSON_QUEEN: {
    name: "블러디퀸",
    abbreviate: "블퀸",
    icon: crimsonQueen,
    prices: { CHAOS: 8_140_000 },
    prev_prices: { CHAOS: 8_140_000 },
  },
  VELLUM: {
    name: "벨룸",
    abbreviate: "벨룸",
    icon: vellum,
    prices: { CHAOS: 9_280_000 },
    prev_prices: { CHAOS: 9_280_000 },
  },
  LOTUS: {
    name: "스우",
    abbreviate: "스우",
    icon: lotus,
    prices: { NORMAL: 16_700_000, HARD: 51_500_000, EXTREME: 574_000_000 },
    prev_prices: { NORMAL: 17_600_000, HARD: 54_200_000, EXTREME: 604_000_000 },
  },
  DAMIEN: {
    name: "데미안",
    abbreviate: "데미안",
    icon: damien,
    prices: { NORMAL: 17_500_000, HARD: 48_900_000 },
    prev_prices: { NORMAL: 18_400_000, HARD: 51_500_000 },
  },
  GUARDIAN_ANGEL_SLIME: {
    name: "가디언 엔젤 슬라임",
    abbreviate: "가엔슬",
    icon: guardianAngelSlime,
    prices: { NORMAL: 25_500_000, CHAOS: 75_100_000 },
    prev_prices: { NORMAL: 26_800_000, CHAOS: 79_100_000 },
  },
  LUCID: {
    name: "루시드",
    abbreviate: "루시드",
    icon: lucid,
    prices: { EASY: 29_800_000, NORMAL: 35_600_000, HARD: 62_900_000 },
    prev_prices: { EASY: 31_400_000, NORMAL: 37_500_000, HARD: 66_200_000 },
  },
  WILL: {
    name: "윌",
    abbreviate: "윌",
    icon: will,
    prices: { EASY: 32_300_000, NORMAL: 41_100_000, HARD: 77_100_000 },
    prev_prices: { EASY: 34_000_000, NORMAL: 43_300_000, HARD: 81_200_000 },
  },
  GLOOM: {
    name: "더스크",
    abbreviate: "더스크",
    icon: gloom,
    prices: { NORMAL: 44_000_000, CHAOS: 69_800_000 },
    prev_prices: { NORMAL: 46_300_000, CHAOS: 73_500_000 },
  },
  VERUS_HILLA: {
    name: "진 힐라",
    abbreviate: "진힐라",
    icon: verusHilla,
    prices: { NORMAL: 71_200_000, HARD: 106_000_000 },
    prev_prices: { NORMAL: 74_900_000, HARD: 112_000_000 },
  },
  DARKNELL: {
    name: "듄켈",
    abbreviate: "듄켈",
    icon: darknell,
    prices: { NORMAL: 47_500_000, HARD: 94_400_000 },
    prev_prices: { NORMAL: 50_000_000, HARD: 99_400_000 },
  },
  CHOSEN_SEREN: {
    name: "선택받은 세렌",
    abbreviate: "세렌",
    icon: chosenSeren,
    prices: {
      NORMAL: 239_000_000,
      HARD: 356_000_000,
      EXTREME: 2_835_000_000,
    },
    prev_prices: {
      NORMAL: 266_000_000,
      HARD: 396_000_000,
      EXTREME: 3_150_000_000,
    },
  },
  KALOS_THE_GUARDIAN: {
    name: "감시자 칼로스",
    abbreviate: "칼로스",
    icon: kalosTheGuardian,
    prices: {
      EASY: 280_000_000,
      NORMAL: 505_000_000,
      CHAOS: 1_273_000_000,
      EXTREME: 4_104_000_000,
    },
    prev_prices: {
      EASY: 311_000_000,
      NORMAL: 561_000_000,
      CHAOS: 1_340_000_000,
      EXTREME: 4_320_000_000,
    },
  },
  THE_FIRST_ADVERSARY: {
    name: "최초의 대적자",
    abbreviate: "대적자",
    icon: theFirstAdversary,
    prices: {
      EASY: 308_000_000,
      NORMAL: 560_000_000,
      HARD: 1_435_000_000,
      EXTREME: 4_712_000_000,
    },
    prev_prices: {
      EASY: 324_000_000,
      NORMAL: 589_000_000,
      HARD: 1_510_000_000,
      EXTREME: 4_960_000_000,
    },
  },
  KALING: {
    name: "카링",
    abbreviate: "카링",
    icon: kaling,
    prices: {
      EASY: 377_000_000,
      NORMAL: 678_000_000,
      HARD: 1_739_000_000,
      EXTREME: 5_387_000_000,
    },
    prev_prices: {
      EASY: 419_000_000,
      NORMAL: 714_000_000,
      HARD: 1_830_000_000,
      EXTREME: 5_670_000_000,
    },
  },
  RADIANT_MALEFIC_STAR: {
    name: "찬란한 흉성",
    abbreviate: "흉성",
    icon: radiantMaleficStar,
    prices: { NORMAL: 625_000_000, HARD: 2_678_000_000 },
    prev_prices: { NORMAL: 658_000_000, HARD: 2_819_000_000 },
  },
  LIMBO: {
    name: "림보",
    abbreviate: "림보",
    icon: limbo,
    prices: { NORMAL: 1_026_000_000, HARD: 2_385_000_000 },
    prev_prices: { NORMAL: 1_080_000_000, HARD: 2_510_000_000 },
  },
  BALDRIX: {
    name: "발드릭스",
    abbreviate: "발드",
    icon: baldrix,
    prices: { NORMAL: 1_368_000_000, HARD: 3_078_000_000 },
    prev_prices: { NORMAL: 1_440_000_000, HARD: 3_240_000_000 },
  },
  JUPITER: {
    name: "유피테르",
    abbreviate: "유피",
    icon: jupiter,
    prices: { NORMAL: 1_615_000_000, HARD: 4_845_000_000 },
    prev_prices: { NORMAL: 1_700_000_000, HARD: 5_100_000_000 },
  },
};
