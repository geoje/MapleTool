import { fetchMesoMarketRate, type MesoMarketRate } from "./mesomarket-scraper.js";
import { runHourlyAligned } from "./schedule.js";

let latestRate: MesoMarketRate | null = null;

export function getMesoMarketRate(): MesoMarketRate | null {
  return latestRate;
}

async function refreshMesoMarketRate(): Promise<void> {
  try {
    latestRate = await fetchMesoMarketRate();
    console.log(`[src/mesomarket-store.ts] refreshed mesomarket rate: ${latestRate.pointsPerHundredMillionMeso} points/1억`);
  } catch (error) {
    console.error("[src/mesomarket-store.ts] Failed to refresh mesomarket rate:", error);
  }
}

// Fetches once immediately on startup, then aligns to the top of the hour and repeats every hour
// on the hour from there.
export function startMesoMarketSchedule(): void {
  runHourlyAligned(refreshMesoMarketRate);
}
