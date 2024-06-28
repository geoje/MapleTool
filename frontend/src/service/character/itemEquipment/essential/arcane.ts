import { CharacterItemEquipmentDetail } from "../../../../dto/character/characterItemEquipment";

export const HAT_BY_CLASS: CharacterItemEquipmentDetail[] = [];
export const CLOTHES_BY_CLASS: CharacterItemEquipmentDetail[] = [];
export const SHOES_BY_CLASS: CharacterItemEquipmentDetail[] = [];
export const GLOVES_BY_CLASS: CharacterItemEquipmentDetail[] = [];
export const CLOAK_BY_CLASS: CharacterItemEquipmentDetail[] = [];
export const SHOULDER_BY_CLASS: CharacterItemEquipmentDetail[] = [];
export const WEAPONS_BY_CLASS: CharacterItemEquipmentDetail[][] = [];

export const ARCANE_SET: {
  EQUIPMENT_BY_CLASS: CharacterItemEquipmentDetail[][];
  WEAPONS_BY_CLASS: CharacterItemEquipmentDetail[][];
} = {
  EQUIPMENT_BY_CLASS: [
    HAT_BY_CLASS,
    CLOTHES_BY_CLASS,
    SHOES_BY_CLASS,
    GLOVES_BY_CLASS,
    CLOAK_BY_CLASS,
    SHOULDER_BY_CLASS,
  ],
  WEAPONS_BY_CLASS,
};
