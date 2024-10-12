import { Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../../stores/hooks";
import DefaultTable from "./defaultTable";
import OrderButton from "./orderButton";
import OrderTable from "./orderTable";

export default function Boss({ selected }: { selected: number }) {
  const bossPlans = useAppSelector((state) => state.user.bossPlans);
  const bossPlan =
    selected >= 0 && selected < bossPlans.length ? bossPlans[selected] : null;

  if (!bossPlan) {
    return (
      <Flex justify="center">
        <Text size="md" opacity={0.6}>
          캐릭터를 선택해주세요.
        </Text>
      </Flex>
    );
  }

  return (
    <SimpleGrid gridTemplateColumns="max-content 1fr max-content max-content">
      <HeadButton>보스</HeadButton>
      <HeadButton>난이도</HeadButton>
      <HeadButton>파티원</HeadButton>
      <OrderButton selected={selected} />
      {bossPlan.order && bossPlan.order.startsWith("price") ? (
        <OrderTable
          selected={selected}
          descending={bossPlan.order.includes("desc")}
        />
      ) : (
        <DefaultTable selected={selected} />
      )}
    </SimpleGrid>
  );
}

function HeadButton({ children }: { children?: React.ReactNode }) {
  return (
    <Button size="sm" variant="none" justifyContent="flex-start" cursor="auto">
      {children}
    </Button>
  );
}
