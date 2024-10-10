import { Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  LiaSortSolid,
  LiaSortUpSolid,
  LiaSortDownSolid,
} from "react-icons/lia";
import ContentsDefault from "./contentsDefault";
import ContentOrder from "./contentOrder";

export default function Boss({ selected }: { selected: number }) {
  const dispatch = useAppDispatch();
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const bossPlan =
    selected >= 0 && selected < bossPlans.length ? bossPlans[selected] : null;

  if (!bossPlan) {
    return <></>;
  }

  return (
    <SimpleGrid gridTemplateColumns="max-content 1fr max-content max-content">
      <Heading size="xs" pb={2}>
        보스
      </Heading>
      <Heading size="xs" pb={2}>
        난이도
      </Heading>
      <Heading size="xs" pb={2}>
        인원 수
      </Heading>
      <Button
        rightIcon={
          bossPlan.order == "price-asc" ? (
            <LiaSortUpSolid />
          ) : bossPlan.order == "price-desc" ? (
            <LiaSortDownSolid />
          ) : (
            <LiaSortSolid />
          )
        }
      >
        가격
      </Button>
      {bossPlan.order && bossPlan.order.startsWith("price") ? (
        <ContentOrder descending={bossPlan.order.includes("desc")} />
      ) : (
        <ContentsDefault />
      )}
    </SimpleGrid>
  );
}
