import {
  CRYSTALS_BY_LEVEL,
  EFFECT_COUNT_PER_CRYSTAL,
  POINT_BY_CRYSTAL,
} from "./artifactConstants";

export default abstract class ArtifactService {
  static effectLevels(artifactLevel: number) {
    const crystals = this.crystals(artifactLevel);
    const effectLevelsComb: number[][] = [];

    for (
      let effectIndex = 0,
        effectIndexBound = this.maxEffectsLength(artifactLevel);
      effectIndex < effectIndexBound;
      effectIndex++
    ) {
      const effectCount = this.appliedEffectCount(artifactLevel, effectIndex);
      let effectLevels = new Array(effectCount + 1).fill(0);

      // TODO: maybe duplicated with function
      for (const crystal of crystals)
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

  static maxEffectsLength(artifactLevel: number) {
    return Math.max(
      ...this.crystals(artifactLevel).map((c) => c.effects.length)
    );
  }
  static appliedEffectCount(artifactLevel: number, effectIndex: number) {
    return Math.max(
      ...this.crystals(artifactLevel).map((c) =>
        Math.max(...c.effects[Math.min(c.effects.length - 1, effectIndex)])
      )
    );
  }
  static crystals(artifactLevel: number) {
    for (
      let i = Math.min(artifactLevel, CRYSTALS_BY_LEVEL.length - 1);
      i > 1;
      i--
    )
      if (CRYSTALS_BY_LEVEL[i].length) return CRYSTALS_BY_LEVEL[i];
    return CRYSTALS_BY_LEVEL[1];
  }
  static crystalEffectIndexes(artifactLevel: number, index: number) {
    return this.crystals(artifactLevel).map((crystal) => {
      let i = Math.min(index, crystal.effects.length - 1);
      for (; !crystal.effects[i].length; i--);
      return crystal.effects[i];
    });
  }
  static remainPoint(artifactLevel: number) {
    const point = artifactLevel + Math.floor(artifactLevel / 5);
    const usedPoint = this.crystals(artifactLevel)
      .map((c) => POINT_BY_CRYSTAL[c.level])
      .reduce((prev, cur) => prev + cur);
    return point - usedPoint;
  }
}
