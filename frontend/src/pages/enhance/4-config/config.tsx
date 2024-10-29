import { Flex, Text } from "@chakra-ui/react";
import { MATERIAL_TYPE } from "../../../constants/enhance/material";

export default function Config({
  materialType,
}: {
  materialType?: MATERIAL_TYPE;
}) {
  if (!materialType) {
    return (
      <Flex justify="center" pt="1px">
        <Text size="md" opacity={0.6}>
          재료를 선택해주세요.
        </Text>
      </Flex>
    );
  }

  return <></>;
}
