import { Flex, Stack } from "@chakra-ui/react";
import ArtifactService from "../../service/union/artifact";
import { useEffect, useState } from "react";
import ArtifactLevel from "./artifactLevel";
import EffectLevel from "./effectLevel";

export default function Artifact() {
  const [artifactLevel, setArtifactLevel] = useState(1);
  const [currentEffectLevels, setEffectLevels] = useState<number[]>([]);

  useEffect(() => {
    setEffectLevels(ArtifactService.generateEffectLevels(artifactLevel)[0]);
  }, [artifactLevel]);

  return (
    <Flex p={4} gap={4} wrap="wrap">
      <Stack>
        <ArtifactLevel onChange={(_, value) => setArtifactLevel(value)} />
        <EffectLevel
          artifactLevel={artifactLevel}
          currentEffectLevels={currentEffectLevels}
          setEffectLevels={setEffectLevels}
        />
      </Stack>
    </Flex>
  );
}
