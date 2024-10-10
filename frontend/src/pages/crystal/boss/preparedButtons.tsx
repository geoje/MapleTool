import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useAppDispatch } from "../../../stores/hooks";
import { setBossItems } from "../../../stores/userSlice";
import {
  LOTUS_DAMIEN,
  UNDER_BLACK_MAGE,
} from "../../../constants/preparedBoss";

export default function PreparedButtons({ selected }: { selected: number }) {
  const dispatch = useAppDispatch();

  if (selected < 0) return <></>;

  return (
    <Flex gap={1}>
      <Tooltip placement="top" label="스우 데미안 돌이">
        <Button
          size="xs"
          onClick={() =>
            dispatch(setBossItems({ index: selected, boss: LOTUS_DAMIEN }))
          }
        >
          스데
        </Button>
      </Tooltip>
      <Tooltip placement="top" label="검은 마법사 밑 솔격">
        <Button
          size="xs"
          onClick={() =>
            dispatch(setBossItems({ index: selected, boss: UNDER_BLACK_MAGE }))
          }
        >
          검밑솔
        </Button>
      </Tooltip>
    </Flex>
  );
}
