export const MIN_STARFORCE_LEVEL = 0;
export const MAX_STARFORCE_LEVEL = 300;
export const DEFAULT_STARFORCE_LEVEL = 140;
export const STARFORCE_LEVEL_PRESETS = [160, 200, 250];
export const MAX_STAR = 30;

export const EQUIPMENT_CATEGORIES = [
  "무기",
  "엠블렘",
  "보조무기(포스실드, 소울링 제외)",
  "포스실드, 소울링",
  "방패",
  "모자",
  "상의",
  "한벌옷",
  "하의",
  "신발",
  "장갑",
  "망토",
  "벨트",
  "어깨장식",
  "얼굴장식",
  "눈장식",
  "귀고리",
  "반지",
  "펜던트",
  "기계심장",
] as const;

export const DEFAULT_EQUIPMENT_CATEGORY = EQUIPMENT_CATEGORIES[0];

export interface MembershipGrade {
  key: string;
  label: string;
  discountRate: number;
}

export const MEMBERSHIP_GRADES: MembershipGrade[] = [
  { key: "silver", label: "실버", discountRate: 3 },
  { key: "gold", label: "골드", discountRate: 5 },
  { key: "diamond", label: "다이아", discountRate: 10 },
];

export const PC_ROOM_DISCOUNT_RATE = 5;

// Safeguard: usable only at stars 15-17; triples the enhancement cost for that attempt (destroy chance is absorbed into maintain chance).
export const SAFEGUARD_STARS = [15, 16, 17] as const;
export const SAFEGUARD_COST_MULTIPLIER = 3;

// Per-star [success, maintain (no drop), destroy] probabilities. Below star 15 there is no destroy, so failure always maintains.
export const STARFORCE_PROBABILITIES: readonly [number, number, number][] = [
  [0.9975, 0.0025, 0],
  [0.945, 0.055, 0],
  [0.8925, 0.1075, 0],
  [0.8925, 0.1075, 0],
  [0.84, 0.16, 0],
  [0.7875, 0.2125, 0],
  [0.735, 0.265, 0],
  [0.6825, 0.3175, 0],
  [0.63, 0.37, 0],
  [0.5775, 0.4225, 0],
  [0.525, 0.475, 0],
  [0.4725, 0.5275, 0],
  [0.42, 0.58, 0],
  [0.3675, 0.6325, 0],
  [0.315, 0.685, 0],
  [0.315, 0.66445, 0.02055],
  [0.315, 0.66445, 0.02055],
  [0.1575, 0.7751, 0.0674],
  [0.1575, 0.7751, 0.0674],
  [0.1575, 0.75825, 0.08425],
  [0.315, 0.58225, 0.10275],
  [0.1575, 0.716125, 0.126375],
  [0.1575, 0.674, 0.1685],
  [0.105, 0.716, 0.179],
  [0.105, 0.716, 0.179],
  [0.105, 0.716, 0.179],
  [0.0735, 0.7416, 0.1853],
  [0.0525, 0.758, 0.1895],
  [0.0315, 0.7748, 0.1937],
  [0.0105, 0.7916, 0.1979],
];

// Trace restore (guaranteed restore): usable only at stars 15-22, and only for specific equipment levels.
// Restores to the star right before destruction (stays in place); per level, [required spare equipment count, restore cost in meso (100M units)] is fixed.
export const RESTORE_AVAILABLE_STARS = [15, 16, 17, 18, 19, 20, 21, 22] as const;
export const RESTORE_AVAILABLE_LEVELS = [130, 135, 140, 145, 150, 160, 200, 250] as const;

export const RESTORE_TABLE: Record<number, Record<number, [requiredSpareCount: number, mesoCostEok: number]>> = {
  130: { 15: [1, 1.19], 16: [1, 2.87], 17: [1, 4.85], 18: [1, 11.03], 19: [2, 18.27], 20: [0, 0], 21: [0, 0], 22: [0, 0] },
  135: { 15: [1, 1.33], 16: [1, 3.21], 17: [1, 5.42], 18: [1, 12.31], 19: [2, 20.43], 20: [0, 0], 21: [0, 0], 22: [0, 0] },
  140: { 15: [1, 1.49], 16: [1, 3.59], 17: [1, 6.06], 18: [1, 13.8], 19: [2, 22.8], 20: [2, 40.2], 21: [3, 50.5], 22: [4, 82.9] },
  145: { 15: [1, 1.65], 16: [1, 3.98], 17: [1, 6.71], 18: [1, 15.28], 19: [2, 25.4], 20: [2, 44.5], 21: [3, 56.05], 22: [4, 92.25] },
  150: { 15: [1, 1.83], 16: [1, 4.41], 17: [1, 7.45], 18: [1, 16.89], 19: [2, 28.03], 20: [2, 49.44], 21: [3, 62.24], 22: [4, 101.79] },
  160: { 15: [1, 2.22], 16: [1, 5.35], 17: [1, 9.04], 18: [1, 20.6], 19: [2, 34.1], 20: [2, 60], 21: [3, 75.4], 22: [4, 124] },
  200: { 15: [1, 4.33], 16: [1, 10.5], 17: [1, 17.7], 18: [1, 40.1], 19: [2, 66.5], 20: [2, 118], 21: [3, 148], 22: [4, 242] },
  250: { 15: [1, 8.46], 16: [1, 20.4], 17: [1, 34.5], 18: [1, 78.3], 19: [2, 130], 20: [2, 229], 21: [3, 288], 22: [4, 473] },
};
