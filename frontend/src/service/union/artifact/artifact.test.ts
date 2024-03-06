import ArtifactService from "./artifact";
import { MAX_ARTIFACT_LEVEL, MIN_ARTIFACT_LEVEL } from "./artifactConstants";

test("generateEffectLevels", () => {
  const result = [];
  for (
    let artifactLevel = MIN_ARTIFACT_LEVEL;
    artifactLevel <= MAX_ARTIFACT_LEVEL;
    artifactLevel++
  ) {
    result.push([
      artifactLevel,
      JSON.stringify(ArtifactService.generateEffectLevels(artifactLevel)),
    ]);
  }
  console.dir(result);
});

test("getEffectCount", () => {
  const result = [];
  for (
    let artifactLevel = MIN_ARTIFACT_LEVEL;
    artifactLevel <= MAX_ARTIFACT_LEVEL;
    artifactLevel++
  ) {
    result.push([
      artifactLevel,
      ArtifactService.getAppliedEffectCount(artifactLevel, 0),
    ]);
  }
  console.dir(result);
});

test("getCrystals", () => {
  const result = [];
  for (
    let artifactLevel = MIN_ARTIFACT_LEVEL;
    artifactLevel <= MAX_ARTIFACT_LEVEL;
    artifactLevel++
  ) {
    result.push([
      artifactLevel,
      JSON.stringify(ArtifactService.getCrystals(artifactLevel)),
    ]);
  }
  console.dir(result);
});

test("getCrystalEffectIndexes", () => {
  const artifactLevel = 28;
  const result1 = ArtifactService.getCrystalEffectIndexes(artifactLevel, 0);
  const result2 = ArtifactService.getCrystalEffectIndexes(artifactLevel, 1);

  console.log(result1);
  console.log(result2);
});
