import { Button, Flex } from "@chakra-ui/react";
import { useAppDispatch } from "../../../stores/hooks";
import { setBossItems } from "../../../stores/userSlice";
import { PREPARED_BOSS } from "../../../constants/preparedBoss";

export default function PreparedButtons({ selected }: { selected: number }) {
  const dispatch = useAppDispatch();

  if (selected < 0) return <></>;

  return (
    <Flex gap={2}>
      {PREPARED_BOSS.map((item, i) => (
        <Button
          key={`prepared-${i}`}
          size="xs"
          onClick={() =>
            dispatch(setBossItems({ index: selected, boss: item.boss }))
          }
        >
          {item.label}
        </Button>
      ))}
    </Flex>
  );
}
