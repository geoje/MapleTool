import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Stack,
  Tag,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import ItemSlot2 from "../common/itemSlot2";
import { useAppSelector } from "../../../../stores/hooks";
import { FaAngleRight, FaPlusCircle } from "react-icons/fa";
import MESO from "../../../../assets/item/meso/coin.png";
import { formatNumber } from "../../../../utils/formatter";

export default function Startforce({
  inventoryIndex,
}: {
  inventoryIndex: number;
}) {
  const inventory = useAppSelector((state) => state.user.inventory);
  const item = inventory[inventoryIndex].after;

  const dark = useColorMode().colorMode == "dark";
  const paletteGray50 = dark ? "gray.900" : "gray.50";

  return (
    <Stack>
      <Tag px={2} py={1} justifyContent="center">
        <Text>
          <b>메소</b>를 사용하여 장비를 강화합니다.
        </Text>
      </Tag>
      <Flex h="min-content" gap={2}>
        <ItemSlot2 bgColorScheme="blue" w={{ base: 16, sm: 32 }}>
          <Image
            src={item.item_icon}
            transform={{ base: undefined, sm: "scale(2)" }}
          />
        </ItemSlot2>
        <Box
          w={{ base: "auto", md: 64 }}
          flex={{ base: 1, md: undefined }}
          maxHeight={32}
          borderLeftRadius="var(--chakra-radii-md)"
          overflowY="auto"
        >
          <Box
            p={2}
            as={Stack}
            gap={0}
            bgColor={paletteGray50}
            fontSize={12}
            fontWeight="bold"
            alignItems="start"
            borderRightRadius={0}
          >
            <Flex h="min-content" gap={1} align="center">
              <Text>0성</Text>
              <FaAngleRight size={16} />
              <Text>1성</Text>
            </Flex>
            <Text>성공확률: 95.0%</Text>
            <Text>실패(유지)확률: 5.0%</Text>
            <Text>&nbsp;</Text>
            <Text wordBreak="break-all">
              STR: +2222222222222222222222222222222222
            </Text>
            <Text>DEX: +2</Text>
            <Text>INT: +2</Text>
            <Text>LUK: +2</Text>
          </Box>
        </Box>
      </Flex>
      <Flex gap={2}>
        <Button
          px={4}
          flex={1}
          size="xs"
          justifyContent="space-between"
          rightIcon={<Checkbox />}
        >
          스타캐치 해제
        </Button>
        <Button
          px={4}
          flex={1}
          isDisabled
          size="xs"
          justifyContent="space-between"
          rightIcon={<Checkbox />}
        >
          파괴방지
        </Button>
      </Flex>
      <Flex
        px={2}
        gap={2}
        align="center"
        bgColor={paletteGray50}
        fontSize={12}
        borderRadius={8}
      >
        <Image src={MESO} />
        <Text fontWeight="bold">필요한 메소 :</Text>
        <Text mx="auto">{formatNumber(21500)}</Text>
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
