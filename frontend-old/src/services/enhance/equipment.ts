import {
  EMPTY_DETAIL,
  EMPTY_OPTION,
  SLOT_GRID,
} from "../../constants/enhance/equipment";
import { ABSOLABS } from "../../constants/enhance/equipment/absolabs";
import { ARCANEUMBRA } from "../../constants/enhance/equipment/arcaneumbra";
import { BOSS_ACCESSORY } from "../../constants/enhance/equipment/boss";
import { DAWN } from "../../constants/enhance/equipment/dawn";
import { PITCHED } from "../../constants/enhance/equipment/pitched";
import { RADIANCE } from "../../constants/enhance/equipment/radiance";
import { ETERNAL } from "../../constants/enhance/equipment/eternal";
import { ROOTABIS } from "../../constants/enhance/equipment/rootabis";
import { SET_TYPE } from "../../constants/enhance/set";
import {
  ItemEquipment,
  ItemEquipmentDetail,
} from "../../types/character/itemEquipment/itemEquipment";

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
  const itemsByClass =
    preset == SET_TYPE.ROOTABIS
      ? ROOTABIS
      : preset == SET_TYPE.ABSOLABS
      ? ABSOLABS
      : preset == SET_TYPE.ARCANEUMBRA
      ? ARCANEUMBRA
      : preset == SET_TYPE.ETERNAL
      ? ETERNAL
      : {};

  if (!Object.keys(itemsByClass).length) {
    return [
      (preset == SET_TYPE.BOSS
        ? BOSS_ACCESSORY
        : preset == SET_TYPE.DAWN
        ? DAWN
        : preset == SET_TYPE.PITCHED
        ? PITCHED
        : preset == SET_TYPE.RADIANCE
        ? RADIANCE
        : []
      ).map((item) => getFullDetailByPartial(item)),
    ];
  }

  const maxCols = Math.max(
    ...Object.entries(itemsByClass).map(([_, items]) => items.length)
  );

  return Array.from({ length: maxCols }, (_, colIndex) =>
    Object.entries(itemsByClass).map(([_, items]) =>
      items[colIndex] ? getFullDetailByPartial(items[colIndex]) : undefined
    )
  );
}

function getFullDetailByPartial(
  partialDetail: Partial<ItemEquipmentDetail>
): ItemEquipmentDetail {
  return {
    ...EMPTY_DETAIL,
    ...partialDetail,
    item_total_option:
      partialDetail.item_total_option ??
      partialDetail.item_base_option ??
      EMPTY_OPTION,
  };
}
