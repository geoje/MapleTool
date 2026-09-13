import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const SECTION_TITLE = "text-xs font-medium uppercase tracking-wide text-muted-foreground";

export function UnionArtifactPage() {
  const name = useArtifactStore((state) => state.name);
  const { data: dataBasic, isFetching: isFetchingBasic } = useUnionBasic(name);
  const { data: dataArtifact, isFetching: isFetchingArtifact } = useUnionArtifact(name);

  const [artifactLevel, setArtifactLevel] = useState(1);
  const [effectIndex, setEffectIndex] = useState(0);
  const [effectNamesByLevel, setEffectNamesByLevel] = useState<Record<number, Set<string>>>({});
  const [inGameEffectIndex, setInGameEffectIndex] = useState<number>();

  const availableEffectLevelGrid = calcEffectLevelGrid(artifactLevel);

  useEffect(() => {
    setArtifactLevel(Math.max(dataBasic?.union_artifact_level ?? 1, 1));
    setEffectIndex(0);
    setEffectNamesByLevel({});
    setInGameEffectIndex(undefined);
  }, [dataBasic]);

  useEffect(() => {
    if (!dataArtifact || !dataBasic) return;

    const matchingEffectLevelGrid = calcEffectLevelGrid(Math.max(dataBasic.union_artifact_level ?? 1, 1));

    const dataArtifactEffects = dataArtifact.union_artifact_effect
      .map((effect) => effect.level)
      .sort((a, b) => b - a);

    const levelsIndex = matchingEffectLevelGrid.findIndex(
      (availableEffectLevels) =>
        availableEffectLevels.length == dataArtifactEffects.length &&
        availableEffectLevels.every((level, i) => level == dataArtifactEffects[i])
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
    setInGameEffectIndex(levelsIndex);
  }, [dataArtifact, dataBasic]);

  const effectLevels = availableEffectLevelGrid[effectIndex] ?? [];

  return (
    <div className="flex flex-wrap items-start gap-4">
      <div className="flex w-full flex-col gap-4 md:w-80">
        <Card>
          <CardHeader>
            <CardTitle className={SECTION_TITLE}>① 아티팩트 레벨</CardTitle>
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
            <CardTitle className={SECTION_TITLE}>② 효과 레벨</CardTitle>
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
            <CardTitle className={SECTION_TITLE}>③ 효과</CardTitle>
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
          <CardTitle className={SECTION_TITLE}>④ 배치도</CardTitle>
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
