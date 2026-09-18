// KMS StarForce base cost per attempt (no safeguard/discount/event applied).
// star = current star before the attempt (0-29, i.e. cost of star -> star+1).
const HIGH_STAR_DIVISORS: Record<number, number> = {
  10: 40000,
  11: 22000,
  12: 15000,
  13: 11000,
  14: 7500,
  15: 20000,
  16: 20000,
  17: 15000,
  18: 7000,
  19: 4500,
  20: 20000,
  21: 12500,
  22: 20000,
  23: 20000,
  24: 20000,
  25: 20000,
  26: 20000,
  27: 20000,
  28: 20000,
  29: 20000,
};

export function getStarforceCost(level: number, star: number): number | undefined {
  if (star < 0 || star > 29) return undefined;

  if (star < 10) {
    return 100 * Math.round(10 + (level ** 3 * (star + 1)) / 2500);
  }

  return 100 * Math.round(10 + (level ** 3 * (star + 1) ** 2.7) / HIGH_STAR_DIVISORS[star]);
}
