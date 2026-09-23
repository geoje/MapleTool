export const MESO_MARKET_URL = "https://maplechart.com/api/mesomarket/latest";

interface MesoMarketResponse {
  latest: { avg: number; captured_at: string };
}

export interface MesoMarketRate {
  // How many 메이플포인트 (Maple Points) trade for 1억 (100,000,000) meso.
  pointsPerHundredMillionMeso: number;
  capturedAt: string;
}

export async function fetchMesoMarketRate(): Promise<MesoMarketRate> {
  const response = await fetch(MESO_MARKET_URL, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Failed to fetch mesomarket rate: ${response.status}`);

  const { latest } = (await response.json()) as MesoMarketResponse;
  return { pointsPerHundredMillionMeso: latest.avg, capturedAt: latest.captured_at };
}
