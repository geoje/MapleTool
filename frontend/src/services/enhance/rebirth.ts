import { MATERIAL_TYPE } from "../../constants/enhance/material";

export function isSelectable(materialType: MATERIAL_TYPE) {
  return [MATERIAL_TYPE.BLACK_REBIRTH, MATERIAL_TYPE.ABYSS].includes(
    materialType
  );
}
