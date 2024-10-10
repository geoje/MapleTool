import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
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
  order?: number;
  title?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const bgColor = useColorModeValue("white", "gray.800");

  const body = (
    <>
      {title && order && (
        <Flex pb={5} gap={2}>
          {NumberIcons[order ?? 0]}
          <Heading size="sm" mr="auto">
            {title}
          </Heading>
          {right}
        </Flex>
      )}
      {children}
    </>
  );

  return (
    <Card
      width={["100%", "100%", "auto"]}
      background={bgColor}
      borderRadius={[0, 0, "var(--card-radius)"]}
      boxShadow={["", "", "var(--card-shadow)"]}
    >
      <CardBody display={["none", "none", "block"]}>{body}</CardBody>
      <Box display={["block", "block", "none"]} p={4}>
        {body}
      </Box>
    </Card>
  );
}
