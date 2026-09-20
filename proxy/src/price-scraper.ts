export const CLEAN_TICKER_URL = "https://api.itemprice.kr/api-next/clean-ticker";

interface CleanTickerRow {
  item_name: string;
  price_meso: number;
  captured_day: number;
}

interface CleanTickerResponse {
  rows: CleanTickerRow[];
}

export interface ItemPrice {
  itemName: string;
  price: number;
  date: string;
}

function toIsoDate(capturedDay: number): string {
  const text = String(capturedDay);
  return `${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}`;
}

export async function fetchItemPrices(): Promise<ItemPrice[]> {
  const response = await fetch(CLEAN_TICKER_URL, { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error(`Failed to fetch clean-ticker: ${response.status}`);

  const { rows } = (await response.json()) as CleanTickerResponse;
  return rows.map((row) => ({
    itemName: row.item_name,
    price: row.price_meso,
    date: toIsoDate(row.captured_day),
  }));
}
