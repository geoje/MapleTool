import { Badge, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ArtifactLevel from "./1-artifactLevel/artifactLevel";
import EffectLevel from "./2-effectLevel/effectLevel";
import SelectEffect from "./3-select/selectEffect";
import BoardCard from "../../components/layout/boardCard";
import { useAppSelector } from "../../stores/hooks";
import { useBasicQuery } from "../../stores/unionApi";
import { flatEffectNamesByLevel, remainPoint } from "../../services/artifact";
import ResultGrid from "./4-result/result";

export default function Artifact() {
  const name = useAppSelector((state) => state.user.name);
  const { data, isFetching } = useBasicQuery(name, {
    skip: !name,
    refetchOnMountOrArgChange: true,
  });

  const [artifactLevel, setArtifactLevel] = useState(
    Math.max(data?.union_artifact_level ?? 1, 1)
  );
  const [effectIndex, setEffectIndex] = useState(0);
  const [effectLevels, setEffectLevels] = useState<number[]>([]);
  const [effectNamesByLevel, setEffectNamesByLevel] = useState<
    Record<number, Set<string>>
  >({});

  useEffect(() => {
    if (!data) return;

    setArtifactLevel(Math.max(data?.union_artifact_level ?? 1, 1));
  }, [data, setArtifactLevel]);

  useEffect(() => {
    setEffectNamesByLevel({});
  }, [artifactLevel]);

  return (
    <>
      <Stack w={{ base: "100vw", md: "min-content" }}>
        <BoardCard
          order={1}
          title="아티팩트 레벨"
          right={isFetching && <Spinner size="sm" />}
        >
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
            effectNamesByLevel={effectNamesByLevel}
            setEffectNamesByLevel={setEffectNamesByLevel}
          />
        </BoardCard>
      </Stack>
      <Stack w={{ base: "100vw", md: "auto" }}>
        <BoardCard
          order={4}
          title="배치도"
          right={<Badge>남은 AP {remainPoint(artifactLevel)}</Badge>}
        >
          <ResultGrid
            artifactLevel={artifactLevel}
            effectIndex={effectIndex}
            effectNames={flatEffectNamesByLevel(
              effectLevels,
              effectNamesByLevel
            )}
          />
        </BoardCard>
      </Stack>
    </>
  );
}
