import { fetchItemPrices, type ItemPrice } from "./price-scraper.js";

const ONE_HOUR_MS = 60 * 60 * 1000;

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
    console.log(`[src/price-store.ts] refreshed ${prices.length} item prices`);
  } catch (error) {
    console.error("[src/price-store.ts] Failed to refresh item prices:", error);
  }
}

function msUntilNextHour(): number {
  const now = new Date();
  const next = new Date(now);
  next.setMinutes(0, 0, 0);
  next.setHours(next.getHours() + 1);
  return next.getTime() - now.getTime();
}

// Fetches once immediately on startup, then aligns to the top of the hour and
// repeats every hour on the hour from there.
export function startItemPriceSchedule(): void {
  refreshItemPrices();

  setTimeout(() => {
    refreshItemPrices();
    setInterval(refreshItemPrices, ONE_HOUR_MS);
  }, msUntilNextHour());
}
