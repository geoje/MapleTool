import { SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { EFFECT_NAMES } from "../../../constants/artifact";
import { crystalEffectIndexes, crystals } from "../../../utils/artifact";
import { getArtifactIcon } from "../../../utils/icon";
import Crystal from "./crystal";

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
