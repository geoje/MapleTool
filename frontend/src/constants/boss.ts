import zakum from "@/assets/boss/zakum.png";
import magnus from "@/assets/boss/magnus.png";
import papulatus from "@/assets/boss/papulatus.png";
import pierre from "@/assets/boss/pierre.png";
import vonBon from "@/assets/boss/von-bon.png";
import crimsonQueen from "@/assets/boss/crimson-queen.png";
import vellum from "@/assets/boss/vellum.png";
import lotus from "@/assets/boss/lotus.png";
import damien from "@/assets/boss/damien.png";
import guardianAngelSlime from "@/assets/boss/guardian-angel-slime.png";
import lucid from "@/assets/boss/lucid.png";
import will from "@/assets/boss/will.png";
import gloom from "@/assets/boss/gloom.png";
import verusHilla from "@/assets/boss/verus-hilla.png";
import darknell from "@/assets/boss/darknell.png";
import chosenSeren from "@/assets/boss/chosen-seren.png";
import kalosTheGuardian from "@/assets/boss/kalos-the-guardian.png";
import theFirstAdversary from "@/assets/boss/the-first-adversary.png";
import kaling from "@/assets/boss/kaling.png";
import bellona from "@/assets/boss/bellona.png";
import radiantMaleficStar from "@/assets/boss/radiant-malefic-star.png";
import limbo from "@/assets/boss/limbo.png";
import baldrix from "@/assets/boss/baldrix.png";
import jupiter from "@/assets/boss/jupiter.png";
import blackMage from "@/assets/boss/black-mage.png";
import mementoSilver from "@/assets/item/memento-silver.png";
import mementoGold from "@/assets/item/memento-gold.png";

export const BossType = {
  ZZAKUM: "ZZAKUM",
  MAGNUS: "MAGNUS",
  PAPULATUS: "PAPULATUS",
  PIERRE: "PIERRE",
  VON_BON: "VON_BON",
  CRIMSON_QUEEN: "CRIMSON_QUEEN",
  VELLUM: "VELLUM",
  LOTUS: "LOTUS",
  DAMIEN: "DAMIEN",
  GUARDIAN_ANGEL_SLIME: "GUARDIAN_ANGEL_SLIME",
  LUCID: "LUCID",
  WILL: "WILL",
  GLOOM: "GLOOM",
  VERUS_HILLA: "VERUS_HILLA",
  DARKNELL: "DARKNELL",
  CHOSEN_SEREN: "CHOSEN_SEREN",
  KALOS_THE_GUARDIAN: "KALOS_THE_GUARDIAN",
  THE_FIRST_ADVERSARY: "THE_FIRST_ADVERSARY",
  KALING: "KALING",
  BELLONA: "BELLONA",
  RADIANT_MALEFIC_STAR: "RADIANT_MALEFIC_STAR",
  LIMBO: "LIMBO",
  BALDRIX: "BALDRIX",
  JUPITER: "JUPITER",
  BLACK_MAGE: "BLACK_MAGE",
} as const;
export type BossType = (typeof BossType)[keyof typeof BossType];

export const BossDifficulty = {
  EASY: "EASY",
  NORMAL: "NORMAL",
  HARD: "HARD",
  CHAOS: "CHAOS",
  EXTREME: "EXTREME",
} as const;
export type BossDifficulty = (typeof BossDifficulty)[keyof typeof BossDifficulty];

export const MAX_BOSS_SELECTABLE = 12;

interface ColorSet {
  text: string;
  back: string;
  border: string;
}
export const DIFFICULTY_COLOR: Partial<Record<BossDifficulty, ColorSet>> = {
  EASY: { text: "#ffffff", back: "#999999", border: "#999999" },
  NORMAL: { text: "#ffffff", back: "#33aabb", border: "#33aabb" },
  HARD: { text: "#ffffff", back: "#dd4489", border: "#dd4489" },
  CHAOS: { text: "#ffddbb", back: "#444444", border: "#ddbb88" },
  EXTREME: { text: "#ee4455", back: "#444444", border: "#ee3355" },
};

export const CUBE_ICON = {
  silver: mementoSilver,
  gold: mementoGold,
} as const;

interface CubeReward {
  silver?: number;
  gold?: number;
}

interface Boss {
  name: string;
  abbreviate: string;
  icon: string;
  prices: Partial<Record<BossDifficulty, number>>;
  previousPrices?: Partial<Record<BossDifficulty, number>>;
  category?: "weekly" | "monthly";
  cubes?: Partial<Record<BossDifficulty, CubeReward>>;
  previousCubes?: Partial<Record<BossDifficulty, CubeReward>>;
}
export const BOSS: Record<BossType, Boss> = {
  ZZAKUM: {
    name: "자쿰",
    abbreviate: "자쿰",
    icon: zakum,
    prices: { CHAOS: 4_040_000 },
    previousPrices: { CHAOS: 8_080_000 },
  },
  MAGNUS: {
    name: "매그너스",
    abbreviate: "매그",
    icon: magnus,
    prices: { HARD: 4_280_000 },
    previousPrices: { HARD: 8_560_000 },
  },
  PAPULATUS: {
    name: "파풀라투스",
    abbreviate: "파풀",
    icon: papulatus,
    prices: { CHAOS: 6_550_000 },
    previousPrices: { CHAOS: 13_100_000 },
  },
  PIERRE: {
    name: "피에르",
    abbreviate: "피에르",
    icon: pierre,
    prices: { CHAOS: 4_080_000 },
    previousPrices: { CHAOS: 8_170_000 },
  },
  VON_BON: {
    name: "반반",
    abbreviate: "반반",
    icon: vonBon,
    prices: { CHAOS: 4_070_000 },
    previousPrices: { CHAOS: 8_150_000 },
  },
  CRIMSON_QUEEN: {
    name: "블러디퀸",
    abbreviate: "블퀸",
    icon: crimsonQueen,
    prices: { CHAOS: 4_070_000 },
    previousPrices: { CHAOS: 8_140_000 },
  },
  VELLUM: {
    name: "벨룸",
    abbreviate: "벨룸",
    icon: vellum,
    prices: { CHAOS: 4_640_000 },
    previousPrices: { CHAOS: 9_280_000 },
  },
  LOTUS: {
    name: "스우",
    abbreviate: "스우",
    icon: lotus,
    prices: { NORMAL: 8_350_000, HARD: 48_900_000, EXTREME: 545_000_000 },
    previousPrices: { NORMAL: 16_700_000, HARD: 51_500_000, EXTREME: 574_000_000 },
    cubes: { HARD: { silver: 0 } },
    previousCubes: { HARD: { silver: 1 } },
  },
  DAMIEN: {
    name: "데미안",
    abbreviate: "데미안",
    icon: damien,
    prices: { NORMAL: 8_750_000, HARD: 46_400_000 },
    previousPrices: { NORMAL: 17_500_000, HARD: 48_900_000 },
    cubes: { HARD: { silver: 0 } },
    previousCubes: { HARD: { silver: 1 } },
  },
  GUARDIAN_ANGEL_SLIME: {
    name: "가디언 엔젤 슬라임",
    abbreviate: "가엔슬",
    icon: guardianAngelSlime,
    prices: { NORMAL: 12_700_000, CHAOS: 71_300_000 },
    previousPrices: { NORMAL: 25_500_000, CHAOS: 75_100_000 },
    cubes: { CHAOS: { silver: 1 } },
    previousCubes: { CHAOS: { silver: 2 } },
  },
  LUCID: {
    name: "루시드",
    abbreviate: "루시드",
    icon: lucid,
    prices: { EASY: 14_900_000, NORMAL: 17_800_000, HARD: 59_700_000 },
    previousPrices: { EASY: 29_800_000, NORMAL: 35_600_000, HARD: 62_900_000 },
    cubes: { HARD: { silver: 1 } },
    previousCubes: { HARD: { silver: 2 } },
  },
  WILL: {
    name: "윌",
    abbreviate: "윌",
    icon: will,
    prices: { EASY: 16_100_000, NORMAL: 20_500_000, HARD: 73_200_000 },
    previousPrices: { EASY: 32_300_000, NORMAL: 41_100_000, HARD: 77_100_000 },
    cubes: { HARD: { silver: 1 } },
    previousCubes: { HARD: { silver: 2 } },
  },
  GLOOM: {
    name: "더스크",
    abbreviate: "더스크",
    icon: gloom,
    prices: { NORMAL: 22_000_000, CHAOS: 66_300_000 },
    previousPrices: { NORMAL: 44_000_000, CHAOS: 69_800_000 },
    cubes: { CHAOS: { silver: 1 } },
    previousCubes: { CHAOS: { silver: 2 } },
  },
  VERUS_HILLA: {
    name: "진 힐라",
    abbreviate: "진힐라",
    icon: verusHilla,
    prices: { NORMAL: 67_600_000, HARD: 100_000_000 },
    previousPrices: { NORMAL: 71_200_000, HARD: 106_000_000 },
    cubes: { NORMAL: { silver: 0 }, HARD: { silver: 1 } },
    previousCubes: { NORMAL: { silver: 1 }, HARD: { silver: 2 } },
  },
  DARKNELL: {
    name: "듄켈",
    abbreviate: "듄켈",
    icon: darknell,
    prices: { NORMAL: 23_700_000, HARD: 89_600_000 },
    previousPrices: { NORMAL: 47_500_000, HARD: 94_400_000 },
    cubes: { HARD: { silver: 1 } },
    previousCubes: { HARD: { silver: 2 } },
  },
  CHOSEN_SEREN: {
    name: "선택받은 세렌",
    abbreviate: "세렌",
    icon: chosenSeren,
    prices: { NORMAL: 167_000_000, HARD: 302_000_000, EXTREME: 1_840_000_000 },
    previousPrices: { NORMAL: 239_000_000, HARD: 356_000_000, EXTREME: 2_835_000_000 },
    cubes: { NORMAL: { silver: 2, gold: 0 } },
    previousCubes: { NORMAL: { silver: 0, gold: 1 } },
  },
  KALOS_THE_GUARDIAN: {
    name: "감시자 칼로스",
    abbreviate: "칼로스",
    icon: kalosTheGuardian,
    prices: {
      EASY: 238_000_000,
      NORMAL: 479_000_000,
      CHAOS: 1_230_000_000,
      EXTREME: 4_104_000_000,
    },
    previousPrices: {
      EASY: 280_000_000,
      NORMAL: 505_000_000,
      CHAOS: 1_273_000_000,
    },
    cubes: { NORMAL: { gold: 3 } },
    previousCubes: { NORMAL: { gold: 0 } },
  },
  THE_FIRST_ADVERSARY: {
    name: "최초의 대적자",
    abbreviate: "대적자",
    icon: theFirstAdversary,
    prices: {
      EASY: 261_000_000,
      NORMAL: 532_000_000,
      HARD: 1_390_000_000,
      EXTREME: 4_712_000_000,
    },
    previousPrices: {
      EASY: 308_000_000,
      NORMAL: 560_000_000,
      HARD: 1_435_000_000,
    },
    cubes: { NORMAL: { gold: 3 } },
    previousCubes: { NORMAL: { gold: 0 } },
  },
  KALING: {
    name: "카링",
    abbreviate: "카링",
    icon: kaling,
    prices: {
      EASY: 320_000_000,
      NORMAL: 576_000_000,
      HARD: 1_560_000_000,
      EXTREME: 5_387_000_000,
    },
    previousPrices: {
      EASY: 377_000_000,
      NORMAL: 678_000_000,
      HARD: 1_739_000_000,
    },
    cubes: { NORMAL: { gold: 3 } },
    previousCubes: { NORMAL: { gold: 0 } },
  },
  RADIANT_MALEFIC_STAR: {
    name: "찬란한 흉성",
    abbreviate: "흉성",
    icon: radiantMaleficStar,
    prices: { NORMAL: 593_000_000, HARD: 2_678_000_000 },
    previousPrices: { NORMAL: 625_000_000 },
    cubes: { NORMAL: { gold: 3 } },
    previousCubes: { NORMAL: { gold: 0 } },
  },
  BELLONA: {
    name: "벨로나",
    abbreviate: "벨로나",
    icon: bellona,
    prices: { EASY: 396_000_000, NORMAL: 824_000_000, HARD: 2_950_000_000 },
    previousPrices: { EASY: 440_000_000, NORMAL: 850_000_000 },
    cubes: { EASY: { gold: 2 } },
    previousCubes: { EASY: { gold: 0 } },
  },
  LIMBO: {
    name: "림보",
    abbreviate: "림보",
    icon: limbo,
    prices: { NORMAL: 995_000_000, HARD: 2_385_000_000 },
    previousPrices: { NORMAL: 1_026_000_000 },
  },
  BALDRIX: {
    name: "발드릭스",
    abbreviate: "발드",
    icon: baldrix,
    prices: { NORMAL: 1_320_000_000, HARD: 3_078_000_000 },
    previousPrices: { NORMAL: 1_368_000_000 },
  },
  JUPITER: {
    name: "유피테르",
    abbreviate: "유피",
    icon: jupiter,
    prices: { NORMAL: 1_560_000_000, HARD: 4_845_000_000 },
    previousPrices: { NORMAL: 1_615_000_000 },
  },
  BLACK_MAGE: {
    name: "검은 마법사",
    abbreviate: "검마",
    icon: blackMage,
    category: "monthly",
    prices: { HARD: 465_000_000, EXTREME: 5_680_000_000 },
    previousPrices: { HARD: 665_000_000, EXTREME: 8_740_000_000 },
    cubes: { HARD: { silver: 8, gold: 0 } },
    previousCubes: { HARD: { silver: 0, gold: 8 } },
  },
};

const BOSS_TYPE_ORDER = Object.keys(BOSS) as BossType[];
const FIRST_HALF_SPLIT_INDEX = BOSS_TYPE_ORDER.indexOf(BossType.DARKNELL);

export const FIRST_HALF_BOSS_TYPES = BOSS_TYPE_ORDER.slice(0, FIRST_HALF_SPLIT_INDEX + 1);
export const SECOND_HALF_BOSS_TYPES = BOSS_TYPE_ORDER.slice(FIRST_HALF_SPLIT_INDEX + 1).filter(
  (type) => BOSS[type].category != "monthly"
);
