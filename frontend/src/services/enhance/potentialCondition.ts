import ConditionInfos from "../../types/character/itemEquipment/potential/conditionInfos";
import PotentialCondition from "../../types/character/itemEquipment/potential/potentialCondition";
import PotentialResponse from "../../types/character/itemEquipment/potential/potentialResponse";

export function calcConditionInfos(
  potentialInfos: PotentialResponse[]
): ConditionInfos {
  const conditionInfos: ConditionInfos = {};

  Object.values(groupBy(potentialInfos, "grade")).forEach(
    (potentialIfosAtGrade) =>
      Object.values(groupBy(potentialIfosAtGrade, "name")).forEach(
        (potentialInfosAtName) => {
          const infosByPos = groupBy(potentialInfosAtName, "position");
          const positionKeys = Object.keys(infosByPos).map(Number);

          addConditionInfoRecursivly(
            infosByPos,
            positionKeys,
            conditionInfos,
            [],
            0
          );
        }
      )
  );

  return conditionInfos;
}
function groupBy<T extends keyof PotentialResponse>(
  potentialInfos: PotentialResponse[],
  key: T
): { [K in PotentialResponse[T]]: PotentialResponse[] } {
  return potentialInfos.reduce((groupedData, item) => {
    const groupKey = item[key];
    if (!groupedData[groupKey]) {
      groupedData[groupKey] = [];
    }
    groupedData[groupKey].push(item);
    return groupedData;
  }, {} as { [K in PotentialResponse[T]]: PotentialResponse[] });
}
function addConditionInfoRecursivly(
  potentialInfosByPos: {
    [x: number]: PotentialResponse[];
  },
  positionKeys: number[],
  conditionInfos: ConditionInfos,
  posAndIndexes: { pos: number; index: number }[],
  depth: number
) {
  if (depth == positionKeys.length) {
    if (!positionKeys.length || !posAndIndexes.length) return;

    const name = potentialInfosByPos[positionKeys[0]][0].name;
    const grade = potentialInfosByPos[positionKeys[0]][0].grade;
    const value = posAndIndexes.reduce(
      (sum, { pos, index }) => (sum += potentialInfosByPos[pos][index].value),
      0
    );

    if (!conditionInfos[name]) conditionInfos[name] = {};
    if (!conditionInfos[name][value]) conditionInfos[name][value] = {};
    if (!conditionInfos[name][value][grade])
      conditionInfos[name][value][grade] = [];

    conditionInfos[name][value][grade].push(
      posAndIndexes.map(({ pos, index }) => potentialInfosByPos[pos][index])
    );

    return;
  }

  const pos = positionKeys[posAndIndexes.length];
  const indexes = new Array(potentialInfosByPos[pos].length)
    .fill(0)
    .map((_, i) => i);
  indexes.forEach(() =>
    addConditionInfoRecursivly(
      potentialInfosByPos,
      positionKeys,
      conditionInfos,
      posAndIndexes,
      depth + 1
    )
  );
  indexes.forEach((_, index) => {
    posAndIndexes.push({ pos: positionKeys[posAndIndexes.length], index });
    addConditionInfoRecursivly(
      potentialInfosByPos,
      positionKeys,
      conditionInfos,
      posAndIndexes,
      depth + 1
    );
    posAndIndexes.pop();
  });
}

// export function calcExpectedCountByConditions(
//   conditionInfos: ConditionInfos,
//   conditions: PotentialCondition[]
// ) {
//   const countByGrade: { [grade: string]: number } = {};

//   getIntersectGrades(conditions).forEach((grade) => {
//     conditions.map(({ name, value }) =>
//       getCompatiblePotentialInfoGrid(conditionInfos, name, Number(value), grade)
//     );

//     addProbability(grade, conditionInfos, conditions, countByGrade, [], 0);
//   });

//   for (const key in countByGrade) countByGrade[key] = 1 / countByGrade[key];
//   return countByGrade;
// }
// function getIntersectGrades(conditions: PotentialCondition[]): string[] {
//   if (conditions.length === 0) return [];

//   let intersectGrades = [...conditions[0].grades];

//   for (let i = 1; i < conditions.length; i++) {
//     const currentGrades = conditions[i].grades;
//     intersectGrades = intersectGrades.filter((grade) =>
//       currentGrades.has(grade)
//     );
//     if (intersectGrades.length === 0) break;
//   }

//   return intersectGrades;
// }
// function getCompatiblePotentialInfoGrid(
//   conditionInfos: ConditionInfos,
//   name: string,
//   minValue: number,
//   grade: string
// ) {
//   return Object.entries(conditionInfos[name])
//     .filter(([value]) => Number(value) >= minValue)
//     .flatMap(([_, infosByValue]) =>
//       infosByValue[grade] ? infosByValue[grade] : []
//     );
// }
// function addProbability(
//   grade: string,
//   conditionInfos: ConditionInfos,
//   conditions: PotentialCondition[],
//   probabilityByGrade: { [grade: string]: number },
//   indexes: number[],
//   depth: number
// ) {
//   if (depth == conditions.length) {
//     if (!indexes.length) return;

//     return;
//   }
// }
// function isCompatiableConditions(
//   conditionInfos: ConditionInfos,
//   conditions: PotentialCondition[]
// ) {
//   return false;
// }
