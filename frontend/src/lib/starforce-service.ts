import {
  RESTORE_AVAILABLE_STARS,
  RESTORE_TABLE,
  SAFEGUARD_COST_MULTIPLIER,
  SAFEGUARD_STARS,
  STARFORCE_PROBABILITIES,
} from "@/constants/starforce";

// KMS StarForce base cost per attempt (no safeguard/discount/event applied).
// star = current star before the attempt (0-29, i.e. cost of star -> star+1).
// Divisors verified against the live client formula and cross-checked against
// published expected-cost tables (see computeStarforceTable below).
const HIGH_STAR_DIVISORS: Record<number, number> = {
  10: 571,
  11: 314,
  12: 214,
  13: 157,
  14: 107,
  17: 150,
  18: 70,
  19: 45,
  21: 125,
};
const DEFAULT_HIGH_STAR_DIVISOR = 200;

export function getStarforceCost(level: number, star: number): number | undefined {
  if (star < 0 || star > 29) return undefined;

  if (star <= 9) {
    return 100 * Math.round((1000 + (level ** 3 * (star + 1)) / 36) / 100);
  }

  const n = level ** 3 * (star + 1) ** 2.7;
  const divisor = HIGH_STAR_DIVISORS[star] ?? DEFAULT_HIGH_STAR_DIVISOR;
  return 1000 + 100 * Math.round(n / divisor / 100);
}

// Max achievable star by equip level bracket.
export function getMaxStar(level: number): number {
  if (level <= 94) return 5;
  if (level <= 107) return 8;
  if (level <= 117) return 10;
  if (level <= 127) return 15;
  if (level <= 137) return 20;
  return 30;
}

export interface StarforceStepOptions {
  level: number;
  spareValue: number;
  costDiscountRate: number;
  destroyReductionActive: boolean;
  restoreMesoDiscountActive: boolean;
}

export interface StarforceStepResult {
  star: number;
  expectedCost: number;
  expectedSpareCount: number;
  useSafeguard: boolean;
  useRestore: boolean;
}

const SAFEGUARD_STAR_SET = new Set<number>(SAFEGUARD_STARS);
const RESTORE_STAR_SET = new Set<number>(RESTORE_AVAILABLE_STARS);

// 성 n에서 n+1로 강화를 "성공시키는 데" 필요한 기대 메소/기대 노작(스페어) 개수를 계산한다.
// 파괴 시 선택지는 세 가지이며, 매 성마다 총 기대비용이 가장 낮은 선택을 그리디하게 고른다:
//  - 그냥 재도전: 새 노작으로 0성부터 이 성까지 다시 강화 (지금까지의 누적비용을 다시 지불)
//  - 파괴방지(15~17성): 파괴가 유지로 흡수되지만 강화비용이 3배
//  - 파괴복구(15~22성, 특정 레벨): 고정 메소+장비를 지불하고 같은 성에서 바로 재도전
// 앞 단계의 누적비용이 작아질수록 이후 모든 단계의 "재도전" 비용도 함께 작아지므로,
// 매 단계에서의 로컬 최적 선택이 곧 전체 구간의 최적 선택이 된다 (역행 참조가 없어 DP 한 번으로 충분).
export function computeStarforceTable(options: StarforceStepOptions, starCount = 29): StarforceStepResult[] {
  const { level, spareValue, costDiscountRate, destroyReductionActive, restoreMesoDiscountActive } = options;
  const results: StarforceStepResult[] = [];

  let cumulativeCost = 0;
  let cumulativeSpareCount = 0;

  for (let star = 0; star < starCount; star++) {
    const [success, , baseDestroy] = STARFORCE_PROBABILITIES[star];
    let destroy = baseDestroy;
    if (destroyReductionActive && star <= 21 && destroy > 0) {
      destroy -= destroy * 0.3;
    }

    const baseCost = getStarforceCost(level, star) ?? 0;
    const cost = baseCost * (1 - costDiscountRate);

    // 옵션 1: 그냥 재도전
    let bestCost = (cost + destroy * cumulativeCost) / success;
    let bestSpareCount = (destroy * (1 + cumulativeSpareCount)) / success;
    let bestTotal = bestCost + bestSpareCount * spareValue;
    let useSafeguard = false;
    let useRestore = false;

    // 옵션 2: 파괴방지
    if (SAFEGUARD_STAR_SET.has(star) && destroy > 0) {
      const safeguardCost = (cost * SAFEGUARD_COST_MULTIPLIER) / success;
      if (safeguardCost < bestTotal) {
        bestCost = safeguardCost;
        bestSpareCount = 0;
        bestTotal = safeguardCost;
        useSafeguard = true;
        useRestore = false;
      }
    }

    // 옵션 3: 파괴복구
    if (RESTORE_STAR_SET.has(star) && destroy > 0) {
      const restoreInfo = RESTORE_TABLE[level]?.[star];
      if (restoreInfo && restoreInfo[0] > 0 && restoreInfo[1] > 0) {
        const [restoreSpareCount, restoreMesoEok] = restoreInfo;
        const restoreMesoCost = restoreMesoEok * 100_000_000 * (restoreMesoDiscountActive ? 0.8 : 1);
        const restoreCost = (cost + destroy * restoreMesoCost) / success;
        const restoreSpare = (destroy * restoreSpareCount) / success;
        const restoreTotal = restoreCost + restoreSpare * spareValue;
        if (restoreTotal < bestTotal) {
          bestCost = restoreCost;
          bestSpareCount = restoreSpare;
          bestTotal = restoreTotal;
          useSafeguard = false;
          useRestore = true;
        }
      }
    }

    results.push({ star, expectedCost: bestCost, expectedSpareCount: bestSpareCount, useSafeguard, useRestore });
    cumulativeCost += bestCost;
    cumulativeSpareCount += bestSpareCount;
  }

  return results;
}
