import {
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Stack,
  Tag,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import RequiredText from "../../../../components/content/requiredText";
import { useAppSelector } from "../../../../stores/hooks";
import GRINDSTONE from "../../../../assets/item/scroll/grindstone.png";
import MESO from "../../../../assets/item/meso/coin.png";
import { RxPlus, RxDoubleArrowRight } from "react-icons/rx";
import { FaPlus, FaMinus, FaPlusCircle } from "react-icons/fa";
import ItemSlot2 from "../common/itemSlot2";

export default function GrindStone({
  inventoryIndex,
}: {
  inventoryIndex: number;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);
  const item = inventory[inventoryIndex].after;

  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const palette600 = dark ? ".300" : ".600";

  if (!item.special_ring_level)
    return (
      <RequiredText>선택한 아이템은 특수 스킬 반지가 아닙니다.</RequiredText>
    );

  return (
    <Stack>
      <Tag as={Stack} px={4} py={2} gap={1}>
        <Text>
          사용할 <b>연마석 수량을 설정</b>해주세요.
        </Text>
        <Text>
          연마석 수량에 따라 연마 <b>성공 확률</b> 및 연마에 사용되는{" "}
          <b>메소</b>가 설정됩니다.
        </Text>
      </Tag>
      <Flex align="center" gap={2}>
        <ItemSlot2
          bgColorScheme="blue"
          spec={
            <Text>
              Lv.&nbsp;<b>4</b>
            </Text>
          }
        >
          <Image
            pb={1}
            src={item.item_icon}
            transform={{ base: undefined, sm: "scale(2)" }}
          />
        </ItemSlot2>
        <Icon
          as={RxPlus}
          boxSize={8}
          strokeWidth={2}
          color={"gray" + palette600}
        />
        <ItemSlot2 bgColorScheme="purple" spec={<Text>1 / 5</Text>}>
          <Image
            pb={2}
            src={GRINDSTONE}
            transform={{ base: undefined, sm: "scale(2)" }}
          />
        </ItemSlot2>
        <Icon
          as={RxDoubleArrowRight}
          boxSize={8}
          strokeWidth={2}
          color={"gray" + palette600}
        />
        <ItemSlot2
          bgColorScheme="blue"
          spec={
            <Text>
              Lv.&nbsp;<b>5</b>
            </Text>
          }
        >
          <Image
            pb={1}
            src={item.item_icon}
            transform={{ base: undefined, sm: "scale(2)" }}
          />
        </ItemSlot2>
      </Flex>
      <Flex justify="center" gap={1}>
        <IconButton aria-label="decrease" size="xs" icon={<FaMinus />} />
        <IconButton aria-label="decrease" size="xs" icon={<FaPlus />} />
        <Button size="xs">MAX</Button>
      </Flex>
      <Flex justify="center" py={2} gap={2}>
        <Tag fontSize={12}>
          <b>성공 확률</b>&nbsp; 10%
        </Tag>
        <Tag>
          <Image src={MESO} pr={2} />
          <Text fontSize={12}>500,000,000</Text>
        </Tag>
      </Flex>
      <Flex justify="center">
        <Button
          w={{ base: "100%", md: "auto" }}
          px={8}
          size="sm"
          colorScheme="blue"
          leftIcon={<FaPlusCircle />}
        >
          강화
        </Button>
      </Flex>
    </Stack>
  );
}
