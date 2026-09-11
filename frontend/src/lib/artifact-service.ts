import {
  ARTIFACT_ICONS,
  CRYSTALS_BY_LEVEL,
  EFFECT_COUNT_PER_CRYSTAL,
  EFFECT_INFOS,
  MAX_APPLIED_EFFECT_LEVEL,
  MAX_CRYSTAL_LEVEL,
  POINT_BY_CRYSTAL,
} from "@/constants/artifact";

export function crystals(artifactLevel: number) {
  for (let i = Math.min(artifactLevel, CRYSTALS_BY_LEVEL.length - 1); i > 1; i--)
    if (CRYSTALS_BY_LEVEL[i].length) return CRYSTALS_BY_LEVEL[i];
  return CRYSTALS_BY_LEVEL[1];
}

export function maxEffectsLength(artifactLevel: number) {
  return Math.max(...crystals(artifactLevel).map((c) => c.effects.length));
}

export function appliedEffectCount(artifactLevel: number, effectIndex: number) {
  return Math.max(
    ...crystals(artifactLevel).map((c) =>
      Math.max(...c.effects[Math.min(c.effects.length - 1, effectIndex)])
    )
  );
}

export function calcEffectLevelGrid(artifactLevel: number) {
  const effectLevelsComb: number[][] = [];

  for (
    let effectIndex = 0, effectIndexBound = maxEffectsLength(artifactLevel);
    effectIndex < effectIndexBound;
    effectIndex++
  ) {
    const effectCount = appliedEffectCount(artifactLevel, effectIndex);
    let effectLevels = new Array(effectCount + 1).fill(0);

    for (const crystal of crystals(artifactLevel))
      for (let j = 0; j < EFFECT_COUNT_PER_CRYSTAL; j++) {
        let i = Math.min(crystal.effects.length - 1, effectIndex);
        for (; !crystal.effects[i].length; i--);
        effectLevels[crystal.effects[i][j]] += crystal.level;
      }

    effectLevels = effectLevels.slice(1);
    effectLevelsComb.push(effectLevels);
  }

  return effectLevelsComb;
}

export function crystalEffectIndexes(artifactLevel: number, index: number) {
  return crystals(artifactLevel).map((crystal) => {
    let i = Math.min(index, crystal.effects.length - 1);
    for (; !crystal.effects[i].length; i--);
    return crystal.effects[i];
  });
}

export function remainPoint(artifactLevel: number) {
  const point = artifactLevel + Math.floor(artifactLevel / 5);
  const usedPoint = crystals(artifactLevel)
    .map((c) => POINT_BY_CRYSTAL[c.level])
    .reduce((prev, cur) => prev + cur);
  return point - usedPoint;
}

export function groupEffectLevelsCount(effectLevels: number[]) {
  return effectLevels
    .map((level) => Math.min(MAX_APPLIED_EFFECT_LEVEL, level))
    .reduce(
      (acc, level) => {
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      },
      {} as { [key: number]: number }
    );
}

export function remapEffectNamesByLevel(
  effectNamesByLevel: Record<number, Set<string>>,
  effectLevels: number[]
): Record<number, Set<string>> {
  const previousNames = Object.keys(effectNamesByLevel)
    .map(Number)
    .sort((a, b) => b - a)
    .flatMap((level) => [...effectNamesByLevel[level]]);

  const effectLevelsCount = groupEffectLevelsCount(effectLevels);
  const uniqueLevels = [...new Set(effectLevels)];
  const result: Record<number, Set<string>> = {};

  for (const name of previousNames) {
    for (const level of uniqueLevels) {
      const count = effectLevelsCount[level] ?? 0;
      const assignedCount = result[level]?.size ?? 0;
      if (assignedCount >= count) continue;

      result[level] = new Set([...(result[level] ?? []), name]);
      break;
    }
  }

  return result;
}

export function flatEffectNamesByLevel(
  effectLevels: number[],
  effectNamesByLevel: Record<number, Set<string>>
): string[] {
  const effectLevelsCount = groupEffectLevelsCount(effectLevels);

  return Object.keys(effectNamesByLevel)
    .map((level) => Number(level))
    .sort()
    .flatMap((level) => [
      ...[...effectNamesByLevel[level]].sort(
        (a, b) =>
          EFFECT_INFOS.findIndex(({ full }) => full == a) -
          EFFECT_INFOS.findIndex(({ full }) => full == b)
      ),
      ...new Array(Math.max(0, effectLevelsCount[level] - effectNamesByLevel[level].size)).fill(""),
    ]);
}

export function getArtifactIcon(index: number, level: number) {
  return level == MAX_CRYSTAL_LEVEL ? ARTIFACT_ICONS[index].purple : ARTIFACT_ICONS[index].blue;
}
