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
  MAX_POTENTIALS,
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
      placement="top"
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
        cursor={onClick ? undefined : "default"}
        onClick={onClick}
      >
        <Flex justify="space-between" mb={1}>
          <Heading pl={1} fontSize={12}>
            {title}
          </Heading>
          {onClick && (
            <Badge
              px={1}
              variant="solid"
              colorScheme={isDisabled ? "gray" : "orange"}
              borderRadius={4}
            >
              선택
            </Badge>
          )}
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
            <Text fontSize={12}>{grade && POTENTIAL_INFOS[grade].name}</Text>
          </Flex>
          {new Array(MAX_POTENTIALS).fill(0).map((_, i) => (
            <OptionText key={"option-" + i} text={options[i]} />
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
