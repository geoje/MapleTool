import { fetchItemPrices, type ItemPrice } from "./itemprice-scraper.js";
import { runHourlyAligned } from "./schedule.js";

// Keyed by item name; each refresh overwrites with the latest snapshot, so
// only the most recent price per item is ever kept in memory.
const store = new Map<string, ItemPrice>();

export function getItemPrice(itemName: string): ItemPrice | undefined {
  return store.get(itemName);
}

async function refreshItemPrices(): Promise<void> {
  try {
    const prices = await fetchItemPrices();
    for (const price of prices) store.set(price.itemName, price);
    console.log(`[src/itemprice-store.ts] refreshed ${prices.length} item prices`);
  } catch (error) {
    console.error("[src/itemprice-store.ts] Failed to refresh item prices:", error);
  }
}

// Fetches once immediately on startup, then aligns to the top of the hour and
// repeats every hour on the hour from there.
export function startItemPriceSchedule(): void {
  runHourlyAligned(refreshItemPrices);
}
