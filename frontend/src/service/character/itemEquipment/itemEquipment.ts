import {
  CharacterItemEquipment,
  CharacterItemEquipmentDetail,
} from "../../../dto/character/characterItemEquipment";
import PotentialProbability from "../../../dto/character/itemEquipment/potentialProbability";
import CharacterService from "../character";
import { MAX_STARFORCE_COUNTS, SLOT_GRID } from "./itemEquipmentConst";
import {
  KOR_NAME,
  ADDITIONAL_RESET_COST,
  RESET_COST,
  ENG_NAME,
} from "./potentialConst";

interface Search {
  part: string;
  grade: string;
  level: number;
}

export default abstract class ItemEquipmentService {
  static probabilities = new Map<string, PotentialProbability[]>();

  static itemGrid(
    itemEquipment: CharacterItemEquipment,
    preset: number
  ): (CharacterItemEquipmentDetail | undefined)[][] {
    const details =
      preset == 1
        ? itemEquipment.item_equipment_preset_1
        : preset == 2
        ? itemEquipment.item_equipment_preset_2
        : preset == 3
        ? itemEquipment.item_equipment_preset_3
        : itemEquipment.item_equipment_preset_1;

    return SLOT_GRID.map((slots) =>
      slots.map((slot) =>
        slot.length
          ? details.find((item) => item.item_equipment_slot == slot)
          : undefined
      )
    );
  }
  static getMaxPotentialIndex(item: CharacterItemEquipmentDetail) {
    const gradeIndexes = [
      item.potential_option_grade,
      item.additional_potential_option_grade,
    ].map((grade) => KOR_NAME.findIndex((name) => name == grade));

    return Math.max(gradeIndexes[0], gradeIndexes[1]);
  }
  static getMaxStarforceCount(item: CharacterItemEquipmentDetail) {
    if (
      [
        item.scroll_upgrade,
        item.scroll_upgradeable_count,
        item.scroll_resilience_count,
      ].every((upgrade) => upgrade == "0")
    ) {
      return 0;
    }

    // TODO: calculate for superior
    for (const startforceCount of MAX_STARFORCE_COUNTS) {
      if (item.item_base_option.base_equipment_level >= startforceCount.level) {
        return startforceCount.common;
      }
    }
    return MAX_STARFORCE_COUNTS[MAX_STARFORCE_COUNTS.length - 1].common;
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
  static async pickRandomPotentials(
    part: string,
    grade: string,
    level: number
  ) {
    const key = JSON.stringify({ part, grade, level });
    if (!ItemEquipmentService.probabilities.has(key)) {
      const value = await CharacterService.requestPotential(part, grade, level);
      ItemEquipmentService.probabilities.set(key, value);
    }
    const probabilities = ItemEquipmentService.probabilities.get(key) ?? [];
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
