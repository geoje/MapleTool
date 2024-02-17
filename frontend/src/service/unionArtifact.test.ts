import UnionArtifactService from "./unionArtifact";

test("demo", () => expect(true).toBe(true));
it("add correctly", () => {
  expect(UnionArtifactService.add(3, 5)).toBe(8);
});
