import { fetchMapleSundayInfo, type MapleSundayInfo } from "./maplesunday-scraper.js";
import { runHourlyAligned } from "./schedule.js";

let latestInfo: MapleSundayInfo | null = null;

export function getMapleSundayInfo(): MapleSundayInfo | null {
  return latestInfo;
}

async function refreshMapleSundayInfo(): Promise<void> {
  try {
    latestInfo = await fetchMapleSundayInfo();
    console.log(`[src/maplesunday-store.ts] refreshed maplesunday info: ${latestInfo.date} ${latestInfo.benefit}`);
  } catch (error) {
    console.error("[src/maplesunday-store.ts] Failed to refresh maplesunday info:", error);
  }
}

// Fetches once immediately on startup, then aligns to the top of the hour and repeats every hour
// on the hour from there.
export function startMapleSundaySchedule(): void {
  runHourlyAligned(refreshMapleSundayInfo);
}
