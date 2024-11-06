import {
  Badge,
  Box,
  Collapse,
  Flex,
  Image,
  Stack,
  Tag,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import ItemToolTip from "../common/itemTooltip";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import RequiredText from "../../../components/content/requiredText";
import { getMaterialIcon } from "../../../utils/icon";
import { AnimatedCounter } from "react-animated-counter";
import DeleteButton from "../../../components/action/deleteButton";
import { deleteMaterial } from "../../../stores/userSlice";

export default function Changes({
  inventoryIndex,
  showChanges,
}: {
  inventoryIndex: number;
  showChanges: boolean;
}) {
  const dispatch = useAppDispatch();

  const dark = useColorMode().colorMode == "dark";
  const inventory = useAppSelector((state) => state.user.inventory);
  const enhancedItem = inventory[inventoryIndex];

  const color = dark ? "white" : "black";

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
      <Flex
        pt={4}
        gap={2}
        justify={{ base: "center", md: "start" }}
        wrap="wrap"
      >
        {enhancedItem.used.map(({ name, value }) => (
          <Tooltip key={"material-" + name} label={name}>
            <Tag position="relative" pt={2} pb={1}>
              <Stack>
                <Flex h={8} justify="center" align="center">
                  <Image src={getMaterialIcon(name)} />
                </Flex>
                <AnimatedCounter
                  includeDecimals={false}
                  includeCommas
                  fontSize="12px"
                  decrementColor={color}
                  incrementColor={color}
                  color={color}
                  value={value}
                  containerStyles={{ paddingBottom: "1px" }}
                />
              </Stack>
              <DeleteButton
                onClick={() =>
                  dispatch(deleteMaterial({ index: inventoryIndex, name }))
                }
              />
            </Tag>
          </Tooltip>
        ))}
      </Flex>
    </Collapse>
  );
}
