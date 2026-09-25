export interface MapleSundayInfo {
  // Short "M/D" form (e.g. "9/27").
  date: string;
  benefit: string;
}

let cache: MapleSundayInfo | null | undefined;

export async function fetchMapleSundayInfo(): Promise<MapleSundayInfo | null> {
  if (cache !== undefined) return cache;

  try {
    const response = await fetch("/api/maplesunday");
    cache = response.ok ? ((await response.json()) as MapleSundayInfo) : null;
    return cache;
  } catch {
    cache = null;
    return null;
  }
}
