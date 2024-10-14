import { SLOT_GRID } from "../constants/enhance/equipment";
import { ROOTABIS } from "../constants/enhance/equipment/rootabis";
import { SET_TYPE } from "../constants/enhance/set";
import { ItemEquipment } from "../types/character/itemEquipment";

export function getCharacterEquipmentGrid(
  preset: number,
  equipment?: ItemEquipment
) {
  if (!equipment) return SLOT_GRID.map((slots) => slots.map(() => undefined));

  const items =
    preset == 3
      ? equipment.item_equipment_preset_3
      : preset == 2
      ? equipment.item_equipment_preset_2
      : equipment.item_equipment_preset_1;

  return SLOT_GRID.map((slots) =>
    slots.map((slot) =>
      slot.length
        ? items.find((item) => item.item_equipment_slot == slot)
        : undefined
    )
  );
}

export function getPreparedEquipmentGrid(preset: SET_TYPE) {
  const items = preset == SET_TYPE.ROOTABIS ? ROOTABIS : {};
  return Object.entries(items).map(([_, row]) => row);
}
