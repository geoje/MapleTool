import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import {
  POTENTIAL_GRADE,
  POTENTIAL_INFOS,
} from "../../../../constants/enhance/potential";

export default function OptionsButton({
  title,
  grade,
  options,
  isDisabled,
  onClick,
}: {
  title: string;
  grade?: POTENTIAL_GRADE;
  options: string[];
  isDisabled: boolean;
  onClick?: () => void;
}) {
  const dark = useColorMode().colorMode == "dark";

  return (
    <Tooltip
      display={isDisabled ? "none" : undefined}
      fontSize="xs"
      label={options.map((option, i) => (
        <Text key={"option-" + i}>{option}</Text>
      ))}
    >
      <Button
        h="auto"
        p={1}
        flexDir="column"
        alignItems="stretch"
        textAlign="start"
        borderWidth={1}
        borderColor={grade ? POTENTIAL_INFOS[grade].borderColor : undefined}
        isDisabled={isDisabled}
        onClick={onClick}
      >
        <Flex justify="space-between" mb={1}>
          <Heading pl={1} fontSize={12}>
            {title}
          </Heading>
          <Badge
            px={1}
            variant="solid"
            colorScheme={isDisabled ? "gray" : "orange"}
            borderRadius={4}
          >
            선택
          </Badge>
        </Flex>
        <Stack
          pb={1}
          gap={0}
          borderRadius={4}
          backgroundColor={dark ? "gray.800" : "gray.300"}
        >
          <Flex
            h={4}
            mb={1}
            gap={1}
            justify="center"
            align="center"
            borderTopRadius={4}
            backgroundColor={dark ? "gray.700" : "gray.400"}
          >
            {grade && <Image src={POTENTIAL_INFOS[grade].icon} />}
            <Text fontSize={12}>{grade}</Text>
          </Flex>
          {[0, 1, 2].map((i) => (
            <OptionText key={"option-" + i} text={options[0]} />
          ))}
        </Stack>
      </Button>
    </Tooltip>
  );
}

function OptionText({ text }: { text: string }) {
  return (
    <Text h={4} px={2} fontSize={12} overflow="hidden" textOverflow="ellipsis">
      {text}
    </Text>
  );
}
