import { Flex, Stack } from "@chakra-ui/react";
import ArtifactService from "../../service/union/artifact/artifact";
import { useEffect, useState } from "react";
import ArtifactLevel from "./artifactLevel";
import EffectLevel from "./effectLevel";
import SelectEffect from "./selectEffect";
import { EFFECT_NAMES } from "../../service/union/artifact/artifactConstants";
import ResultGrid from "./result";

export default function Artifact() {
  const [artifactLevel, setArtifactLevel] = useState(1);
  const [effectIndex, setEffectIndex] = useState(0);
  const [effectLevels, setEffectLevels] = useState<number[]>([]);
  const [effectNames, setEffectNames] = useState<string[]>([]);

  useEffect(() => {
    const initEffectLevels =
      ArtifactService.generateEffectLevels(artifactLevel)[0];
    setEffectIndex(0);
    setEffectLevels(initEffectLevels);

    const unusedEffectNames = EFFECT_NAMES.filter(
      (name) => !effectNames.some((existName) => existName == name)
    );
    const newEffectNames = [...effectNames, ...unusedEffectNames].slice(
      0,
      initEffectLevels.length
    );
    setEffectNames(newEffectNames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artifactLevel]);

  return (
    <Flex p={4} gap={4} wrap="wrap">
      <Stack width={["100%", "100%", "auto"]}>
        <ArtifactLevel onChange={(value) => setArtifactLevel(value)} />
        <EffectLevel
          artifactLevel={artifactLevel}
          effectIndex={effectIndex}
          onChange={(index, newEffectLevels) => {
            setEffectIndex(index);
            setEffectLevels(newEffectLevels);
          }}
        />
        <SelectEffect
          effectLevels={effectLevels}
          currentEffectNames={effectNames}
          onChange={(effectName, index) => {
            const temp = [...effectNames];
            temp[index] = effectName;
            setEffectNames(temp);
          }}
        />
      </Stack>
      <Stack>
        <ResultGrid
          levels={ArtifactService.getCrystals(artifactLevel).map(
            (crystal) => crystal.level
          )}
          effectNames={ArtifactService.getCrystals(artifactLevel).map(
            (crystal) =>
              crystal.effects[effectIndex].map(
                (oneAddedEffectNameIndex) =>
                  effectNames[oneAddedEffectNameIndex - 1]
              )
          )}
        />
      </Stack>
    </Flex>
  );
}
