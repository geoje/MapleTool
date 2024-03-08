import { CharacterItemEquipmentDetail } from "../../../domain/character/characterItemEquipment";
import { SLOT_GRID } from "./itemEquipmentConstant";

export default abstract class ItemEquipmentService {
  static itemGrid(
    items: CharacterItemEquipmentDetail[]
  ): (CharacterItemEquipmentDetail | undefined)[][] {
    return SLOT_GRID.map((slots) =>
      slots.map((slot) =>
        slot.length
          ? items.find((item) => item.item_equipment_slot == slot)
          : undefined
      )
    );
  }
}
