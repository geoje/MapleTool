import {
  CharacterItemEquipment,
  CharacterItemEquipmentDetail,
} from "../../../dto/character/characterItemEquipment";
import { SLOT_GRID } from "./itemEquipmentConst";

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
        : itemEquipment.item_equipment_preset_1;

    return SLOT_GRID.map((slots) =>
      slots.map((slot) =>
        slot.length
          ? details.find((item) => item.item_equipment_slot == slot)
          : undefined
      )
    );
  }
}
