import { Badge, Box, Collapse, Flex, Stack, Text } from "@chakra-ui/react";
import ItemToolTip from "../common/itemTooltip";
import { useAppSelector } from "../../../stores/hooks";

export default function Changes({
  inventoryIndex,
  showChanges,
}: {
  inventoryIndex: number;
  showChanges: boolean;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);

  if (inventoryIndex < 0 || inventoryIndex >= inventory.length) {
    return (
      <Collapse in={showChanges} startingHeight="1px">
        <Flex justify="center" pt="1px">
          <Text size="md" opacity={0.6}>
            장비를 선택해주세요.
          </Text>
        </Flex>
      </Collapse>
    );
  }

  return (
    <Collapse in={showChanges} startingHeight="1px">
      <Flex justify="center" wrap="wrap" pt="1px" gap={2}>
        <Stack>
          <Badge textAlign="center">강화 전</Badge>
          <Box borderRadius={4} bgColor="gray.900">
            <ItemToolTip item={inventory[inventoryIndex].before} />
          </Box>
        </Stack>
        <Stack>
          <Badge textAlign="center">강화 후</Badge>
          <Box borderRadius={4} bgColor="gray.900">
            <ItemToolTip item={inventory[inventoryIndex].before} />
          </Box>
        </Stack>
      </Flex>
    </Collapse>
  );
}
