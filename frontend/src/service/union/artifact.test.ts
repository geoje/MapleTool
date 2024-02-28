import ArtifactService from "./artifact";

test("generateEffectLevels", () => {
  let result = [];
  for (let artifactLevel = 1; artifactLevel <= 28; artifactLevel++) {
    result.push([
      artifactLevel,
      JSON.stringify(ArtifactService.generateEffectLevels(artifactLevel)),
    ]);
  }
  console.dir(result);
});

test("getEffectCount", () => {
  let result = [];
  for (let artifactLevel = 1; artifactLevel <= 28; artifactLevel++) {
    result.push([
      artifactLevel,
      ArtifactService.getAppliedEffectCount(artifactLevel, 0),
    ]);
  }
  console.dir(result);
});

test("getCrystals", () => {
  let result = [];
  for (let artifactLevel = 1; artifactLevel <= 28; artifactLevel++) {
    result.push([
      artifactLevel,
      JSON.stringify(ArtifactService.getCrystals(artifactLevel)),
    ]);
  }
  console.dir(result);
});
