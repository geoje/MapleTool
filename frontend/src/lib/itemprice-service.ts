export interface ItemPriceInfo {
  itemName: string;
  price: number;
  date: string;
}

const cache = new Map<string, ItemPriceInfo | null>();

export async function fetchItemPrice(itemName: string): Promise<ItemPriceInfo | null> {
  if (cache.has(itemName)) return cache.get(itemName) ?? null;

  try {
    const response = await fetch(`/api/itemprice?name=${encodeURIComponent(itemName)}`);
    const result = response.ok ? ((await response.json()) as ItemPriceInfo) : null;
    cache.set(itemName, result);
    return result;
  } catch {
    return null;
  }
}
