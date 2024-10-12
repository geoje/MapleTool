import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useAppDispatch } from "../../../stores/hooks";
import { setBossItems } from "../../../stores/userSlice";
import {
  EASY_LUCID_WILL,
  GUARDIAN_ANGEL_SLIME,
  LOTUS_DAMIEN,
  UNDER_BLACK_MAGE,
} from "../../../constants/preparedBoss";

const items = [
  { label: "스우 데미안 돌이", abbreviate: "스데", boss: LOTUS_DAMIEN },
  { label: "가엔슬 돌이", abbreviate: "가엔슬", boss: GUARDIAN_ANGEL_SLIME },
  { label: "이지 루시드 윌 돌이", abbreviate: "이루윌", boss: EASY_LUCID_WILL },
  {
    label: "검은 마법사 밑 솔격",
    abbreviate: "검밑솔",
    boss: UNDER_BLACK_MAGE,
  },
];

export default function PreparedButtons({ selected }: { selected: number }) {
  const dispatch = useAppDispatch();

  if (selected < 0) return <></>;

  return (
    <Flex gap={2}>
      {items.map((item, i) => (
        <Tooltip key={"item-" + i} placement="top" label={item.label}>
          <Button
            size="xs"
            onClick={() =>
              dispatch(setBossItems({ index: selected, boss: item.boss }))
            }
          >
            {item.abbreviate}
          </Button>
        </Tooltip>
      ))}
    </Flex>
  );
}
