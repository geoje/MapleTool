import { useEffect, useState } from "react";
import { SectionTitle } from "@/components/section-title";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EFFECT_INFOS } from "@/constants/artifact";
import { useUnionArtifact } from "@/hooks/use-union-artifact";
import { useUnionBasic } from "@/hooks/use-union-basic";
import {
  calcEffectLevelGrid,
  flatEffectNamesByLevel,
  remainPoint,
  remapEffectNamesByLevel,
  toggleEffectName,
} from "@/lib/artifact-service";
import { useArtifactStore } from "@/stores/artifact-store";
import { ArtifactLevel } from "@/pages/union-artifact/artifact-level";
import { NameInput } from "@/pages/union-artifact/character-panel";
import { EffectLevel } from "@/pages/union-artifact/effect-level";
import { ResultGrid } from "@/pages/union-artifact/result-grid";
import { SelectEffect } from "@/pages/union-artifact/select-effect";

export function UnionArtifactPage() {
  const name = useArtifactStore((state) => state.name);
  const searchToken = useArtifactStore((state) => state.searchToken);
  const { data: dataBasic, isFetching: isFetchingBasic } = useUnionBasic(name, searchToken);
  const { data: dataArtifact, isFetching: isFetchingArtifact } = useUnionArtifact(name, searchToken);

  const [artifactLevel, setArtifactLevel] = useState(1);
  const [effectIndex, setEffectIndex] = useState(0);
  const [effectNamesByLevel, setEffectNamesByLevel] = useState<Record<number, Set<string>>>({});

  const availableEffectLevelGrid = calcEffectLevelGrid(artifactLevel);

  const dataArtifactEffects = dataArtifact?.union_artifact_effect.map((effect) => effect.level).sort((a, b) => b - a);

  const inGameLevelsIndex = dataArtifactEffects
    ? availableEffectLevelGrid.findIndex(
        (availableEffectLevels) =>
          availableEffectLevels.length == dataArtifactEffects.length &&
          availableEffectLevels.every((level, i) => level == dataArtifactEffects[i])
      )
    : -1;
  const inGameEffectIndex = inGameLevelsIndex == -1 ? undefined : inGameLevelsIndex;

  useEffect(() => {
    setArtifactLevel(Math.max(dataBasic?.union_artifact_level ?? 1, 1));
    setEffectIndex(0);
    setEffectNamesByLevel({});
  }, [dataBasic]);

  useEffect(() => {
    if (!dataArtifact || !dataBasic) return;

    const matchingEffectLevelGrid = calcEffectLevelGrid(Math.max(dataBasic.union_artifact_level ?? 1, 1));

    const sortedDataArtifactEffects = dataArtifact.union_artifact_effect
      .map((effect) => effect.level)
      .sort((a, b) => b - a);

    const levelsIndex = matchingEffectLevelGrid.findIndex(
      (availableEffectLevels) =>
        availableEffectLevels.length == sortedDataArtifactEffects.length &&
        availableEffectLevels.every((level, i) => level == sortedDataArtifactEffects[i])
    );
    if (levelsIndex == -1) return;

    const namesByLevel: Record<number, Set<string>> = {};
    for (const effect of dataArtifact.union_artifact_effect) {
      const effectInfo = EFFECT_INFOS.find((info) => info.expression.test(effect.name));
      if (!effectInfo) continue;

      if (namesByLevel[effect.level]) namesByLevel[effect.level].add(effectInfo.full);
      else namesByLevel[effect.level] = new Set([effectInfo.full]);
    }
    setEffectIndex(levelsIndex);
    setEffectNamesByLevel(namesByLevel);
  }, [dataArtifact, dataBasic]);

  const effectLevels = availableEffectLevelGrid[effectIndex] ?? [];

  return (
    <div className="flex flex-wrap items-start gap-4">
      <div className="flex w-full flex-col gap-4 md:w-80">
        <Card>
          <CardHeader>
            <SectionTitle step={1}>아티팩트 레벨</SectionTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <NameInput isFetching={isFetchingBasic || isFetchingArtifact} />
            <div className="relative h-5 text-xs">
              <Separator className="absolute inset-0 top-1/2" />
              <span className="relative mx-auto block w-fit bg-card px-2 text-muted-foreground">또는</span>
            </div>
            <ArtifactLevel
              artifactLevel={artifactLevel}
              onChange={(level) => {
                setArtifactLevel(level);
                setEffectIndex(0);
                setEffectNamesByLevel((prev) => remapEffectNamesByLevel(prev, calcEffectLevelGrid(level)[0] ?? []));
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionTitle step={2}>효과 레벨</SectionTitle>
          </CardHeader>
          <CardContent>
            <EffectLevel
              artifactLevel={artifactLevel}
              effectIndex={effectIndex}
              inGameEffectIndex={inGameEffectIndex}
              onChange={(index) => {
                setEffectIndex(index);
                setEffectNamesByLevel((prev) => remapEffectNamesByLevel(prev, availableEffectLevelGrid[index] ?? []));
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionTitle step={3}>효과</SectionTitle>
          </CardHeader>
          <CardContent>
            <SelectEffect
              effectNamesByLevel={effectNamesByLevel}
              effectLevels={effectLevels}
              onChange={(full) => setEffectNamesByLevel((prev) => toggleEffectName(prev, effectLevels, full))}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="w-full md:w-auto">
        <CardHeader>
          <SectionTitle step={4}>배치도</SectionTitle>
          <CardAction>
            <Badge variant="outline">남은 AP {remainPoint(artifactLevel)}</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ResultGrid
            artifactLevel={artifactLevel}
            effectIndex={effectIndex}
            effectNames={flatEffectNamesByLevel(effectLevels, effectNamesByLevel)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
