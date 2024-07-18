import { Flex, GridItem, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../../reducer/hooks";
import { Fragment } from "react/jsx-runtime";
import CrystalService from "../../../service/user/crystal/crystal";

export default function ResultTable() {
  const bossPlan = useAppSelector((state) => state.user.bossPlan);

  const revenues = bossPlan.map(CrystalService.calculateRevenue);
  const total = revenues.reduce((acc, cur) => acc + cur, 0);

  return (
    <SimpleGrid gridTemplateColumns="1fr 1fr">
      {bossPlan.map((plan, i) => (
        <Fragment key={"result-" + i}>
          <Flex align="center" py={1} borderBottomWidth={1}>
            <Text fontWeight="bold">{plan.name}</Text>
          </Flex>
          <Flex justify="end" align="center" py={1} borderBottomWidth={1}>
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
