export const MIN_STARFORCE_LEVEL = 0;
export const MAX_STARFORCE_LEVEL = 300;
export const DEFAULT_STARFORCE_LEVEL = 140;
export const STARFORCE_LEVEL_PRESETS = [140, 160, 200, 250];
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
