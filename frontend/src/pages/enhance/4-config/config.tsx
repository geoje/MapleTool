import { MATERIAL_TYPE } from "../../../constants/enhance/material";
import Guarantee from "./guarantee";
import RequiredText from "../../../components/content/requiredText";

export default function Config({
  materialType,
}: {
  materialType?: MATERIAL_TYPE;
}) {
  if (!materialType) return <RequiredText>재료를 선택해주세요.</RequiredText>;

  if (
    [
      MATERIAL_TYPE.POTENTIAL,
      MATERIAL_TYPE.POTENTIAL_ADDI,
      MATERIAL_TYPE.RED,
      MATERIAL_TYPE.BLACK,
      MATERIAL_TYPE.ADDI,
      MATERIAL_TYPE.WHITE_ADDI,
    ].includes(materialType)
  )
    return <Guarantee materialType={materialType} />;

  return <></>;
}
