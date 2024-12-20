import { MAX_POTENTIALS } from "../../constants/enhance/potential";
import ConditionInfos from "../../types/character/itemEquipment/potential/conditionInfos";
import PotentialCondition from "../../types/character/itemEquipment/potential/potentialCondition";
import PotentialResponse from "../../types/character/itemEquipment/potential/potentialResponse";
import { isValidOptions } from "./potential";

const REGEX_STAT = /^(STR|DEX|INT|LUK)/;
const NAME_ALLSTAT = "올스탯";

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
    .filter((name) => REGEX_STAT.test(name))
    .forEach((name) => {
      const allStatInfos =
        potentialInfosByName[name.replace(REGEX_STAT, NAME_ALLSTAT)];
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
  potentialInfos: PotentialResponse[],
  conditionInfos: ConditionInfos,
  conditions: PotentialCondition[]
) {
  const probabilityByGrade: { [grade: string]: number } = {};
  const uniqueNames = [
    ...new Set(conditions.map((condition) => condition.name)),
  ];

  getIntersectGrades(conditions).forEach((grade) => {
    const filteredPotentialInfoGridByName = conditions.map(({ name, value }) =>
      getFilteredPotentialInfoGrid(conditionInfos, name, value, grade)
    );
    const potentialInfosForNamesByPosition = groupBy(
      potentialInfos.filter(
        (info) =>
          info.grade == grade &&
          uniqueNames.some((name) => isCompatibleName(name, info.name))
      ),
      "position"
    );
    addProbability(
      grade,
      filteredPotentialInfoGridByName,
      potentialInfosForNamesByPosition,
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
function isCompatibleName(name: string, compareName: string) {
  return (
    name == compareName ||
    (REGEX_STAT.test(name) &&
      name.replace(REGEX_STAT, NAME_ALLSTAT) == compareName)
  );
}
function addProbability(
  grade: string,
  filteredPotentialInfoGridByName: PotentialResponse[][][],
  potentialInfosForNamesByPosition: { [position: number]: PotentialResponse[] },
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

    let probability = selectedPotentialInfosByName.reduce(
      (acc1, infos) =>
        acc1 * infos.reduce((acc2, info) => acc2 * info.probability, 1),
      1
    );
    probability *= calcBlankProbability(
      potentialInfosForNamesByPosition,
      selectedPotentialInfosByName
    );

    probabilityByGrade[grade] += probability;
    return;
  }

  filteredPotentialInfoGridByName[depth].forEach((_, i) => {
    indexes.push(i);
    addProbability(
      grade,
      filteredPotentialInfoGridByName,
      potentialInfosForNamesByPosition,
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
    new Array(MAX_POTENTIALS).fill(""),
    selectedPotentialInfosByName.flatMap((v) => v)
  );
}
function calcBlankProbability(
  potentialInfosForNamesByPosition: { [position: number]: PotentialResponse[] },
  selectedPotentialInfosByName: PotentialResponse[][]
) {
  const names = [
    ...new Set(
      Object.values(potentialInfosForNamesByPosition).flatMap((infos) =>
        infos.map((info) => info.name)
      )
    ),
  ];

  const positions = selectedPotentialInfosByName.flatMap((infos) =>
    infos.map((info) => info.position)
  );
  const allPositions = new Array(MAX_POTENTIALS).fill(0).map((_, i) => i);
  const unusedPositions = allPositions.filter(
    (pos) => !positions.includes(pos)
  );

  return unusedPositions.reduce(
    (acc1, pos) =>
      acc1 *
      (1 -
        potentialInfosForNamesByPosition[pos]
          .filter((info) =>
            names.some((name) => isCompatibleName(info.name, name))
          )
          .reduce((acc2, info) => acc2 + info.probability, 0)),
    1
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
              (info.name.startsWith(NAME_ALLSTAT) &&
                REGEX_STAT.test(condition.name))
          )
          .reduce((acc, info) => (acc += info.value), 0) >= condition.value
    )
  );
}
