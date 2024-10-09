import {
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaDiamond } from "react-icons/fa6";
import { useState } from "react";
import { EFFECT_NAMES, MAX_CRYSTAL_LEVEL } from "../../../constants/artifact";
import { crystalEffectIndexes, crystals } from "../../../utils/artifact";
import { getArtifactIcon } from "../../../utils/icon";

export default function ResultGrid({
  artifactLevel,
  effectIndex,
  effectNames,
}: {
  artifactLevel: number;
  effectIndex: number;
  effectNames: string[];
}) {
  const [hoverEffect, setHoverEffect] = useState("");

  const levels = crystals(artifactLevel).map((crystal) => crystal.level);
  const effectNamesByButton: string[][] = crystalEffectIndexes(
    artifactLevel,
    effectIndex
  ).map((indexes) =>
    indexes.map((oneAddedEffectNameIndex) => {
      const fullEffectName = effectNames[oneAddedEffectNameIndex - 1];
      return (
        EFFECT_NAMES.find((effectName) => effectName.full == fullEffectName)
          ?.abbreviate ?? ""
      );
    })
  );

  return (
    <SimpleGrid columns={3} gap={3}>
      {levels.map((level, i) => (
        <Crystal
          key={"crystal-" + i}
          level={level}
          effects={effectNamesByButton[i] ?? ["", "", ""]}
          icon={getArtifactIcon(i, level)}
          hoverEffect={hoverEffect}
          setHoverEffect={setHoverEffect}
        />
      ))}
    </SimpleGrid>
  );
}

function Crystal({
  level,
  effects,
  icon,
  hoverEffect,
  setHoverEffect,
}: {
  level: number;
  effects: string[];
  icon: string;
  hoverEffect: string;
  setHoverEffect: (value: string) => void;
}) {
  const levelIconSize = useBreakpointValue({ base: 12, md: 16 });
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";

  const buttonBackgroundColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const buttonHoverBackgroundColor = useColorModeValue(
    "gray.300",
    "whiteAlpha.400"
  );

  return (
    <Stack
      p={[2, 2, 4]}
      borderRadius={8}
      bgColor={dark ? "gray.800" : "gray.50"}
      justify="end"
    >
      <Flex justify="center" pt={2} gap={1}>
        {new Array(level).fill(0).map((_, i) => (
          <Text
            key={"diamond-" + i}
            color={
              dark
                ? level < MAX_CRYSTAL_LEVEL
                  ? "blue.400"
                  : "purple.400"
                : level < MAX_CRYSTAL_LEVEL
                ? "blue.600"
                : "purple.600"
            }
          >
            <FaDiamond size={levelIconSize} />
          </Text>
        ))}
      </Flex>
      <Flex justify="center">
        <Image
          src={icon}
          filter={
            level
              ? level < MAX_CRYSTAL_LEVEL
                ? undefined
                : "hue-rotate(50deg)"
              : "grayscale(1)"
          }
        />
      </Flex>
      {effects.map((effect, i) => (
        <Button
          key={"effect-" + i}
          size="xs"
          backgroundColor={
            effect &&
            (hoverEffect == effect
              ? buttonHoverBackgroundColor
              : buttonBackgroundColor)
          }
          _hover={{ backgroundColor: buttonHoverBackgroundColor }}
          onMouseEnter={() => setHoverEffect(effect)}
          onMouseLeave={() => setHoverEffect("")}
        >
          {effect}
        </Button>
      ))}
    </Stack>
  );
}
