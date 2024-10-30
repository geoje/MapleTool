import {
  POTENTIAL_GRADE,
  POTENTIAL_INFOS,
} from "../constants/enhance/potential";
import { ItemEquipmentDetail } from "../types/character/itemEquipment/itemEquipment";

export function parseGrade(grade: string) {
  return Object.entries(POTENTIAL_INFOS).find(
    ([_, info]) => info.name == grade
  )?.[0] as POTENTIAL_GRADE;
}

export function getMaxGrade(item: ItemEquipmentDetail) {
  for (const [key, info] of Object.entries(POTENTIAL_INFOS).reverse()) {
    if (
      info.name != item.potential_option_grade &&
      info.name != item.additional_potential_option_grade
    )
      continue;

    return key as POTENTIAL_GRADE;
  }
  return undefined;
}
