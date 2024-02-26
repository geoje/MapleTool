import { ArtifactCrystalEffect, ArtifactCrystalLevel } from "./artifact";

test("Level", () => {
  for (let artifactLevel = 1; artifactLevel <= 60; artifactLevel++) {
    const crystal = new ArtifactCrystalLevel(artifactLevel);
    const levels = crystal.getLevelsCases();
    levels.unshift([artifactLevel]);
    console.dir(levels);
  }
});
test("Effect.generateOrderCombination", () => {
  let result: number[][] = [];
  ArtifactCrystalEffect.generateOrderCombination(result, [], 5, 3);
  expect(result).toStrictEqual([
    [0, 1, 2],
    [0, 1, 3],
    [0, 1, 4],
    [0, 2, 3],
    [0, 2, 4],
    [0, 3, 4],
    [1, 2, 3],
    [1, 2, 4],
    [1, 3, 4],
    [2, 3, 4],
  ]);
});
test("Effect", () => {
  const artifactLevel = 10;
  const crystal = new ArtifactCrystalLevel(artifactLevel);
  const effect = new ArtifactCrystalEffect(crystal.getLevelsCases());
  console.log(
    effect.getEffectsCases().map((a) => ({
      crystalLevels: a.crystalLevels,
      effects: JSON.stringify(a.effects.map((b) => b.level)),
    }))
  );
});
