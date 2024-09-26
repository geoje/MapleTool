import PotentialProbability from "../../../types/character/itemEquipment/potentialProbability";
import PotentialService from "./potential";
import sampleJson from "./potential.sample.json";

const key = JSON.stringify({ part: "무기", grade: "레전드리", level: 100 });
const probabilities: PotentialProbability[] = JSON.parse(
  JSON.stringify(sampleJson)
);
PotentialService.probabilities.set(key, probabilities);

test("getSummantions", async () => {
  const result = await (
    await PotentialService.getSummantions("무기", "레전드리", 100)
  ).map((summantion) => JSON.stringify(summantion));
  result.sort();
  console.log(result);
});

test("isCompatibleSummantions", () => {
  const summantionsNotCompatible = [
    {
      name: "공격력 : +n%",
      value: 21,
      positionGrid: [
        [1, 2],
        [0, 2],
        [0, 1],
      ],
    },
    {
      name: "보스 몬스터 공격 시 데미지 : +n%",
      value: 65,
      positionGrid: [
        [1, 2],
        [0, 2],
        [0, 1],
      ],
    },
  ];
  const summantionsCompatible = [
    {
      name: "공격력 : +n%",
      value: 21,
      positionGrid: [
        [1, 2],
        [0, 2],
        [0, 1],
      ],
    },
    {
      name: "보스 몬스터 공격 시 데미지 : +n%",
      value: 30,
      positionGrid: [[2], [1]],
    },
  ];

  expect(
    PotentialService.isCompatibleSummantions(summantionsNotCompatible)
  ).toBeFalsy();
  expect(
    PotentialService.isCompatibleSummantions(summantionsCompatible)
  ).toBeTruthy();
});
