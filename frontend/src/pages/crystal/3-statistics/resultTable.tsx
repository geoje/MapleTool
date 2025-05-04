import {
  Badge,
  Checkbox,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { calculateRevenue } from "../../../services/boss";
import { MAX_BOSS_SELECTABLE } from "../../../constants/boss";
import { formatNumber } from "../../../utils/formatter";
import BossPlan from "../../../types/user/bossPlan";
import RequiredText from "../../../components/content/requiredText";

export default function ResultTable({ bossPlans }: { bossPlans: BossPlan[] }) {
  const [excludes, setExcludes] = useState(new Set<number>());

  const revenues = bossPlans.map(calculateRevenue);
  const totalCount = bossPlans
    .map((plan) => plan.boss.length)
    .filter((_, i) => !excludes.has(i))
    .reduce((acc, cur) => acc + cur, 0);
  const totalRevenue = revenues
    .filter((_, i) => !excludes.has(i))
    .reduce((acc, cur) => acc + cur, 0);

  if (!bossPlans.length) {
    return <RequiredText>캐릭터를 등록해주세요.</RequiredText>;
  }

  return (
    <SimpleGrid>
      {bossPlans.map((plan, i) => (
        <Fragment key={"result-" + i}>
          <Flex
            align="center"
            opacity={excludes.has(i) ? 0.4 : 1}
            gap={2}
            py={1}
            borderBottomWidth={1}
          >
            <Checkbox
              fontWeight="bold"
              isChecked={!excludes.has(i)}
              onChange={(event) => {
                const temp = new Set(excludes);
                if (event.target.checked) temp.delete(i);
                else temp.add(i);

                setExcludes(temp);
              }}
            >
              {plan.name}
            </Checkbox>
            <Badge
              colorScheme={
                plan.boss.length == MAX_BOSS_SELECTABLE ? "blue" : undefined
              }
            >
              {plan.boss.length}
            </Badge>
          </Flex>
          <Flex
            justify="end"
            align="center"
            opacity={excludes.has(i) ? 0.4 : 1}
            pl={2}
            py={1}
            borderBottomWidth={1}
          >
            <Text>{formatNumber(revenues[i])}</Text>
          </Flex>
        </Fragment>
      ))}
      <GridItem
        as={Flex}
        justify="space-between"
        align="center"
        colSpan={2}
        gap={2}
        pt={2}
      >
        <Badge
          colorScheme={
            totalCount ==
            MAX_BOSS_SELECTABLE *
              revenues.filter((_, i) => !excludes.has(i)).length
              ? "blue"
              : undefined
          }
        >
          {totalCount}
        </Badge>
        <Text fontWeight="bold">{formatNumber(totalRevenue)}</Text>
      </GridItem>
    </SimpleGrid>
  );
}
