import { MATERIAL_TYPE } from "../constants/enhance/material";
import {
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
  grade?: POTENTIAL_GRADE
): Material[] {
  if (!grade) return [];

  const cube = ![
    MATERIAL_TYPE.POTENTIAL,
    MATERIAL_TYPE.POTENTIAL_ADDI,
  ].includes(materialType);
  const uses = [
    {
      name: "메소",
      value: cube
        ? calcEvaluateCost(level)
        : calcRollingCost(level, grade, addi),
    },
  ];

  if (cube)
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
  return costByLevel.find((costInfo) => costInfo.level >= level)?.cost ?? 0;
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

export function nextOptions(
  prevOptions: string[],
  probabilities: PotentialResponse[]
) {
  return ["", "", ""];
}
function isValidOptions(prevOptions: string[], newOptions: string[]) {
  for (let i = 0; i < newOptions.length; i++) {
    if (prevOptions[i] != newOptions[i]) return true;
  }

  return false;
}
