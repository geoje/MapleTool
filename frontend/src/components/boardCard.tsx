import { Card, CardBody, Flex, Heading, Spacer } from "@chakra-ui/react";
import {
  TbSquareRoundedNumber0Filled,
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedNumber5Filled,
  TbSquareRoundedNumber6Filled,
  TbSquareRoundedNumber7Filled,
  TbSquareRoundedNumber8Filled,
  TbSquareRoundedNumber9Filled,
} from "react-icons/tb";

const ICON_SIZE = 20;
const NumberIcons = [
  <TbSquareRoundedNumber0Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber1Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber2Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber3Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber4Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber5Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber6Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber7Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber8Filled size={ICON_SIZE} />,
  <TbSquareRoundedNumber9Filled size={ICON_SIZE} />,
];

export default function BoardCard({
  order,
  title,
  right,
  children,
}: {
  order: number;
  title: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardBody>
        <Flex pb={6} gap={2}>
          {NumberIcons[order]}
          <Heading size="sm">{title}</Heading>
          <Spacer />
          {right}
        </Flex>
        {children}
      </CardBody>
    </Card>
  );
}
