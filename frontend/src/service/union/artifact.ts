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

export default abstract class Artifact {
  static generateEffectLevelCombination(artifactLevel: number) {
    const crystal = new ArtifactCrystalLevel(artifactLevel);
    return crystal.getLevelsCases();
  }
}

export class ArtifactCrystalLevel {
  private levelsCases: number[][] = [];

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
    return JSON.parse(JSON.stringify(this.levelsCases));
  }

  private generateCrystalLevelCombination(
    levels: number[],
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
  private effectCases: number[][] = [];

  constructor(levelCases: number[][]) {}
}
