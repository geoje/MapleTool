import {
  Flex,
  Image,
  Stack,
  Tag,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { AnimatedCounter } from "react-animated-counter";
import DeleteButton from "../../../components/action/deleteButton";
import { getMaterialIcon } from "../../../utils/icon";
import { deleteMaterial } from "../../../stores/userSlice";
import RequiredText from "../../../components/content/requiredText";

export default function UsedMaterial({
  inventoryIndex,
}: {
  inventoryIndex: number;
}) {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.user.inventory);
  const enhancedItem = inventory[inventoryIndex];

  const dark = useColorMode().colorMode == "dark";
  const color = dark ? "white" : "black";

  if (inventoryIndex < 0 || inventoryIndex >= inventory.length) {
    return (
      <Flex justify="center" pt="1px">
        <RequiredText>장비를 선택해주세요.</RequiredText>
      </Flex>
    );
  }

  if (!enhancedItem.used.length) {
    return (
      <Flex justify="center" pt="1px">
        <RequiredText>사용한 재료가 없습니다.</RequiredText>
      </Flex>
    );
  }

  return (
    <Flex pt={4} gap={2} justify={{ base: "center", md: "start" }} wrap="wrap">
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
  );
}
