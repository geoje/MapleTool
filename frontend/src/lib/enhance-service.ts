import { POTENTIAL_GRADE_INFOS } from "@/constants/enhance";
import type { ItemEquipmentDetail } from "@/types";

export function getMaxPotentialGrade(item: ItemEquipmentDetail) {
  return Object.entries(POTENTIAL_GRADE_INFOS).find(
    ([, info]) =>
      info.name == item.potential_option_grade || info.name == item.additional_potential_option_grade
  )?.[0] as keyof typeof POTENTIAL_GRADE_INFOS | undefined;
}
