export interface MesoMarketRate {
  // How many 메이플포인트 (Maple Points) trade for 1억 (100,000,000) meso.
  pointsPerHundredMillionMeso: number;
  capturedAt: string;
}

let cache: MesoMarketRate | null | undefined;

export async function fetchMesoMarketRate(): Promise<MesoMarketRate | null> {
  if (cache !== undefined) return cache;

  try {
    const response = await fetch("/api/mesomarket");
    cache = response.ok ? ((await response.json()) as MesoMarketRate) : null;
    return cache;
  } catch {
    cache = null;
    return null;
  }
}

export function convertPointsToMeso(points: number, rate: MesoMarketRate): number {
  return Math.round((points / rate.pointsPerHundredMillionMeso) * 100_000_000);
}
