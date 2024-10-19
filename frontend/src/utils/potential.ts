import { KOR_NAME } from "../constants/enhance/potential";
import { ItemEquipmentDetail } from "../types/character/itemEquipment/itemEquipment";

export function getMaxPotentialIndex(item: ItemEquipmentDetail) {
  const gradeIndexes = [
    item.potential_option_grade,
    item.additional_potential_option_grade,
  ].map((grade) => KOR_NAME.findIndex((name) => name == grade));

  return Math.max(gradeIndexes[0], gradeIndexes[1]);
}
