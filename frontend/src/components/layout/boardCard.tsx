import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  useColorMode,
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

const NumberIcons = [
  <TbSquareRoundedNumber0Filled size={20} />,
  <TbSquareRoundedNumber1Filled size={20} />,
  <TbSquareRoundedNumber2Filled size={20} />,
  <TbSquareRoundedNumber3Filled size={20} />,
  <TbSquareRoundedNumber4Filled size={20} />,
  <TbSquareRoundedNumber5Filled size={20} />,
  <TbSquareRoundedNumber6Filled size={20} />,
  <TbSquareRoundedNumber7Filled size={20} />,
  <TbSquareRoundedNumber8Filled size={20} />,
  <TbSquareRoundedNumber9Filled size={20} />,
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
  const dark = useColorMode().colorMode == "dark";

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
      width={{ base: "100%", md: "auto" }}
      background={dark ? "gray.800" : "white"}
      borderRadius={{ md: "var(--card-radius)" }}
      boxShadow={{ base: "", md: "var(--card-shadow)" }}
    >
      <CardBody display={{ base: "none", md: "block" }}>{body}</CardBody>
      <Box display={{ base: "block", md: "none" }} p={4}>
        {body}
      </Box>
    </Card>
  );
}
