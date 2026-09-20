export interface ItemPriceInfo {
  itemName: string;
  price: number;
  date: string;
}

const cache = new Map<string, ItemPriceInfo | null>();

export async function fetchItemPrice(itemName: string): Promise<ItemPriceInfo | null> {
  if (cache.has(itemName)) return cache.get(itemName) ?? null;

  try {
    const response = await fetch(`/api/price?name=${encodeURIComponent(itemName)}`);
    const result = response.ok ? ((await response.json()) as ItemPriceInfo) : null;
    cache.set(itemName, result);
    return result;
  } catch {
    return null;
  }
}

// yyyy-mm-dd is parsed as local-midnight (not UTC), so "0일 전" holds until local midnight rolls over.
export function describeDaysAgo(dateIso: string): string {
  const [year, month, day] = dateIso.split("-").map(Number);
  const priceDay = new Date(year, month - 1, day).getTime();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const daysAgo = Math.max(0, Math.round((today - priceDay) / 86_400_000));
  return daysAgo === 0 ? "오늘 시세" : `${daysAgo}일 전 시세`;
}
