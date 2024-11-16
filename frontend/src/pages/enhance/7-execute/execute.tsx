import RequiredText from "../../../components/content/requiredText";
import { MATERIAL_TYPE } from "../../../constants/enhance/material";
import GrindStone from "./grindStone/grindStone";
import Potential from "./potential/potential";
import Rebirth from "./rebirth/rebirth";

export default function Execute({
  inventoryIndex,
  materialType,
}: {
  inventoryIndex: number;
  materialType?: MATERIAL_TYPE;
}) {
  if (inventoryIndex == -1 || !materialType) {
    const message =
      (inventoryIndex == -1 ? "장비" : "") +
      (inventoryIndex == -1 && !materialType ? "와 " : "") +
      (!materialType ? "재료" : "") +
      "를 선택해주세요.";

    return <RequiredText>{message}</RequiredText>;
  }

  if (
    [
      MATERIAL_TYPE.POWERFUL,
      MATERIAL_TYPE.ETERNAL,
      MATERIAL_TYPE.BLACK_REBIRTH,
      MATERIAL_TYPE.ABYSS,
    ].includes(materialType)
  )
    return (
      <Rebirth inventoryIndex={inventoryIndex} materialType={materialType} />
    );

  if (materialType == MATERIAL_TYPE.GRINDSTONE)
    return <GrindStone inventoryIndex={inventoryIndex} />;

  if (
    [
      MATERIAL_TYPE.STRANGE,
      MATERIAL_TYPE.MASTER,
      MATERIAL_TYPE.ARTISAN,
      MATERIAL_TYPE.RED,
      MATERIAL_TYPE.BLACK,
      MATERIAL_TYPE.STRANGE_ADDI,
      MATERIAL_TYPE.ADDI,
      MATERIAL_TYPE.WHITE_ADDI,
      MATERIAL_TYPE.POTENTIAL,
      MATERIAL_TYPE.POTENTIAL_ADDI,
    ].includes(materialType)
  )
    return (
      <Potential inventoryIndex={inventoryIndex} materialType={materialType} />
    );

  return <RequiredText>개발중인 기능입니다.</RequiredText>;
}
