import {
  Badge,
  Checkbox,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useAppSelector } from "../../../reducer/hooks";
import { Fragment } from "react/jsx-runtime";
import CrystalService from "../../../service/user/crystal/crystal";
import { useState } from "react";
import { BOSS_MAXIMUN_SELECTABLE } from "../../../service/user/crystal/bossConstants";

export default function ResultTable() {
  const bossPlan = useAppSelector((state) => state.user.bossPlan);
  const [excludes, setExcludes] = useState(new Set<number>());

  const revenues = bossPlan.map(CrystalService.calculateRevenue);
  const total = revenues
    .filter((_, i) => !excludes.has(i))
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <SimpleGrid>
      {bossPlan.map((plan, i) => (
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
                plan.boss.length == BOSS_MAXIMUN_SELECTABLE ? "blue" : undefined
              }
            >
              {plan.boss.length}
            </Badge>
          </Flex>
          <Flex
            justify="end"
            align="center"
            opacity={excludes.has(i) ? 0.4 : 1}
            py={1}
            borderBottomWidth={1}
          >
            <Text>{numberToKorean(revenues[i])}</Text>
          </Flex>
        </Fragment>
      ))}
      <GridItem
        as={Flex}
        justify="space-between"
        align="center"
        colSpan={2}
        pt={2}
      >
        <Image
          src="/item-equipment/meso.png"
          style={{ imageRendering: "pixelated" }}
        />
        <Text fontWeight="bold">{numberToKorean(total)}</Text>
      </GridItem>
    </SimpleGrid>
  );
}

function numberToKorean(num: number): string {
  if (num === 0) return "0";

  const units = ["억", "만", ""];
  const parts = [];

  parts.push(Math.floor(num / 100000000));
  num %= 100000000;

  parts.push(Math.floor(num / 10000));
  num %= 10000;

  parts.push(num);

  const result = parts
    .map((part, index) => {
      if (part === 0) return "";
      return `${part}${units[index]}`;
    })
    .filter((part) => part !== "")
    .join(" ");

  return result;
}
