import { ArtifactCrystal } from "./artifact";

test("ArtifactCrystal", () => {
  for (let artifactLevel = 1; artifactLevel <= 60; artifactLevel++) {
    const crystal = new ArtifactCrystal(artifactLevel);
    console.dir(crystal.getLevelsCases());
  }
});
