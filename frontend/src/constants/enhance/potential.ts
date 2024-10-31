import RARE from "../../assets/equipment/potential/rare.png";
import EPIC from "../../assets/equipment/potential/epic.png";
import UNIQUE from "../../assets/equipment/potential/unique.png";
import LEGENDARY from "../../assets/equipment/potential/legendary.png";
import { MATERIAL_TYPE } from "./material";

export enum POTENTIAL_GRADE {
  RARE = "RARE",
  EPIC = "EPIC",
  UNIQUE = "UNIQUE",
  LENGENDARY = "LENGENDARY",
}
export enum POTENTIAL_TYPE {
  NORMAL = "NORMAL",
  ADDI = "ADDI",
}

interface Info {
  name: string;
  borderColor: string;
  imageColor: string;
  textColor: string;
  icon: string;
  rolling: Record<POTENTIAL_TYPE, { level: number; cost: number }[]>;
}
export const POTENTIAL_INFOS: Record<POTENTIAL_GRADE, Info> = {
  [POTENTIAL_GRADE.RARE]: {
    name: "레어",
    borderColor: "#66ffff",
    imageColor: "#0099cc",
    textColor: "#66ffff",
    icon: RARE,
    rolling: {
      [POTENTIAL_TYPE.NORMAL]: [
        { level: 250, cost: 5_000_000 },
        { level: 200, cost: 4_500_000 },
        { level: 160, cost: 4_250_000 },
        { level: 0, cost: 4_000_000 },
      ],
      [POTENTIAL_TYPE.ADDI]: [
        { level: 250, cost: 24_500_000 },
        { level: 200, cost: 22_000_000 },
        { level: 160, cost: 20_750_000 },
        { level: 0, cost: 19_500_000 },
      ],
    },
  },
  [POTENTIAL_GRADE.EPIC]: {
    name: "에픽",
    borderColor: "#cc66ff",
    imageColor: "#7700cc",
    textColor: "#9966ff",
    icon: EPIC,
    rolling: {
      [POTENTIAL_TYPE.NORMAL]: [
        { level: 250, cost: 20_000_000 },
        { level: 200, cost: 18_000_000 },
        { level: 160, cost: 17_000_000 },
        { level: 0, cost: 16_000_000 },
      ],
      [POTENTIAL_TYPE.ADDI]: [
        { level: 250, cost: 68_600_000 },
        { level: 200, cost: 61_600_000 },
        { level: 160, cost: 58_100_000 },
        { level: 0, cost: 54_600_000 },
      ],
    },
  },
  [POTENTIAL_GRADE.UNIQUE]: {
    name: "유니크",
    borderColor: "#ffcc00",
    imageColor: "#eeab00",
    textColor: "#ffcc00",
    icon: UNIQUE,
    rolling: {
      [POTENTIAL_TYPE.NORMAL]: [
        { level: 250, cost: 42_500_000 },
        { level: 200, cost: 38_250_000 },
        { level: 160, cost: 36_125_000 },
        { level: 0, cost: 34_000_000 },
      ],
      [POTENTIAL_TYPE.ADDI]: [
        { level: 250, cost: 83_300_000 },
        { level: 200, cost: 74_800_000 },
        { level: 160, cost: 70_550_000 },
        { level: 0, cost: 66_300_000 },
      ],
    },
  },
  [POTENTIAL_GRADE.LENGENDARY]: {
    name: "레전드리",
    borderColor: "#01ff00",
    imageColor: "#00cc99",
    textColor: "#ccff00",
    icon: LEGENDARY,
    rolling: {
      [POTENTIAL_TYPE.NORMAL]: [
        { level: 250, cost: 50_000_000 },
        { level: 200, cost: 45_000_000 },
        { level: 160, cost: 42_500_000 },
        { level: 0, cost: 40_000_000 },
      ],
      [POTENTIAL_TYPE.ADDI]: [
        { level: 250, cost: 98_000_000 },
        { level: 200, cost: 88_000_000 },
        { level: 160, cost: 83_000_000 },
        { level: 0, cost: 78_000_000 },
      ],
    },
  },
};

export const BOUNDS: Partial<
  Record<MATERIAL_TYPE, Record<POTENTIAL_GRADE, number>>
> = {
  POTENTIAL: {
    RARE: 10,
    EPIC: 42,
    UNIQUE: 107,
    LENGENDARY: -1,
  },
  POTENTIAL_ADDI: {
    RARE: 62,
    EPIC: 152,
    UNIQUE: 214,
    LENGENDARY: -1,
  },
  RED: {
    RARE: 25,
    EPIC: 83,
    UNIQUE: 500,
    LENGENDARY: -1,
  },
  BLACK: {
    RARE: 10,
    EPIC: 42,
    UNIQUE: 107,
    LENGENDARY: -1,
  },
  ADDI: {
    RARE: 31,
    EPIC: 76,
    UNIQUE: 214,
    LENGENDARY: -1,
  },
  WHITE_ADDI: {
    RARE: 31,
    EPIC: 76,
    UNIQUE: 214,
    LENGENDARY: -1,
  },
};
