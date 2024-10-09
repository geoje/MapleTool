import {
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
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
  const { colorMode } = useColorMode();
  const dark = colorMode === "dark";
  const palette50 = dark ? ".900" : ".50";
  const palette100 = dark ? ".800" : ".100";
  const palette200 = dark ? ".700" : ".200";
  const palette500 = dark ? ".400" : ".500";

  const isMaxLevel = level == MAX_CRYSTAL_LEVEL;
  const colorScheme = isMaxLevel ? "purple" : "blue";

  return (
    <Stack p={[2, 2, 4]} borderRadius={8} bgColor={colorScheme + palette50}>
      <Flex justify="center" pt={2} gap={1}>
        {new Array(level).fill(0).map((_, i) => (
          <Text key={"diamond-" + i} color={colorScheme + palette500}>
            <FaDiamond size={12} />
          </Text>
        ))}
      </Flex>
      <Flex justify="center">
        <Image src={icon} />
      </Flex>
      {effects.map((effect, i) => (
        <Button
          key={"effect-" + i}
          size="xs"
          backgroundColor={
            effect &&
            colorScheme + (hoverEffect == effect ? palette200 : palette100)
          }
          _hover={{ backgroundColor: colorScheme + palette200 }}
          onMouseEnter={() => setHoverEffect(effect)}
          onMouseLeave={() => setHoverEffect("")}
        >
          {effect}
        </Button>
      ))}
    </Stack>
  );
}
