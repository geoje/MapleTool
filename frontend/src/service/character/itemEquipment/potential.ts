import { CharacterItemEquipmentDetail } from "../../../dto/character/characterItemEquipment";
import PotentialProbability from "../../../dto/character/itemEquipment/potentialProbability";
import CharacterService from "../character";
import {
  KOR_NAME,
  ADDITIONAL_RESET_COST,
  RESET_COST,
  ENG_NAME,
  UPGRADE_RATE,
  ADDITIONAL_UPGRADE_RATE,
  GURANTEE_BOUND,
  ADDITIONAL_GURANTEE_BOUND,
} from "./potentialConst";

export default abstract class PotentialService {
  static probabilities = new Map<string, PotentialProbability[]>();
  static additionalProbabilities = new Map<string, PotentialProbability[]>();

  static getMaxPotentialIndex(item: CharacterItemEquipmentDetail) {
    const gradeIndexes = [
      item.potential_option_grade,
      item.additional_potential_option_grade,
    ].map((grade) => KOR_NAME.findIndex((name) => name == grade));

    return Math.max(gradeIndexes[0], gradeIndexes[1]);
  }
  static getPotentialIconUrl(gradeIndex: number) {
    return `/item-equipment/potential/${ENG_NAME[gradeIndex]}.png`;
  }
  static getResetCost(level: number, gradeIndex: number) {
    const index = Math.max(
      0,
      Math.min(RESET_COST[0].values.length, gradeIndex)
    );
    const costs = RESET_COST.sort((a, b) => b.level - a.level);

    for (const cost of costs) {
      if (level >= cost.level) {
        return cost.values[index];
      }
    }
    return RESET_COST[0].values[index];
  }
  static getAdditionalResetCost(level: number, gradeIndex: number) {
    const index = Math.max(
      0,
      Math.min(ADDITIONAL_RESET_COST[0].values.length, gradeIndex)
    );
    const costs = ADDITIONAL_RESET_COST.sort((a, b) => b.level - a.level);

    for (const cost of costs) {
      if (level >= cost.level) {
        return cost.values[index];
      }
    }
    return ADDITIONAL_RESET_COST[0].values[index];
  }
  static pickNextGrade(grade: string, guarantee: number) {
    const index = KOR_NAME.indexOf(grade);
    if (index == -1 || index == KOR_NAME.length - 1) return grade;
    if (
      guarantee == GURANTEE_BOUND[index] ||
      Math.random() <= UPGRADE_RATE[index]
    )
      return KOR_NAME[index + 1];
    return grade;
  }
  static pickNextAdditionalGrade(grade: string, guarantee: number) {
    const index = KOR_NAME.indexOf(grade);
    if (index == -1 || index == KOR_NAME.length - 1) return grade;
    if (
      guarantee == ADDITIONAL_GURANTEE_BOUND[index] ||
      Math.random() <= ADDITIONAL_UPGRADE_RATE[index]
    )
      return KOR_NAME[index + 1];
    return grade;
  }
  static async pickRandomPotentials(
    part: string,
    grade: string,
    level: number
  ) {
    const key = JSON.stringify({ part, grade, level });
    if (!PotentialService.probabilities.has(key)) {
      const value = await CharacterService.requestPotential(part, grade, level);
      PotentialService.probabilities.set(key, value);
    }
    const probabilities = PotentialService.probabilities.get(key) ?? [];
    const result: PotentialProbability[] = [];
    const positions = new Set(probabilities.map((p) => p.position));

    positions.forEach((position) => {
      const probabilitiesAtPosition = probabilities.filter(
        (p) => p.position == position
      );
      const rand = Math.random();
      let cumul = 0;
      for (const p of probabilitiesAtPosition) {
        cumul += p.probability;
        if (rand < cumul) {
          result.push(p);
          return;
        }
      }
    });

    return result;
  }
  static async pickRandomAdditionalPotentials(
    part: string,
    grade: string,
    level: number
  ) {
    const key = JSON.stringify({ part, grade, level });
    if (!PotentialService.additionalProbabilities.has(key)) {
      const value = await CharacterService.requestPotential(part, grade, level);
      PotentialService.additionalProbabilities.set(key, value);
    }
    const probabilities =
      PotentialService.additionalProbabilities.get(key) ?? [];
    const result: PotentialProbability[] = [];
    const positions = new Set(probabilities.map((p) => p.position));

    positions.forEach((position) => {
      const probabilitiesAtPosition = probabilities.filter(
        (p) => p.position == position
      );
      const rand = Math.random();
      let cumul = 0;
      for (const p of probabilitiesAtPosition) {
        cumul += p.probability;
        if (rand < cumul) {
          result.push(p);
          return;
        }
      }
    });

    return result;
  }
}