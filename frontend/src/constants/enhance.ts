import absolabs from "@/assets/enhance/set/absolabs.webp";
import arcaneumbra from "@/assets/enhance/set/arcaneumbra.webp";
import boss from "@/assets/enhance/set/boss.webp";
import dawn from "@/assets/enhance/set/dawn.webp";
import eternal from "@/assets/enhance/set/eternal.webp";
import pitched from "@/assets/enhance/set/pitched.webp";
import radiance from "@/assets/enhance/equipment/radiance/original-sin-of-pride.png";
import rootabis from "@/assets/enhance/set/rootabis.webp";

export const SetType = {
  ROOTABIS: "ROOTABIS",
  ABSOLABS: "ABSOLABS",
  ARCANEUMBRA: "ARCANEUMBRA",
  ETERNAL: "ETERNAL",
  BOSS: "BOSS",
  DAWN: "DAWN",
  PITCHED: "PITCHED",
  RADIANCE: "RADIANCE",
} as const;

export type SetType = (typeof SetType)[keyof typeof SetType];

export const SET_INFOS: Record<SetType, { name: string; icon: string }> = {
  [SetType.ROOTABIS]: { name: "루타비스", icon: rootabis },
  [SetType.ABSOLABS]: { name: "앱솔랩스", icon: absolabs },
  [SetType.ARCANEUMBRA]: { name: "아케인셰이드", icon: arcaneumbra },
  [SetType.ETERNAL]: { name: "에테르넬", icon: eternal },
  [SetType.BOSS]: { name: "보스 장신구", icon: boss },
  [SetType.DAWN]: { name: "여명의 보스", icon: dawn },
  [SetType.PITCHED]: { name: "칠흑의 보스", icon: pitched },
  [SetType.RADIANCE]: { name: "광휘의 보스", icon: radiance },
};

// Each pair's armor set and accessory set never use the same equipment slot,
// so their items can be shown together on one grid.
export const SET_COMBOS: [SetType, SetType][] = [
  [SetType.ROOTABIS, SetType.BOSS],
  [SetType.ABSOLABS, SetType.DAWN],
  [SetType.ARCANEUMBRA, SetType.PITCHED],
  [SetType.ETERNAL, SetType.RADIANCE],
];

export const PotentialGrade = {
  RARE: "RARE",
  EPIC: "EPIC",
  UNIQUE: "UNIQUE",
  LEGENDARY: "LEGENDARY",
} as const;

export type PotentialGrade = (typeof PotentialGrade)[keyof typeof PotentialGrade];

// Highest grade first: getMaxPotentialGrade walks this order to find the best match.
export const POTENTIAL_GRADE_INFOS: Record<PotentialGrade, { name: string; borderColor: string }> = {
  [PotentialGrade.LEGENDARY]: { name: "레전드리", borderColor: "#01ff00" },
  [PotentialGrade.UNIQUE]: { name: "유니크", borderColor: "#ffcc00" },
  [PotentialGrade.EPIC]: { name: "에픽", borderColor: "#cc66ff" },
  [PotentialGrade.RARE]: { name: "레어", borderColor: "#66ffff" },
};

export const EquipmentLevelTier = {
  LOW: "LOW",
  HIGH: "HIGH",
} as const;

export type EquipmentLevelTier = (typeof EquipmentLevelTier)[keyof typeof EquipmentLevelTier];

export const EQUIPMENT_LEVEL_TIERS: { key: EquipmentLevelTier; label: string }[] = [
  { key: EquipmentLevelTier.LOW, label: "120~200" },
  { key: EquipmentLevelTier.HIGH, label: "201~250" },
];

export const DEFAULT_EQUIPMENT_LEVEL_TIER: EquipmentLevelTier = EquipmentLevelTier.LOW;

export type SlotCell = { label: string; apiSlot: string } | "character" | null;

// 7 columns x 6 rows. The 3x4 "character" block (cols 3-5, rows 1-4) renders one
// large cropped character portrait spanning all 12 cells.
export const EQUIPMENT_SLOT_GRID: SlotCell[][] = [
  [
    { label: "반지4", apiSlot: "반지4" },
    { label: "얼굴장식", apiSlot: "얼굴장식" },
    "character",
    "character",
    "character",
    { label: "모자", apiSlot: "모자" },
    { label: "망토", apiSlot: "망토" },
  ],
  [
    { label: "반지3", apiSlot: "반지3" },
    { label: "눈장식", apiSlot: "눈장식" },
    "character",
    "character",
    "character",
    { label: "상의", apiSlot: "상의" },
    { label: "장갑", apiSlot: "장갑" },
  ],
  [
    { label: "반지2", apiSlot: "반지2" },
    { label: "귀걸이", apiSlot: "귀고리" },
    "character",
    "character",
    "character",
    { label: "하의", apiSlot: "하의" },
    { label: "신발", apiSlot: "신발" },
  ],
  [
    { label: "반지1", apiSlot: "반지1" },
    { label: "목걸이2", apiSlot: "펜던트2" },
    "character",
    "character",
    "character",
    { label: "어깨장식", apiSlot: "어깨장식" },
    { label: "훈장", apiSlot: "훈장" },
  ],
  [
    { label: "벨트", apiSlot: "벨트" },
    { label: "목걸이1", apiSlot: "펜던트" },
    { label: "무기", apiSlot: "무기" },
    { label: "보조무기", apiSlot: "보조무기" },
    { label: "엠블렘", apiSlot: "엠블렘" },
    { label: "안드로이드", apiSlot: "안드로이드" },
    { label: "기계 심장", apiSlot: "기계 심장" },
  ],
  [
    { label: "포켓장식", apiSlot: "포켓 아이템" },
    null,
    null,
    null,
    null,
    null,
    { label: "뱃지", apiSlot: "뱃지" },
  ],
];
