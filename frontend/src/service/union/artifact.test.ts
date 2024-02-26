import { ArtifactCrystalLevel } from "./artifact";

test("ArtifactCrystalLevel", () => {
  for (let artifactLevel = 1; artifactLevel <= 60; artifactLevel++) {
    const crystal = new ArtifactCrystalLevel(artifactLevel);
    console.dir(crystal.getLevelsCases());
  }
});
test("ArtifactCrystalEffect", () => {});
