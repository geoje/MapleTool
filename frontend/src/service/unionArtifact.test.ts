import UnionArtifactService from "./unionArtifact";

test("demo", () => expect(true).toBe(true));
test("add correctly", () => {
  expect(UnionArtifactService.add(3, 5)).toBe(8);
});
