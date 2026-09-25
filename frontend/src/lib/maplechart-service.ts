export interface MaplechartRate {
  // How many 메이플포인트 (Maple Points) trade for 1억 (100,000,000) meso.
  pointsPerHundredMillionMeso: number;
  capturedAt: string;
}

let cache: MaplechartRate | null | undefined;

export async function fetchMaplechartRate(): Promise<MaplechartRate | null> {
  if (cache !== undefined) return cache;

  try {
    const response = await fetch("/api/maplechart");
    cache = response.ok ? ((await response.json()) as MaplechartRate) : null;
    return cache;
  } catch {
    cache = null;
    return null;
  }
}

export function convertPointsToMeso(points: number, rate: MaplechartRate): number {
  return Math.round((points / rate.pointsPerHundredMillionMeso) * 100_000_000);
}
