import { useState } from "react";
import { EFFECT_INFOS } from "@/constants/artifact";
import { crystalEffectIndexes, crystals, getArtifactIcon } from "@/lib/artifact-service";
import { Crystal } from "@/pages/union-artifact/crystal";

export function ResultGrid({
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
  const effectNamesByButton = crystalEffectIndexes(artifactLevel, effectIndex).map((indexes) =>
    indexes.map((oneAddedEffectNameIndex) => {
      const fullEffectName = effectNames[oneAddedEffectNameIndex - 1];
      return EFFECT_INFOS.find((effectInfo) => effectInfo.full == fullEffectName)?.abbreviate ?? "";
    })
  );

  return (
    <div className="grid grid-cols-3 gap-4">
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
    </div>
  );
}
