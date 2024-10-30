import { Flex, Text } from "@chakra-ui/react";
import { MATERIAL_TYPE } from "../../../constants/enhance/material";
import Guarantee from "./guarantee";

export default function Config({
  materialType,
}: {
  materialType?: MATERIAL_TYPE;
}) {
  if (!materialType)
    return (
      <Flex justify="center" pt="1px">
        <Text size="md" opacity={0.6}>
          재료를 선택해주세요.
        </Text>
      </Flex>
    );

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
