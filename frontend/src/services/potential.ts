import { MATERIAL_TYPE } from "../constants/enhance/material";
import {
  POTENTIAL_CRITERIA,
  POTENTIAL_GRADE,
  POTENTIAL_INFOS,
  POTENTIAL_TYPE,
} from "../constants/enhance/potential";
import { ItemEquipmentDetail } from "../types/character/itemEquipment/itemEquipment";
import PotentialResponse from "../types/character/itemEquipment/potential/potentialResponse";
import { Material } from "../types/user/enhancedItem";

export function parseGrade(grade: string) {
  if (!grade) return undefined;

  return Object.entries(POTENTIAL_INFOS).find(
    ([_, info]) => info.name == grade
  )?.[0] as POTENTIAL_GRADE;
}

export function getMaxGrade(item: ItemEquipmentDetail) {
  for (const [key, info] of Object.entries(POTENTIAL_INFOS).reverse()) {
    if (
      info.name != item.potential_option_grade &&
      info.name != item.additional_potential_option_grade
    )
      continue;

    return key as POTENTIAL_GRADE;
  }
  return undefined;
}

export function calcRollingMaterials(
  materialType: MATERIAL_TYPE,
  level: number,
  addi: boolean,
  grade: POTENTIAL_GRADE | undefined
): Material[] {
  const cube = ![
    MATERIAL_TYPE.POTENTIAL,
    MATERIAL_TYPE.POTENTIAL_ADDI,
  ].includes(materialType);

  const uses = [
    {
      name: "메소",
      value: cube
        ? calcEvaluateCost(level)
        : calcRollingCost(level, grade ?? POTENTIAL_GRADE.RARE, addi),
    },
  ];

  if (grade && cube)
    uses.push({
      name: POTENTIAL_INFOS[grade].name,
      value: 1,
    });

  return uses;
}
function calcRollingCost(level: number, grade: POTENTIAL_GRADE, addi: boolean) {
  const costByLevel =
    POTENTIAL_INFOS[grade].rolling[
      addi ? POTENTIAL_TYPE.ADDI : POTENTIAL_TYPE.NORMAL
    ];
  return costByLevel.find((costInfo) => level >= costInfo.level)?.cost ?? 0;
}
function calcEvaluateCost(level: number) {
  return level * level * (level > 120 ? 20 : level > 70 ? 2.5 : 0.25);
}

export function isAddi(materialType: MATERIAL_TYPE) {
  return [
    MATERIAL_TYPE.STRANGE_ADDI,
    MATERIAL_TYPE.ADDI,
    MATERIAL_TYPE.WHITE_ADDI,
    MATERIAL_TYPE.POTENTIAL_ADDI,
  ].includes(materialType);
}

export function isSelectable(materialType: MATERIAL_TYPE) {
  return [
    MATERIAL_TYPE.BLACK,
    MATERIAL_TYPE.WHITE_ADDI,
    MATERIAL_TYPE.POTENTIAL,
    MATERIAL_TYPE.POTENTIAL_ADDI,
  ].includes(materialType);
}

export function getOptions(item: ItemEquipmentDetail, addi: boolean) {
  return addi
    ? [
        item.potential_option_1,
        item.potential_option_2,
        item.potential_option_3,
      ]
    : [
        item.additional_potential_option_1,
        item.additional_potential_option_2,
        item.additional_potential_option_3,
      ];
}

export function nextPotential(
  probabilities: PotentialResponse[],
  options: string[],
  materialType: MATERIAL_TYPE,
  grade: POTENTIAL_GRADE | undefined,
  guarantee: number
) {
  const newGrade = nextGrade(materialType, grade, guarantee);
  const newOptions = nextValidOptions(probabilities, options, newGrade);

  return {
    grade: grade == newGrade ? undefined : newGrade,
    options: newOptions,
  };
}
function nextGrade(
  materialType: MATERIAL_TYPE,
  grade: POTENTIAL_GRADE | undefined,
  guarantee: number
) {
  if (!grade || !POTENTIAL_CRITERIA[materialType]) return POTENTIAL_GRADE.RARE;

  const criteria = POTENTIAL_CRITERIA[materialType][grade];
  if (guarantee == criteria.bound || Math.random() < criteria.upgrade) {
    const grades = Object.values(POTENTIAL_GRADE);
    const gradeIndex = Object.values(POTENTIAL_GRADE).indexOf(grade);
    return grades[gradeIndex + 1];
  }

  return grade;
}
function nextValidOptions(
  probabilities: PotentialResponse[],
  options: string[],
  grade: POTENTIAL_GRADE
) {
  const newOptions: PotentialResponse[] = [];
  const gradeName = POTENTIAL_INFOS[grade].name;
  const probabilitiesByGrade = probabilities.filter(
    (p) => p.grade == gradeName
  );
  const probabilitiesByPos = groupByPosition(probabilitiesByGrade);

  do {
    probabilitiesByPos.forEach((probabilitiesAtPos) => {
      const rand = Math.random();
      let cumul = 0;
      probabilitiesAtPos.forEach((p) => {
        cumul += p.probability;
        if (rand < cumul) {
          newOptions.push(p);
          return;
        }
      });
    });
  } while (!isValidOptions(options, newOptions));

  return newOptions;
}
function groupByPosition(probabilities: PotentialResponse[]) {
  const groupedData: { [key: number]: PotentialResponse[] } = {};

  probabilities.forEach((item) => {
    const pos = item.position;
    if (!groupedData[pos]) {
      groupedData[pos] = [];
    }
    groupedData[pos].push(item);
  });

  return Object.values(groupedData);
}
function isValidOptions(
  prevOptions: string[],
  newOptions: PotentialResponse[]
) {
  return true;
}

export function formatOptions(options: PotentialResponse[]) {
  return options.map((p) => p.name.replace("n", p.value.toString()));
}
