import PotentialProbability from "../../../dto/character/itemEquipment/potentialProbability";
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
