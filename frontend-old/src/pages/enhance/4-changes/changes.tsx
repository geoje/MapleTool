import { Badge, Box, Collapse, Flex, Stack } from "@chakra-ui/react";
import ItemToolTip from "../common/itemTooltip";
import { useAppSelector } from "../../../stores/hooks";
import RequiredText from "../../../components/content/requiredText";
import { ItemEquipmentDetail } from "../../../types/character/itemEquipment/itemEquipment";

export default function Changes({
  inventoryIndex,
  showChanges,
}: {
  inventoryIndex: number;
  showChanges: boolean;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);
  const enhancedItem = inventory[inventoryIndex];

  if (inventoryIndex < 0 || inventoryIndex >= inventory.length) {
    return (
      <Collapse in={showChanges}>
        <Flex justify="center" pt="1px">
          <RequiredText>장비를 선택해주세요.</RequiredText>
        </Flex>
      </Collapse>
    );
  }

  if (!showChanges) return <></>;

  return (
    <Flex justify="center" wrap="nowrap" gap={2} pt="1px">
      <Stack>
        <Badge textAlign="center">강화 전</Badge>
        <BoxedItemToolTip item={enhancedItem.before} />
      </Stack>
      <Stack>
        <Badge textAlign="center">강화 후</Badge>
        <BoxedItemToolTip item={enhancedItem.after} />
      </Stack>
    </Flex>
  );
}

function BoxedItemToolTip({ item }: { item: ItemEquipmentDetail }) {
  return (
    <Box
      w={{ base: "auto", md: 64 }}
      maxW={64}
      borderRadius={4}
      bgColor="gray.900"
    >
      <ItemToolTip item={item} />
    </Box>
  );
}
