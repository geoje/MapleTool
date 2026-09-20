import { EquipmentLevelTier } from "@/constants/enhance";
import { EQUIPMENT_CATEGORIES } from "@/constants/starforce";

// One slug per EQUIPMENT_CATEGORIES entry, same order as
// proxy/src/cube-scraper.ts's PARTS_TYPES (the Nexon <select> option order).
const PARTS_SLUGS = [
  "weapon",
  "emblem",
  "subWeaponExceptShieldSoul",
  "forceShieldSoul",
  "shield",
  "hat",
  "top",
  "overall",
  "bottom",
  "shoes",
  "glove",
  "cape",
  "belt",
  "shoulder",
  "faceAccessory",
  "eyeAccessory",
  "earring",
  "ring",
  "pendant",
  "heart",
] as const;

export const CATEGORY_TO_PARTS_SLUG: Record<string, string> = Object.fromEntries(
  EQUIPMENT_CATEGORIES.map((category, index) => [category, PARTS_SLUGS[index]])
);

// The probability search form only has two level bands: 120-200 and 201-250.
export const LEVEL_TIER_TO_OPTION_LEVEL: Record<EquipmentLevelTier, number> = {
  [EquipmentLevelTier.LOW]: 200,
  [EquipmentLevelTier.HIGH]: 250,
};
