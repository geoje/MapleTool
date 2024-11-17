import { Badge, Spinner, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ArtifactLevel from "./1-artifactLevel/artifactLevel";
import EffectLevel from "./2-effectLevel/effectLevel";
import SelectEffect from "./3-select/selectEffect";
import BoardCard from "../../components/layout/boardCard";
import { useAppSelector } from "../../stores/hooks";
import { useArtifactQuery, useBasicQuery } from "../../stores/unionApi";
import {
  calcEffectLevelGrid,
  flatEffectNamesByLevel,
  remainPoint,
} from "../../services/artifact";
import ResultGrid from "./4-result/result";
import { EFFECT_INFOS } from "../../constants/artifact";

export default function Artifact() {
  const name = useAppSelector((state) => state.user.name);
  const { data: dataBasic, isFetching: isFetchingBasic } = useBasicQuery(name, {
    skip: !name,
    refetchOnMountOrArgChange: true,
  });
  const { data: dataArtifact, isFetching: isFetchingArtifact } =
    useArtifactQuery(name, {
      skip: !name,
      refetchOnMountOrArgChange: true,
    });

  const [artifactLevel, setArtifactLevel] = useState(
    Math.max(dataBasic?.union_artifact_level ?? 1, 1)
  );
  const availableEffectLevelGrid = calcEffectLevelGrid(artifactLevel);
  const [effectIndex, setEffectIndex] = useState(0);
  const [effectNamesByLevel, setEffectNamesByLevel] = useState<
    Record<number, Set<string>>
  >({});

  useEffect(() => {
    setArtifactLevel(Math.max(dataBasic?.union_artifact_level ?? 1, 1));
  }, [dataBasic, setArtifactLevel]);

  useEffect(() => {
    setEffectIndex(0);
    setEffectNamesByLevel({});
  }, [artifactLevel, setEffectIndex]);

  useEffect(() => {
    if (!dataArtifact) return;

    const dataArtifactEffects = dataArtifact.union_artifact_effect
      .map((effect) => effect.level)
      .sort((a, b) => b - a);

    const levelsIndex = availableEffectLevelGrid.findIndex(
      (availableEffectLevels) =>
        availableEffectLevels.length == dataArtifactEffects.length &&
        availableEffectLevels.every(
          (level, i) => level == dataArtifactEffects[i]
        )
    );

    if (levelsIndex == -1) return;

    const namesByLevel: Record<number, Set<string>> = {};
    for (const effect of dataArtifact.union_artifact_effect) {
      const effectInfo = EFFECT_INFOS.find((info) =>
        info.expression.test(effect.name)
      );
      console.log(effect, effectInfo);
      if (!effectInfo) continue;

      if (namesByLevel[effect.level])
        namesByLevel[effect.level].add(effectInfo.full);
      else namesByLevel[effect.level] = new Set([effectInfo.full]);
    }
    setEffectIndex(levelsIndex);
    setEffectNamesByLevel(namesByLevel);
  }, [dataArtifact, setEffectIndex, setEffectNamesByLevel]);

  return (
    <>
      <Stack w={{ base: "100vw", md: "min-content" }}>
        <BoardCard
          order={1}
          title="아티팩트 레벨"
          right={isFetchingBasic && <Spinner size="sm" />}
        >
          <ArtifactLevel
            artifactLevel={artifactLevel}
            setArtifactlevel={setArtifactLevel}
          />
        </BoardCard>
        <BoardCard
          order={2}
          title="효과 레벨"
          right={isFetchingArtifact && <Spinner size="sm" />}
        >
          <EffectLevel
            artifactLevel={artifactLevel}
            effectIndex={effectIndex}
            setEffectIndex={setEffectIndex}
          />
        </BoardCard>
        <BoardCard order={3} title="효과 선택">
          <SelectEffect
            effectLevels={availableEffectLevelGrid[effectIndex]}
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
              availableEffectLevelGrid[effectIndex],
              effectNamesByLevel
            )}
          />
        </BoardCard>
      </Stack>
    </>
  );
}
