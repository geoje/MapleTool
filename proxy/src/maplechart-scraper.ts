export const MAPLECHART_URL = "https://maplechart.com/api/mesomarket/latest";

interface MaplechartResponse {
  latest: { avg: number; captured_at: string };
}

export interface MaplechartRate {
  // How many 메이플포인트 (Maple Points) trade for 1억 (100,000,000) meso.
  pointsPerHundredMillionMeso: number;
  capturedAt: string;
}

const REQUEST_TIMEOUT_MS = 60_000;

export async function fetchMaplechartRate(): Promise<MaplechartRate> {
  const response = await fetch(MAPLECHART_URL, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Failed to fetch maplechart rate: ${response.status}`);

  const { latest } = (await response.json()) as MaplechartResponse;
  return { pointsPerHundredMillionMeso: latest.avg, capturedAt: latest.captured_at };
}
