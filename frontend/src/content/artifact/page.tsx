import { Flex, Stack } from "@chakra-ui/react";
import ArtifactService from "../../service/union/artifact/artifact";
import { useEffect, useState } from "react";
import ArtifactLevel from "./artifactLevel";
import EffectLevel from "./effectLevel";
import SelectEffect from "./selectEffect";
import { EFFECT_NAMES } from "../../service/union/artifact/artifactConstants";

export default function Artifact() {
  const [artifactLevel, setArtifactLevel] = useState(1);
  const [currentEffectLevels, setCurrentEffectLevels] = useState<number[]>([]);
  const [currentEffectNames, setCurrentEffectNames] = useState<string[]>([]);

  useEffect(() => {
    const initEffectLevels =
      ArtifactService.generateEffectLevels(artifactLevel)[0];
    setCurrentEffectLevels(initEffectLevels);

    const unusedEffectNames = EFFECT_NAMES.filter(
      (name) => !currentEffectNames.some((existName) => existName == name)
    );
    const newEffectNames = [...currentEffectNames, ...unusedEffectNames].slice(
      0,
      initEffectLevels.length
    );
    setCurrentEffectNames(newEffectNames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artifactLevel]);

  return (
    <Flex p={4} gap={4} wrap="wrap">
      <Stack width={["100%", "100%", "auto"]}>
        <ArtifactLevel onChange={(value) => setArtifactLevel(value)} />
        <EffectLevel
          artifactLevel={artifactLevel}
          effectLevels={currentEffectLevels}
          setEffectLevels={setCurrentEffectLevels}
        />
      </Stack>
      <SelectEffect
        effectLevels={currentEffectLevels}
        currentEffectNames={currentEffectNames}
        onChange={(effectName, index) => {
          const temp = [...currentEffectNames];
          temp[index] = effectName;
          setCurrentEffectNames(temp);
        }}
      />
    </Flex>
  );
}
