import { Badge, Stack } from "@chakra-ui/react";
import { useState } from "react";
import ArtifactLevel from "./artifactLevel/artifactLevel";
import EffectLevel from "./effectLevel/effectLevel";
import SelectEffect from "./select/selectEffect";
import ResultGrid from "./result/result";
import BoardCard from "../../components/boardCard";
import { remainPoint } from "../../utils/artifact";
import { useAppSelector } from "../../stores/hooks";
import { useBasicQuery } from "../../stores/unionApi";

export default function Artifact() {
  const name = useAppSelector((state) => state.user.name);
  const { data } = useBasicQuery(name, { skip: !name });

  const [artifactLevel, setArtifactLevel] = useState(
    data?.union_artifact_level ?? 1
  );
  const [effectIndex, setEffectIndex] = useState(0);
  const [effectLevels, setEffectLevels] = useState<number[]>([]);
  const [effectNames, setEffectNames] = useState<string[]>([]);

  return (
    <>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard order={1} title="아티팩트 레벨">
          <ArtifactLevel
            artifactLevel={artifactLevel}
            setArtifactlevel={setArtifactLevel}
          />
        </BoardCard>
        <BoardCard order={2} title="효과 레벨">
          <EffectLevel
            artifactLevel={artifactLevel}
            effectIndex={effectIndex}
            setEffectIndex={setEffectIndex}
            setEffectLevels={setEffectLevels}
          />
        </BoardCard>
        <BoardCard order={3} title="효과 선택">
          <SelectEffect
            effectLevels={effectLevels}
            effectNames={effectNames}
            setEffectNames={setEffectNames}
          />
        </BoardCard>
      </Stack>
      <Stack w={["100%", "100%", "auto"]}>
        <BoardCard
          order={4}
          title="배치도"
          right={<Badge>남은 AP {remainPoint(artifactLevel)}</Badge>}
        >
          <ResultGrid
            artifactLevel={artifactLevel}
            effectIndex={effectIndex}
            effectNames={effectNames}
          />
        </BoardCard>
      </Stack>
    </>
  );
}
