import {
  CharacterItemEquipment,
  CharacterItemEquipmentDetail,
} from "../../../domain/character/characterItemEquipment";
import {
  POTENTIAL_GRADE,
  SLOT_GRID,
  MAX_STARFORCE_COUNT,
} from "./itemEquipmentConstant";

export default abstract class ItemEquipmentService {
  static itemGrid(
    itemEquipment: CharacterItemEquipment,
    preset: number
  ): (CharacterItemEquipmentDetail | undefined)[][] {
    const details =
      preset == 1
        ? itemEquipment.item_equipment_preset_1
        : preset == 2
        ? itemEquipment.item_equipment_preset_2
        : preset == 3
        ? itemEquipment.item_equipment_preset_3
        : itemEquipment.item_equipment;

    return SLOT_GRID.map((slots) =>
      slots.map((slot) =>
        slot.length
          ? details.find((item) => item.item_equipment_slot == slot)
          : undefined
      )
    );
  }
  static maxPotentialGradeIndex(item: CharacterItemEquipmentDetail) {
    const gradeIndexes = [
      item.potential_option_grade,
      item.additional_potential_option_grade,
    ].map((grade) => POTENTIAL_GRADE.findIndex((g) => g == grade));

    return Math.max(gradeIndexes[0], gradeIndexes[1]);
  }
  static maxStarforceCount(item: CharacterItemEquipmentDetail) {
    if (
      [
        item.scroll_upgrade,
        item.scroll_upgradeable_count,
        item.scroll_resilience_count,
      ].every((upgrade) => upgrade == "0")
    ) {
      return 0;
    }

    // TODO: calculate for superior
    for (const startforceCount of MAX_STARFORCE_COUNT) {
      if (item.item_base_option.base_equipment_level >= startforceCount.level) {
        return startforceCount.common;
      }
    }
    return MAX_STARFORCE_COUNT[MAX_STARFORCE_COUNT.length - 1].common;
  }
}
