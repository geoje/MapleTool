import UnionArtifactService from "./union";

test("demo", () => expect(true).toBe(true));
test("add correctly", () => {
  expect(
    UnionArtifactService.generateArtifactEffectLevelCombination("test")
  ).toBe(4);
});
