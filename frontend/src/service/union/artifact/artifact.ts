import {
  CRYSTALS_BY_LEVEL,
  EFFECT_COUNT_PER_CRYSTAL,
  MAX_APPLIED_EFFECT_LEVEL,
} from "./artifactConstants";

export default abstract class ArtifactService {
  static generateEffectLevels(artifactLevel: number) {
    const crystals = this.getCrystals(artifactLevel);
    const effectLevelsComb: number[][] = [];

    for (
      let effectIndex = 0,
        effectIndexBound = this.getMaxEffectsLength(artifactLevel);
      effectIndex < effectIndexBound;
      effectIndex++
    ) {
      const effectCount = this.getAppliedEffectCount(
        artifactLevel,
        effectIndex
      );
      let effectLevels = new Array(effectCount + 1).fill(0);

      for (const crystal of crystals)
        for (let i = 0; i < EFFECT_COUNT_PER_CRYSTAL; i++)
          effectLevels[
            crystal.effects[Math.min(crystal.effects.length - 1, effectIndex)][
              i
            ]
          ] += crystal.level;

      for (let i = 0; i < effectLevels.length; i++)
        if (effectLevels[i] > MAX_APPLIED_EFFECT_LEVEL)
          effectLevels[i] = MAX_APPLIED_EFFECT_LEVEL;

      effectLevels = effectLevels.slice(1);
      effectLevelsComb.push(effectLevels);
    }

    return effectLevelsComb;
  }

  static getAppliedEffectCount(artifactLevel: number, effectIndex: number) {
    return Math.max(
      ...this.getCrystals(artifactLevel).map((c) =>
        Math.max(...c.effects[Math.min(c.effects.length - 1, effectIndex)])
      )
    );
  }
  static getCrystals(artifactLevel: number) {
    for (
      let i = Math.min(artifactLevel, CRYSTALS_BY_LEVEL.length - 1);
      i > 1;
      i--
    )
      if (CRYSTALS_BY_LEVEL[i].length) return CRYSTALS_BY_LEVEL[i];
    return CRYSTALS_BY_LEVEL[1];
  }
  static getCrystalEffectIndexes(artifactLevel: number, index: number) {
    return this.getCrystals(artifactLevel).map(
      (crystal) => crystal.effects[Math.min(index, crystal.effects.length - 1)]
    );
  }
  static getMaxEffectsLength(artifactLevel: number) {
    return Math.max(
      ...this.getCrystals(artifactLevel).map((c) => c.effects.length)
    );
  }
}
