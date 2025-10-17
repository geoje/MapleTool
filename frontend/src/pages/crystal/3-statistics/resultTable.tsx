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
import {
  MAX_BOSS_SELECTABLE,
  SHOW_BOSS_COMPARISON,
} from "../../../constants/boss";
import { formatNumber } from "../../../utils/formatter";
import BossPlan from "../../../types/user/bossPlan";
import RequiredText from "../../../components/content/requiredText";

export default function ResultTable({ bossPlans }: { bossPlans: BossPlan[] }) {
  const [excludes, setExcludes] = useState(new Set<number>());

  const revenues = bossPlans.map((p) => calculateRevenue(p));
  const prevRevenues = bossPlans.map((p) => calculateRevenue(p, true));
  const totalCount = bossPlans
    .map((plan) => plan.boss.length)
    .filter((_, i) => !excludes.has(i))
    .reduce((acc, cur) => acc + cur, 0);
  const totalRevenue = revenues
    .filter((_, i) => !excludes.has(i))
    .reduce((acc, cur) => acc + cur, 0);
  const totalPrevRevenue = prevRevenues
    .filter((_, i) => !excludes.has(i))
    .reduce((acc, cur) => acc + cur, 0);

  if (!bossPlans.length) {
    return <RequiredText>캐릭터를 등록해주세요.</RequiredText>;
  }

  return (
    <SimpleGrid columns={SHOW_BOSS_COMPARISON ? 3 : undefined}>
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
          {SHOW_BOSS_COMPARISON && (
            <Flex
              justify="end"
              align="center"
              opacity={excludes.has(i) ? 0.4 : 1}
              pl={2}
              py={1}
              borderBottomWidth={1}
            >
              <Text
                color={
                  revenues[i] == prevRevenues[i]
                    ? undefined
                    : revenues[i] - prevRevenues[i] > 0
                    ? "red.500"
                    : "blue.500"
                }
              >
                ({formatNumber(revenues[i] - prevRevenues[i])})
              </Text>
            </Flex>
          )}
        </Fragment>
      ))}
      <GridItem
        as={Flex}
        justify="space-between"
        align="center"
        colSpan={SHOW_BOSS_COMPARISON ? undefined : 2}
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
        {SHOW_BOSS_COMPARISON || (
          <Text fontWeight="bold">{formatNumber(totalRevenue)}</Text>
        )}
      </GridItem>
      {SHOW_BOSS_COMPARISON && (
        <>
          <Flex justify="end" align="center" pl={2} py={1}>
            <Text fontWeight="bold">{formatNumber(totalRevenue)}</Text>
          </Flex>
          <Flex justify="end" align="center" pl={2} py={1}>
            <Text
              fontWeight="bold"
              color={
                totalRevenue == totalPrevRevenue
                  ? undefined
                  : totalRevenue - totalPrevRevenue > 0
                  ? "red.500"
                  : "blue.500"
              }
            >
              ({formatNumber(totalRevenue - totalPrevRevenue)})
            </Text>
          </Flex>
        </>
      )}
    </SimpleGrid>
  );
}
