import { Flex, Image, Stack, Tag, Text, useColorMode } from "@chakra-ui/react";
import {
  MATERIAL_INFOS,
  MATERIAL_TYPE,
} from "../../../../constants/enhance/material";
import { useAppSelector } from "../../../../stores/hooks";
import ItemSlot from "../common/itemSlot";
import OptionsButton from "../common/optionButton";
import { MAX_REBIRTHS } from "../../../../constants/enhance/rebirth";
import { isSelectable } from "../../../../services/enhance/rebirth";

export default function Rebirth({
  inventoryIndex,
  materialType,
}: {
  inventoryIndex: number;
  materialType: MATERIAL_TYPE;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);

  const item = inventory[inventoryIndex].after;
  const selectable = isSelectable(materialType);

  return (
    <Stack width={{ base: "100%", md: 60 }}>
      <Tag as={Flex} px={2} py={1} gap={2}>
        <Image src={MATERIAL_INFOS[materialType].icon} />
        <Text size="xs">
          아이템의 <b>추가옵션을</b> 재설정합니다.
        </Text>
      </Tag>
      <ItemSlot image={item?.item_icon} />
      <OptionsButton
        title={selectable ? "BEFORE" : "RESULT"}
        options={[
          "STR: +30",
          "DEX: +30",
          "INT: +25",
          "LUK: +25",
          "공격력: +5",
          "올스탯: +6%",
        ]}
        maxOptionCount={MAX_REBIRTHS}
        onClick={selectable ? () => {} : undefined}
      />
      {selectable && (
        <OptionsButton
          title="AFTER"
          options={["STR: +30", "DEX: +25", "LUK: +109", "올스탯: +6%"]}
          maxOptionCount={MAX_REBIRTHS}
          onClick={() => {}}
        />
      )}
    </Stack>
  );
}
