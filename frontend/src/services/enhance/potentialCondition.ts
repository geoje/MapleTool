import ConditionInfos from "../../types/character/itemEquipment/potential/conditionInfos";
import PotentialCondition from "../../types/character/itemEquipment/potential/potentialCondition";
import PotentialResponse from "../../types/character/itemEquipment/potential/potentialResponse";
import { isValidOptions } from "./potential";

const statRegex = /^(STR|DEX|INT|LUK)/;

export function calcConditionInfos(
  potentialInfos: PotentialResponse[]
): ConditionInfos {
  const conditionInfos: ConditionInfos = {};

  Object.values(groupBy(potentialInfos, "grade")).forEach(
    (potentialInfosAtGrade) => {
      const potentialInfosByName = groupBy(potentialInfosAtGrade, "name");

      return Object.values(
        putExceptionalPotentialInfos(potentialInfosByName)
      ).forEach((potentialInfosAtName) => {
        const infosByPos = groupBy(potentialInfosAtName, "position");
        const positionKeys = Object.keys(infosByPos).map(Number);

        addConditionInfoRecursivly(
          infosByPos,
          positionKeys,
          conditionInfos,
          [],
          0
        );
      });
    }
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
function putExceptionalPotentialInfos(potentialInfosByName: {
  [x: string]: PotentialResponse[];
}) {
  Object.keys(potentialInfosByName)
    .filter((name) => statRegex.test(name))
    .forEach((name) => {
      const allStatInfos =
        potentialInfosByName[name.replace(statRegex, "올스탯")];
      if (allStatInfos) potentialInfosByName[name].push(...allStatInfos);
    });

  return potentialInfosByName;
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

  const pos = positionKeys[depth];
  const indexes = new Array(potentialInfosByPos[pos].length)
    .fill(0)
    .map((_, i) => i);
  addConditionInfoRecursivly(
    potentialInfosByPos,
    positionKeys,
    conditionInfos,
    posAndIndexes,
    depth + 1
  );
  indexes.forEach((_, index) => {
    posAndIndexes.push({ pos, index });
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

export function calcProbabilityByConditions(
  conditionInfos: ConditionInfos,
  conditions: PotentialCondition[]
) {
  const probabilityByGrade: { [grade: string]: number } = {};

  getIntersectGrades(conditions).forEach((grade) => {
    const filteredPotentialInfoGridByName = conditions.map(({ name, value }) =>
      getFilteredPotentialInfoGrid(conditionInfos, name, value, grade)
    );
    addProbability(
      grade,
      filteredPotentialInfoGridByName,
      probabilityByGrade,
      [],
      0
    );
  });

  return probabilityByGrade;
}
function getIntersectGrades(conditions: PotentialCondition[]): string[] {
  if (conditions.length === 0) return [];

  let intersectGrades = [...conditions[0].grades];

  for (let i = 1; i < conditions.length; i++) {
    const currentGrades = conditions[i].grades;
    intersectGrades = intersectGrades.filter((grade) =>
      currentGrades.has(grade)
    );
    if (intersectGrades.length === 0) break;
  }

  return intersectGrades;
}
function getFilteredPotentialInfoGrid(
  conditionInfos: ConditionInfos,
  name: string,
  minValue: number,
  grade: string
) {
  return Object.entries(conditionInfos[name])
    .filter(([value]) => Number(value) >= minValue)
    .flatMap(([_, infosByValue]) =>
      infosByValue[grade] ? infosByValue[grade] : []
    );
}
function addProbability(
  grade: string,
  filteredPotentialInfoGridByName: PotentialResponse[][][],
  probabilityByGrade: { [grade: string]: number },
  indexes: number[],
  depth: number
) {
  const selectedPotentialInfosByName = indexes.map(
    (index, i) => filteredPotentialInfoGridByName[i][index]
  );
  if (!isCompatibleConditions(selectedPotentialInfosByName)) return;

  if (depth == filteredPotentialInfoGridByName.length) {
    if (!probabilityByGrade[grade]) probabilityByGrade[grade] = 0;
    probabilityByGrade[grade] += selectedPotentialInfosByName.reduce(
      (acc1, infos) =>
        acc1 * infos.reduce((acc2, info) => acc2 * info.probability, 1),
      1
    );

    return;
  }

  filteredPotentialInfoGridByName[depth].forEach((_, i) => {
    indexes.push(i);
    addProbability(
      grade,
      filteredPotentialInfoGridByName,
      probabilityByGrade,
      indexes,
      depth + 1
    );
    indexes.pop();
  });
}
function isCompatibleConditions(
  selectedPotentialInfosByName: PotentialResponse[][]
) {
  const positions = new Set<number>();

  for (const infos of selectedPotentialInfosByName) {
    for (const info of infos) {
      if (positions.has(info.position)) return false;
      positions.add(info.position);
    }
  }

  return isValidOptions(
    ["", "", ""],
    selectedPotentialInfosByName.flatMap((v) => v)
  );
}

export function isFitConditions(
  conditionGrid: PotentialCondition[][],
  potentialInfos: PotentialResponse[]
) {
  return conditionGrid.some((conditions) =>
    conditions.every(
      (condition) =>
        potentialInfos
          .filter(
            (info) =>
              info.name == condition.name ||
              (info.name.startsWith("올스탯") && statRegex.test(condition.name))
          )
          .reduce((acc, info) => (acc += info.value), 0) >= condition.value
    )
  );
}
