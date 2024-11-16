import { Badge, Box, Collapse, Flex, Stack } from "@chakra-ui/react";
import ItemToolTip from "../common/itemTooltip";
import { useAppSelector } from "../../../stores/hooks";
import RequiredText from "../../../components/content/requiredText";

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
      <Collapse in={showChanges} startingHeight="1px">
        <Flex justify="center" pt="1px">
          <RequiredText>장비를 선택해주세요.</RequiredText>
        </Flex>
      </Collapse>
    );
  }

  return (
    <Collapse in={showChanges} startingHeight="1px">
      <Flex justify="center" wrap="wrap" gap={2} pt="1px">
        <Stack w="min-content">
          <Badge textAlign="center">강화 전</Badge>
          <Box w={64} borderRadius={4} bgColor="gray.900">
            <ItemToolTip item={enhancedItem.before} />
          </Box>
        </Stack>
        <Stack>
          <Badge textAlign="center">강화 후</Badge>
          <Box w={64} borderRadius={4} bgColor="gray.900">
            <ItemToolTip item={enhancedItem.after} />
          </Box>
        </Stack>
      </Flex>
    </Collapse>
  );
}
