import { Text } from "@chakra-ui/react";
import { MATERIAL_TYPE } from "../../../constants/enhance/material";
import { useAppSelector } from "../../../stores/hooks";

export default function Potential({
  inventoryIndex,
  materialType,
}: {
  inventoryIndex: number;
  materialType?: MATERIAL_TYPE;
}) {
  const guarantee = useAppSelector((state) => state.user.guarantee);

  return <Text>포텐셜 이지롱</Text>;
}
