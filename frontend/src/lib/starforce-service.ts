import {
  BASE_RESTORE_TARGET_STAR,
  PULSE_ENHANCER_TABLE,
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
  // Meso saved at this step versus a plain retry, only meaningful when useSafeguard/useRestore is true.
  protectionSavings: number;
}

const SAFEGUARD_STAR_SET = new Set<number>(SAFEGUARD_STARS);
const RESTORE_STAR_SET = new Set<number>(RESTORE_AVAILABLE_STARS);

// Computes the expected meso / expected spare (fodder) count needed to "succeed" enhancing from star n to n+1.
// On destroy there are three choices, and at each star we greedily pick whichever has the lowest total expected cost:
//  - Base restore: consume one spare and drop back to BASE_RESTORE_TARGET_STAR (12), then re-climb from there.
//    This is a guaranteed game mechanic, not an optional purchase, so it's always the fallback.
//  - Safeguard (stars 15-17): destroy is absorbed into maintain, but the enhancement cost triples
//  - Destroy restore (stars 15-22, specific levels): pay a fixed meso + equipment cost to retry immediately at the same star
// Since a smaller accumulated cost at an earlier step also shrinks the "retry" cost of every later step,
// the locally optimal choice at each step is also globally optimal (no backward references, so a single DP pass suffices).
export function computeStarforceTable(options: StarforceStepOptions, starCount = 29): StarforceStepResult[] {
  const { level, spareValue, costDiscountRate, destroyReductionActive, restoreMesoDiscountActive } = options;
  const results: StarforceStepResult[] = [];

  let cumulativeCost = 0;
  let cumulativeSpareCount = 0;
  // Cost to reach BASE_RESTORE_TARGET_STAR from 0, snapshotted once the loop reaches that star.
  // No matching spare-count snapshot is needed: destroy is 0 for every star below 15 (see
  // STARFORCE_PROBABILITIES), so the expected spare count accumulated by star 12 is always 0.
  let cumulativeCostAtBaseRestore = 0;

  for (let star = 0; star < starCount; star++) {
    if (star === BASE_RESTORE_TARGET_STAR) {
      cumulativeCostAtBaseRestore = cumulativeCost;
    }

    const [success, , baseDestroy] = STARFORCE_PROBABILITIES[star];
    let destroy = baseDestroy;
    if (destroyReductionActive && star <= 21 && destroy > 0) {
      destroy -= destroy * 0.3;
    }

    const baseCost = getStarforceCost(level, star) ?? 0;
    const cost = baseCost * (1 - costDiscountRate);

    // Option 1: base restore (drop to star 12 on destroy, re-climbing only the cost accrued since then)
    const costSinceBaseRestore = cumulativeCost - cumulativeCostAtBaseRestore;
    let bestCost = (cost + destroy * costSinceBaseRestore) / success;
    let bestSpareCount = (destroy * (1 + cumulativeSpareCount)) / success;
    let bestTotal = bestCost + bestSpareCount * spareValue;
    const plainTotal = bestTotal;
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

    // expectedCost is shown to the user as the full economic cost (meso + spare count valued at
    // spareValue), so it moves with the 노작 가격 input even when the chosen option doesn't change.
    // cumulativeCost/cumulativeSpareCount must keep tracking the pure meso/spare figures, though,
    // since that's what a future destroy-and-retry actually has to repay.
    const protectionSavings = useSafeguard || useRestore ? plainTotal - bestTotal : 0;
    results.push({
      star,
      expectedCost: bestTotal,
      expectedSpareCount: bestSpareCount,
      useSafeguard,
      useRestore,
      protectionSavings,
    });
    cumulativeCost += bestCost;
    cumulativeSpareCount += bestSpareCount;
  }

  return results;
}

// Computes the expected 펄스 인핸서 count / expected new-ring count needed to "succeed" enhancing
// the Ascendant Pulse Ring from star n to n+1. Reuses StarforceStepResult's shape so the starforce
// panel can render both tables the same way, but expectedCost here means "펄스 인핸서 consumed",
// not meso.
//
// 파괴방지 (safeguard/파방) is intentionally never applied here, by product decision - even though
// PULSE_ENHANCER_TABLE's protectConsume documents its real (3x enhancer) cost, the ring is treated
// as always risking destroy. 파괴복구 (destroy restore/파복) is instead borrowed wholesale from a
// normal level-130 item's RESTORE_TABLE mechanic (paid in meso, using spareValue - the ring's
// hardcoded 3억 price - as the meso value of the "spare" it consumes), auto-selected whenever it's
// cheaper than the plain path (destroy -> buy a whole new ring, re-climbing from star 0). The two
// options are compared purely in meso (spare-ring cost avoided vs. restore's own meso+spare fee) -
// there's no known meso price for a single 펄스 인핸서 to fold the enhancer side into that
// comparison, so it's left out of the decision (mirrored in computeStarforceTable's spareValue-only
// comparisons too).
export function computePulseEnhancerTable(
  level: number,
  spareValue: number,
  restoreMesoDiscountActive: boolean,
): StarforceStepResult[] {
  const results: StarforceStepResult[] = [];

  let cumulativeEnhancerCount = 0;
  let cumulativeSpareCount = 0;

  for (const { star, consume, successRate, destroyRate } of PULSE_ENHANCER_TABLE) {
    // Option 1 (plain): destroy loses the ring outright - buy a new one (spareValue) and
    // re-climb the enhancer cost accrued since star 0.
    let enhancerCount = (consume + destroyRate * cumulativeEnhancerCount) / successRate;
    let spareCount = (destroyRate * (1 + cumulativeSpareCount)) / successRate;
    const plainMesoEquivalent = spareCount * spareValue;
    let bestMesoEquivalent = plainMesoEquivalent;
    let useRestore = false;

    // Option 2 (restore): pay meso + consume some spare rings to retry the same star immediately,
    // so destroy never forces a re-climb from 0.
    const restoreInfo = RESTORE_TABLE[level]?.[star];
    if (restoreInfo && restoreInfo[0] > 0 && restoreInfo[1] > 0 && destroyRate > 0) {
      const [restoreSpareCount, restoreMesoEok] = restoreInfo;
      const restoreMesoCost = restoreMesoEok * 100_000_000 * (restoreMesoDiscountActive ? 0.8 : 1);
      const restoreEnhancerCount = consume / successRate;
      const restoreMesoFee = (destroyRate * restoreMesoCost) / successRate;
      const restoreSpareCount2 = (destroyRate * restoreSpareCount) / successRate;
      const restoreMesoEquivalent = restoreMesoFee + restoreSpareCount2 * spareValue;

      if (restoreMesoEquivalent < bestMesoEquivalent) {
        enhancerCount = restoreEnhancerCount;
        spareCount = restoreSpareCount2;
        bestMesoEquivalent = restoreMesoEquivalent;
        useRestore = true;
      }
    }

    const protectionSavings = useRestore ? plainMesoEquivalent - bestMesoEquivalent : 0;
    results.push({
      star,
      expectedCost: enhancerCount,
      expectedSpareCount: spareCount,
      useSafeguard: false,
      useRestore,
      protectionSavings,
    });

    cumulativeEnhancerCount += enhancerCount;
    cumulativeSpareCount += spareCount;
  }

  return results;
}
