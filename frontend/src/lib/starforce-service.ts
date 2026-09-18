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

// Computes the expected meso / expected spare (fodder) count needed to "succeed" enhancing from star n to n+1.
// On destroy there are three choices, and at each star we greedily pick whichever has the lowest total expected cost:
//  - Plain retry: re-enhance from star 0 up to this star with a new spare (paying the accumulated cost again)
//  - Safeguard (stars 15-17): destroy is absorbed into maintain, but the enhancement cost triples
//  - Destroy restore (stars 15-22, specific levels): pay a fixed meso + equipment cost to retry immediately at the same star
// Since a smaller accumulated cost at an earlier step also shrinks the "retry" cost of every later step,
// the locally optimal choice at each step is also globally optimal (no backward references, so a single DP pass suffices).
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

    // Option 1: plain retry
    let bestCost = (cost + destroy * cumulativeCost) / success;
    let bestSpareCount = (destroy * (1 + cumulativeSpareCount)) / success;
    let bestTotal = bestCost + bestSpareCount * spareValue;
    let useSafeguard = false;
    let useRestore = false;

    // Option 2: safeguard
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

    // Option 3: destroy restore
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
