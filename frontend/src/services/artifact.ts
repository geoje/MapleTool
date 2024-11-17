import {
  CRYSTALS_BY_LEVEL,
  EFFECT_COUNT_PER_CRYSTAL,
  EFFECT_NAMES,
  MAX_APPLIED_EFFECT_LEVEL,
  POINT_BY_CRYSTAL,
} from "../constants/artifact";

export function calcEffectLevels(artifactLevel: number) {
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

export function crystals(artifactLevel: number) {
  for (
    let i = Math.min(artifactLevel, CRYSTALS_BY_LEVEL.length - 1);
    i > 1;
    i--
  )
    if (CRYSTALS_BY_LEVEL[i].length) return CRYSTALS_BY_LEVEL[i];
  return CRYSTALS_BY_LEVEL[1];
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

export function groupEffectLevelsCount(effectLevels: number[]): {
  [key: number]: number;
} {
  return effectLevels
    .map((level) => Math.min(MAX_APPLIED_EFFECT_LEVEL, level))
    .reduce((acc, level) => {
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });
}

export function flatEffectNamesByLevel(
  effectLevels: number[],
  effectNamesByLevel: Record<number, Set<string>>
) {
  const effectLevelsCount = groupEffectLevelsCount(effectLevels);

  return Object.keys(effectNamesByLevel)
    .map((level) => Number(level))
    .sort()
    .flatMap((level) => [
      ...[...effectNamesByLevel[level]].sort(
        (a, b) =>
          EFFECT_NAMES.findIndex(({ full }) => full == a) -
          EFFECT_NAMES.findIndex(({ full }) => full == b)
      ),
      ...new Array(
        effectLevelsCount[level] - effectNamesByLevel[level].size
      ).fill(""),
    ]);
}
