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
import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import GRINDSTONE from "../../../../assets/item/scroll/grindstone.png";
import MESO from "../../../../assets/item/meso/coin.png";
import { RxPlus, RxDoubleArrowRight } from "react-icons/rx";
import { FaPlus, FaMinus, FaPlusCircle } from "react-icons/fa";
import ItemSlot2 from "../common/itemSlot2";
import { useState } from "react";
import { GRINDSTONE_INFOS } from "../../../../constants/enhance/ring";
import { formatNumber } from "../../../../utils/formatter";
import { useSuccessToast, useWarningToast } from "../../../../hooks/useToast";
import { addMaterials, upgradeSpecialRing } from "../../../../stores/userSlice";

export default function GrindStone({
  inventoryIndex,
}: {
  inventoryIndex: number;
}) {
  const dark = useColorMode().colorMode == "dark";
  const palette600 = dark ? ".300" : ".600";
  const toastWarning = useWarningToast();
  const toastSuccess = useSuccessToast();

  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.user.inventory);
  const item = inventory[inventoryIndex].after;
  const [count, setCount] = useState(1);

  const onExecuteButtonClick = () => {
    dispatch(
      addMaterials({
        index: inventoryIndex,
        materials: [
          {
            name: "메소 - 생명의 연마석",
            value: GRINDSTONE_INFOS[count - 1].cost,
          },
          { name: "생명의 연마석", value: count },
        ],
      })
    );

    if (Math.random() < GRINDSTONE_INFOS[count - 1].probability) {
      dispatch(upgradeSpecialRing({ index: inventoryIndex }));
      toastSuccess({ title: "연마에 성공했습니다!" });
      return;
    }

    toastWarning({ title: "연마에 실패했습니다." });
  };

  if (item.special_ring_level != 4)
    return <RequiredText>4레벨 특수 스킬 반지를 선택해 주세요.</RequiredText>;

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
        <ItemSlot2 bgColorScheme="purple" spec={<Text>{count} / 5</Text>}>
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
        <IconButton
          aria-label="decrease"
          size="xs"
          icon={<FaMinus />}
          onClick={() => setCount(Math.max(1, count - 1))}
        />
        <IconButton
          aria-label="decrease"
          size="xs"
          icon={<FaPlus />}
          onClick={() => setCount(Math.min(GRINDSTONE_INFOS.length, count + 1))}
        />
        <Button size="xs" onClick={() => setCount(GRINDSTONE_INFOS.length)}>
          MAX
        </Button>
      </Flex>
      <Flex justify="center" py={2} gap={2}>
        <Tag fontSize={12}>
          <b>성공 확률</b>&nbsp;{" "}
          {Math.floor(GRINDSTONE_INFOS[count - 1].probability * 100)}%
        </Tag>
        <Tag>
          <Image src={MESO} pr={2} />
          <Text fontSize={12}>
            {formatNumber(GRINDSTONE_INFOS[count - 1].cost)}
          </Text>
        </Tag>
      </Flex>
      <Flex justify="center">
        <Button
          w={{ base: "100%", md: "auto" }}
          px={8}
          size="sm"
          colorScheme="blue"
          leftIcon={<FaPlusCircle />}
          onClick={onExecuteButtonClick}
        >
          강화
        </Button>
      </Flex>
    </Stack>
  );
}
