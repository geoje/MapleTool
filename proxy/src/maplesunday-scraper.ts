export const MAPLESUNDAY_URL = "https://maplessunday.com/sunday";

export interface MapleSundayInfo {
  // Short "M/D" form (e.g. "9/27"), converted from the site's "M월 D일" text.
  date: string;
  benefit: string;
}

const REQUEST_TIMEOUT_MS = 60_000;

// The site is a static Vue page with its data inlined as a JS literal (not a JSON API), e.g.
// `const recentSundays = ref([{ date: '9월 27일', benefit: '...', hit: true, hitRank: 2 }, ...]);`
// so the fields are pulled out with targeted regexes instead of evaluating the script.
function extractRecentSundaysBlock(html: string): string {
  const match = html.match(/const recentSundays = ref\(\[([\s\S]*?)\]\);/);
  if (!match?.[1]) throw new Error("Failed to locate recentSundays data in maplessunday.com page");
  return match[1];
}

// recentSundays is ordered newest-first - the first entry is this week's (possibly not-yet-arrived)
// Sunday Maple, published ahead of time once Nexon's benefit is known.
function extractFirstEntry(block: string): string {
  const match = block.match(/\{([\s\S]*?)\}/);
  if (!match?.[1]) throw new Error("Failed to locate a recentSundays entry in maplessunday.com page");
  return match[1];
}

// Word-boundary before the field name keeps this from matching "benefit1"/"benefit2" (the
// hit-chip split variants of the same text) when looking for the plain "benefit" field.
function extractField(entry: string, field: string): string | undefined {
  const match = entry.match(new RegExp(`\\b${field}:\\s*['"]([^'"]+)['"]`));
  return match?.[1];
}

function toShortDate(rawDate: string): string {
  const match = rawDate.match(/(\d+)월\s*(\d+)일/);
  if (!match) throw new Error(`Unrecognized maplessunday.com date format: ${rawDate}`);
  return `${match[1]}/${match[2]}`;
}

export async function fetchMapleSundayInfo(): Promise<MapleSundayInfo> {
  const response = await fetch(MAPLESUNDAY_URL, {
    headers: { accept: "text/html" },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Failed to fetch maplessunday.com: ${response.status}`);

  const html = await response.text();
  const block = extractRecentSundaysBlock(html);
  const entry = extractFirstEntry(block);

  const rawDate = extractField(entry, "date");
  const benefit = extractField(entry, "benefit");
  if (!rawDate || !benefit) throw new Error("Failed to parse maplessunday.com recentSundays entry");

  return { date: toShortDate(rawDate), benefit };
}
