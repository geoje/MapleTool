import { fetchMaplechartRate, type MaplechartRate } from "./maplechart-scraper.js";
import { runHourlyAligned } from "./schedule.js";

let latestRate: MaplechartRate | null = null;

export function getMaplechartRate(): MaplechartRate | null {
  return latestRate;
}

async function refreshMaplechartRate(): Promise<void> {
  try {
    latestRate = await fetchMaplechartRate();
    console.log(`[src/maplechart-store.ts] refreshed maplechart rate: ${latestRate.pointsPerHundredMillionMeso} points/1억`);
  } catch (error) {
    console.error("[src/maplechart-store.ts] Failed to refresh maplechart rate:", error);
  }
}

// Fetches once immediately on startup, then aligns to the top of the hour and repeats every hour
// on the hour from there.
export function startMaplechartSchedule(): void {
  runHourlyAligned(refreshMaplechartRate);
}
