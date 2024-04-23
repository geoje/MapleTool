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
  BORDER_COLOR,
  KOR_NAME,
} from "../../../service/character/itemEquipment/potentialConst";
import PotentialService from "../../../service/character/itemEquipment/potential";

export default function OptionsButton({
  title,
  grade,
  options,
  isDisabled,
  onClick,
}: {
  title: string;
  grade: string;
  options: string[];
  isDisabled: boolean;
  onClick: () => void;
}) {
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const potentialIndex = KOR_NAME.indexOf(grade);

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
        borderColor={
          potentialIndex == -1 ? undefined : BORDER_COLOR[potentialIndex]
        }
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
            {potentialIndex != -1 && (
              <Image
                src={PotentialService.getPotentialIconUrl(potentialIndex)}
                style={{ imageRendering: "pixelated" }}
              />
            )}
            <Text fontSize={12}>{grade}</Text>
          </Flex>
          <OptionText text={options[0]} />
          <OptionText text={options[1]} />
          <OptionText text={options[2]} />
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
