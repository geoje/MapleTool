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
  GUARANTEE_BOUND,
  ADDITIONAL_GUARANTEE_BOUND,
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
  static getResetCost(level: number | undefined, gradeIndex: number) {
    if (level == undefined) return 0;
    const index = Math.max(0, gradeIndex);
    const costs = RESET_COST.sort((a, b) => b.level - a.level);

    for (const cost of costs) {
      if (level >= cost.level) {
        return cost.values[index];
      }
    }
    return RESET_COST[0].values[index];
  }
  static getAdditionalResetCost(level: number | undefined, gradeIndex: number) {
    if (level == undefined) return 0;
    const index = Math.max(0, gradeIndex);
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
    if (index == -1) return KOR_NAME[0];
    if (index == KOR_NAME.length - 1) return grade;
    if (
      guarantee == GUARANTEE_BOUND[index] ||
      Math.random() <= UPGRADE_RATE[index]
    )
      return KOR_NAME[index + 1];
    return grade;
  }
  static pickNextAdditionalGrade(grade: string, guarantee: number) {
    const index = KOR_NAME.indexOf(grade);
    if (index == -1) return KOR_NAME[0];
    if (index == KOR_NAME.length - 1) return grade;
    if (
      guarantee == ADDITIONAL_GUARANTEE_BOUND[index] ||
      Math.random() <= ADDITIONAL_UPGRADE_RATE[index]
    )
      return KOR_NAME[index + 1];
    return grade;
  }
  static async getOrRequestProbabilities(
    part: string,
    grade: string,
    level: number
  ) {
    const key = JSON.stringify({ part, grade, level });
    if (!PotentialService.probabilities.has(key)) {
      const value = await CharacterService.requestPotential(part, grade, level);
      PotentialService.probabilities.set(key, value);
    }
    return PotentialService.probabilities.get(key) ?? [];
  }
  static async getOrRequestAdditionalProbabilities(
    part: string,
    grade: string,
    level: number
  ) {
    const key = JSON.stringify({ part, grade, level });
    if (!PotentialService.additionalProbabilities.has(key)) {
      const value = await CharacterService.requestAdditionalPotential(
        part,
        grade,
        level
      );
      PotentialService.additionalProbabilities.set(key, value);
    }
    return PotentialService.additionalProbabilities.get(key) ?? [];
  }
  static async pickRandomPotentials(
    part: string,
    grade: string,
    level: number
  ) {
    const probabilities = await PotentialService.getOrRequestProbabilities(
      part,
      grade,
      level
    );
    const result: PotentialProbability[] = [];
    const positions = new Set(probabilities.map((p) => p.position));

    // TODO: 3줄 안나오는 것 제거
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
    const probabilities =
      await PotentialService.getOrRequestAdditionalProbabilities(
        part,
        grade,
        level
      );
    const result: PotentialProbability[] = [];
    const positions = new Set(probabilities.map((p) => p.position));

    // TODO: 3줄 안나오는 것 제거
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
