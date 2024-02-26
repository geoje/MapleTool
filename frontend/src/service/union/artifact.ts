const CRYSTAL_COUNT_BY_ARTIFACT_LEVEL = [
  [3, 1], // [CRTSTAL_COUNT, ARTIFACT_LEVEL]
  [4, 10],
  [5, 20],
  [6, 30],
  [7, 40],
  [8, 50],
  [9, 60],
].sort((a, b) => b[0] - a[0]);
const CRYSTAL_LEVEL_BY_AP = [
  [1, 0], // [CRYSTAL_LEVEL, AP]
  [2, 1],
  [3, 3],
  [4, 5],
  [5, 8],
].sort((a, b) => b[0] - a[0]);
const BONUS_AP_LEVEL = 5;
const MAX_REMAIN_AP = 2;
const MIN_CRYSTAL_LEVEL = CRYSTAL_LEVEL_BY_AP.map((v) => v[0]).sort()[0];
const MAX_CRYSTAL_LEVEL = CRYSTAL_LEVEL_BY_AP.map((v) => v[0]).sort(
  (a, b) => b - a
)[0];
const MAX_EFFECT_LEVEL = 10;
const TOTAL_EFFECT_COUNT = 16;
const EFFECT_COUNT_PER_CRYSTAL = 3;

type levelsCase = number[];
type effectBind = {
  level: number;
  crystal: number[];
};
type effectsCase = {
  crystalLevels: levelsCase;
  effects: effectBind[];
};

export default abstract class Artifact {
  static generateEffectLevelCombination(artifactLevel: number) {
    const crystal = new ArtifactCrystalLevel(artifactLevel);
    return crystal.getLevelsCases();
  }
}

export class ArtifactCrystalLevel {
  private levelsCases: levelsCase[] = [];

  constructor(artifactLevel: number) {
    this.generateCrystalLevelCombination(
      new Array(ArtifactCrystalLevel.maxCrystalCount(artifactLevel)).fill(
        CRYSTAL_LEVEL_BY_AP[0][0]
      ),
      0,
      ArtifactCrystalLevel.calculateAp(artifactLevel)
    );
    this.filterMaxLevelSum();
  }

  public getLevelsCases() {
    return <levelsCase[]>JSON.parse(JSON.stringify(this.levelsCases));
  }

  private generateCrystalLevelCombination(
    levels: levelsCase,
    index: number,
    ap: number
  ) {
    if (index >= levels.length) {
      if (
        ap > MAX_REMAIN_AP &&
        levels[levels.length - 1] != MAX_CRYSTAL_LEVEL
      ) {
        return;
      }
      this.levelsCases.push([...levels]);
      return;
    }

    const maxCrystalLevelEntry = ArtifactCrystalLevel.maxCrystalLevelEntry(ap);
    for (
      let level =
        index == 0
          ? maxCrystalLevelEntry[0]
          : Math.min(levels[index - 1], maxCrystalLevelEntry[0]);
      level >= MIN_CRYSTAL_LEVEL;
      level--
    ) {
      levels[index] = level;
      this.generateCrystalLevelCombination(
        levels,
        index + 1,
        ap - ArtifactCrystalLevel.calculateCostAp(level)
      );
    }
  }
  private filterMaxLevelSum() {
    const maxLevelSum = Math.max(
      ...this.levelsCases.map(ArtifactCrystalLevel.sumArray)
    );
    this.levelsCases = this.levelsCases.filter(
      (arr) => ArtifactCrystalLevel.sumArray(arr) == maxLevelSum
    );
  }

  private static calculateAp(artifactLevel: number) {
    return artifactLevel + Math.floor(artifactLevel / BONUS_AP_LEVEL);
  }
  private static calculateCostAp(crystalLevel: number) {
    return (CRYSTAL_LEVEL_BY_AP.find((entry) => entry[0] == crystalLevel) ?? [
      0, 0,
    ])[1];
  }
  private static maxCrystalCount(artifactLevel: number) {
    return (CRYSTAL_COUNT_BY_ARTIFACT_LEVEL.find(
      (entry) => artifactLevel >= entry[1]
    ) ?? CRYSTAL_COUNT_BY_ARTIFACT_LEVEL.sort((a, b) => a[0] - b[0])[0])[0];
  }
  private static maxCrystalLevelEntry(ap: number) {
    return (
      CRYSTAL_LEVEL_BY_AP.find((entry) => ap >= entry[1]) ??
      CRYSTAL_LEVEL_BY_AP.sort((a, b) => a[0] - b[0])[0]
    );
  }
  private static sumArray(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0);
  }
}
export class ArtifactCrystalEffect {
  private effectsCases: effectsCase[] = [];

  constructor(levelsCases: levelsCase[]) {
    levelsCases.forEach((levels) =>
      this.generateEffectsCombination(levels, [])
    );
    this.filterDistinct();
    this.filterEfficiency();
    this.sortByDescending();
  }

  getEffectsCases() {
    return <effectsCase[]>JSON.parse(JSON.stringify(this.effectsCases));
  }

  generateEffectsCombination(
    levels: levelsCase,
    effects: effectBind[],
    index: number = 0
  ) {
    // If last index, push and return
    if (index >= levels.length) {
      this.pushEffectsCases(levels, effects);
      return;
    }

    // If first index, effects array is empty. so create effects and do next
    if (index == 0) {
      for (let i = 0; i < EFFECT_COUNT_PER_CRYSTAL; i++)
        effects.push({ level: levels[index], crystal: [index] });
      this.generateEffectsCombination(levels, effects, index + 1);
      return;
    }

    // push all combination for current index crystal effects
    for (
      let createEffectCount = 0;
      createEffectCount <=
      Math.min(EFFECT_COUNT_PER_CRYSTAL, TOTAL_EFFECT_COUNT - effects.length);
      createEffectCount++
    ) {
      let ordersComb: number[][] = [];
      ArtifactCrystalEffect.generateOrderCombination(
        ordersComb,
        [],
        effects.length,
        EFFECT_COUNT_PER_CRYSTAL - createEffectCount
      );

      // Create effect
      for (let i = 0; i < createEffectCount; i++)
        effects.push({ level: levels[index], crystal: [index] });

      ordersComb.forEach((effectIndexes) => {
        // If level to apply is over max, return
        if (
          effectIndexes.find(
            (effectIndex) => effects[effectIndex].level >= MAX_EFFECT_LEVEL
          )
        )
          return;

        // Apply crystal to all effects
        effectIndexes.forEach((effectIndex) => {
          effects[effectIndex].level += levels[index];
          effects[effectIndex].crystal.push(index);
        });

        // If applied total level is over max, do not execute next
        if (
          !effectIndexes.some(
            (effectIndex) => effects[effectIndex].level > MAX_EFFECT_LEVEL
          )
        )
          // Call recursive to do next
          this.generateEffectsCombination(levels, effects, index + 1);

        // Reverse applied effects
        effectIndexes.forEach((effectIndex) => {
          effects[effectIndex].level -= levels[index];
          effects[effectIndex].crystal.pop();
        });
      });

      // Reverse created effects
      for (let i = 0; i < createEffectCount; i++) effects.pop();
    }
  }
  pushEffectsCases(levels: levelsCase, effects: effectBind[]) {
    this.effectsCases.push({
      crystalLevels: [...levels],
      effects: [
        ...effects.map(
          (bind) =>
            <effectBind>{
              level: bind.level,
              crystal: [...bind.crystal],
            }
        ),
      ].sort((a, b) => b.level - a.level),
    });
  }

  filterDistinct() {
    const effectsLevels = this.effectsCases.map((a) =>
      a.effects.map((b) => b.level)
    );

    for (let i = 0, j; i < this.effectsCases.length; i++) {
      for (
        j = 0;
        j < i &&
        !ArtifactCrystalEffect.isEqualNumbers(
          effectsLevels[i],
          effectsLevels[j]
        );
        j++
      );
      if (i != j) {
        effectsLevels.splice(i, 1);
        this.effectsCases.splice(i, 1);
        i--;
      }
    }
  }
  filterEfficiency() {
    let maxTotalEffectsLevel = 0;
    let totalLevels: number[] = [];

    for (let i = 0; i < this.effectsCases.length; i++) {
      const totalLevel = ArtifactCrystalEffect.getEffectsTotalLevelWithBound(
        this.effectsCases[i].effects
      );
      totalLevels.push(totalLevel);
      if (totalLevel > maxTotalEffectsLevel) maxTotalEffectsLevel = totalLevel;
    }

    for (let i = totalLevels.length - 1; i >= 0; i--) {
      if (totalLevels[i] < maxTotalEffectsLevel) this.effectsCases.splice(i, 1);
    }
  }
  sortByDescending() {
    this.effectsCases.sort((a, b) =>
      ArtifactCrystalEffect.compareNumbers(
        b.effects.map((v) => v.level),
        a.effects.map((v) => v.level)
      )
    );
  }

  static generateOrderCombination(
    output: number[][],
    orders: number[],
    length: number,
    count: number
  ) {
    if (orders.length == count) {
      output.push([...orders]);
      return;
    }

    if (orders.length == 0) {
      for (let i = 0; i <= length - count; i++) {
        orders.push(i);
        this.generateOrderCombination(output, orders, length, count);
        orders.pop();
      }
      return;
    }

    for (
      let i = orders[orders.length - 1] + 1;
      i <= length - (count - orders.length);
      i++
    ) {
      orders.push(i);
      this.generateOrderCombination(output, orders, length, count);
      orders.pop();
    }

    return;
  }
  static isEqualNumbers(arr1: number[], arr2: number[]) {
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) if (arr1[i] != arr2[i]) return false;

    return true;
  }
  static compareNumbers(arr1: number[], arr2: number[]) {
    for (
      let i = 0, bound = Math.min(arr1.length, arr2.length);
      i < bound;
      i++
    ) {
      if (arr1[i] == arr2[i]) continue;
      return arr1[i] - arr2[i];
    }
    return arr1.length - arr2.length;
  }
  static getEffectsTotalLevelWithBound(bind: effectBind[]) {
    return bind
      .map((v) => v.level)
      .reduce((prev, cur) => prev + Math.min(cur, MAX_EFFECT_LEVEL), 0);
  }
}
