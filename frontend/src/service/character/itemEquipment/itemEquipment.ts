import {
  CharacterItemEquipment,
  CharacterItemEquipmentDetail,
} from "../../../domain/character/characterItemEquipment";
import {
  POTENTIAL_GRADE,
  POTENTIAL_GRADE_COLOR,
  SLOT_GRID,
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
  static maxPotentialGradeColor(item: CharacterItemEquipmentDetail) {
    const gradeIndexes = [
      item.potential_option_grade,
      item.additional_potential_option_grade,
    ].map((grade) => POTENTIAL_GRADE.findIndex((g) => g == grade));

    return POTENTIAL_GRADE_COLOR[Math.max(gradeIndexes[0], gradeIndexes[1])];
  }
}
