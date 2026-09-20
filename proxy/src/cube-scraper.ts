import * as cheerio from "cheerio";

export const GRADE_SLUGS = ["rare", "epic", "unique", "legendary"] as const;
export type GradeSlug = (typeof GRADE_SLUGS)[number];

const GRADE_TO_NEXON: Record<GradeSlug, number> = { rare: 1, epic: 2, unique: 3, legendary: 4 };

export interface OptionSearchGroup {
  optionNumber: number;
  items: Array<{ name: string; probability: number }>;
}

// One file holds every grade a given search target supports, keyed by grade slug.
export type GradedOptionResponse = Partial<Record<GradeSlug, OptionSearchGroup[]>>;

function parsePercent(text: string): number {
  return parseFloat(text.replace("%", "").trim()) / 100;
}

// Invalid combinations (e.g. a grade the target doesn't support) come back
// with no `.cube_data` tables at all, so an empty result means "doesn't exist".
function parseOptionSearchResult($: cheerio.CheerioAPI): OptionSearchGroup[] | null {
  const tables = $("table.cube_data");
  if (tables.length === 0) return null;

  const groups: OptionSearchGroup[] = [];
  tables.each((i, table) => {
    const items: Array<{ name: string; probability: number }> = [];
    $(table)
      .find("tbody tr")
      .each((_, tr) => {
        const tds = $(tr).find("td").toArray();
        if (tds.length < 2) return;
        const name = $(tds[0]).text().trim();
        const probability = parsePercent($(tds[tds.length - 1]).text());
        if (!name) return;
        items.push({ name, probability });
      });
    if (items.length > 0) {
      groups.push({ optionNumber: i + 1, items });
    }
  });

  return groups.length > 0 ? groups : null;
}

// Serializes every outbound scrape (cube AND soul) onto one queue, spaced 5s
// apart, so nothing ever fans out into concurrent hits on Nexon. Requests for
// the same key are deduped onto one in-flight promise.
const MIN_REQUEST_INTERVAL_MS = 5000;
let queueTail: Promise<unknown> = Promise.resolve();
let lastRequestAt = 0;
const inFlight = new Map<string, Promise<unknown>>();

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queueTail.then(async () => {
    const wait = lastRequestAt + MIN_REQUEST_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequestAt = Date.now();
    return task();
  });

  // Keep the queue alive even if this scrape fails, so later ones still run.
  queueTail = run.catch(() => {});

  return run;
}

function dedupe<T>(key: string, factory: () => Promise<T>): Promise<T> {
  const existing = inFlight.get(key);
  if (existing) return existing as Promise<T>;

  const promise = factory().finally(() => inFlight.delete(key));
  inFlight.set(key, promise);
  return promise;
}

// Generic: POST to `ajaxUrl`, parse the `table.cube_data` response HTML with cheerio.
async function fetchOptionTables(ajaxUrl: string, body: URLSearchParams, referer: string): Promise<OptionSearchGroup[] | null> {
  const response = await fetch(ajaxUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent": "Mozilla/5.0",
      Referer: referer,
    },
    body,
  });
  if (!response.ok) throw new Error(`Failed to fetch ${ajaxUrl}: ${response.status}`);

  const html = await response.text();
  const $ = cheerio.load(html);
  return parseOptionSearchResult($);
}

// Generic: fetches every grade in `grades`, one at a time through the shared
// queue. `requestFor(grade)` builds the per-grade POST request; everything
// else (queueing, dedup, parsing) is shared between cube and soul.
async function fetchAllGrades(
  grades: GradeSlug[],
  dedupeKeyPrefix: string,
  requestFor: (grade: GradeSlug) => { ajaxUrl: string; body: URLSearchParams; referer: string },
): Promise<GradedOptionResponse> {
  const result: GradedOptionResponse = {};

  for (const grade of grades) {
    const key = `${dedupeKeyPrefix}:${grade}`;
    const { ajaxUrl, body, referer } = requestFor(grade);
    const data = await dedupe(key, () => enqueue(() => fetchOptionTables(ajaxUrl, body, referer)));
    if (data) result[grade] = data;
  }

  return result;
}

// ---- Cube potential option search ("확률 검색" on each cube/{type} page) ----

export const CUBE_SEARCH_URL = "https://maplestory.nexon.com/Guide/OtherProbability/cube/GetSearchProbList";

export const CUBE_URLS: Record<string, string> = {
  black: "https://maplestory.nexon.com/Guide/OtherProbability/cube/black",
  master: "https://maplestory.nexon.com/Guide/OtherProbability/cube/master",
  artisan: "https://maplestory.nexon.com/Guide/OtherProbability/cube/artisan",
  addi: "https://maplestory.nexon.com/Guide/OtherProbability/cube/addi",
  strangeAddi: "https://maplestory.nexon.com/Guide/OtherProbability/cube/strangeAddi",
};

// nCubeItemID used by the search AJAX endpoint, one per cube page.
export const CUBE_ITEM_IDS: Record<string, string> = {
  black: "5062010",
  master: "2711003",
  artisan: "2711004",
  addi: "5062500",
  strangeAddi: "2730002",
};

// Highest grade each cube supports (matches the grade-up data hardcoded on the frontend).
export const CUBE_GRADES: Record<string, GradeSlug[]> = {
  black: ["rare", "epic", "unique", "legendary"],
  master: ["rare", "epic", "unique"],
  artisan: ["rare", "epic", "unique", "legendary"],
  addi: ["rare", "epic", "unique", "legendary"],
  strangeAddi: ["rare", "epic"],
};

// Order must match the <select> options on the Nexon search form (nPartsType 1-20).
export const PARTS_TYPES: Array<{ slug: string; label: string }> = [
  { slug: "weapon", label: "무기" },
  { slug: "emblem", label: "엠블렘" },
  { slug: "subWeaponExceptShieldSoul", label: "보조무기(포스실드, 소울링 제외)" },
  { slug: "forceShieldSoul", label: "포스실드, 소울링" },
  { slug: "shield", label: "방패" },
  { slug: "hat", label: "모자" },
  { slug: "top", label: "상의" },
  { slug: "overall", label: "한벌옷" },
  { slug: "bottom", label: "하의" },
  { slug: "shoes", label: "신발" },
  { slug: "glove", label: "장갑" },
  { slug: "cape", label: "망토" },
  { slug: "belt", label: "벨트" },
  { slug: "shoulder", label: "어깨장식" },
  { slug: "faceAccessory", label: "얼굴장식" },
  { slug: "eyeAccessory", label: "눈장식" },
  { slug: "earring", label: "귀고리" },
  { slug: "ring", label: "반지" },
  { slug: "pendant", label: "펜던트" },
  { slug: "heart", label: "기계심장" },
];

// The search form only distinguishes two level bands: 120-200 give identical
// results, 201-250 give another. 200 and 250 are the representative inputs.
export const OPTION_LEVELS = [200, 250] as const;

export function fetchCubeGrades(cubeType: string, partsSlug: string, level: number): Promise<GradedOptionResponse> {
  const cubeItemId = CUBE_ITEM_IDS[cubeType] ?? "";
  const partsIndex = PARTS_TYPES.findIndex((p) => p.slug === partsSlug);
  const grades = CUBE_GRADES[cubeType] ?? [];

  return fetchAllGrades(grades, `cube:${cubeType}:${partsSlug}:${level}`, (grade) => ({
    ajaxUrl: CUBE_SEARCH_URL,
    referer: CUBE_URLS[cubeType] ?? "",
    body: new URLSearchParams({
      nCubeItemID: cubeItemId,
      nGrade: String(GRADE_TO_NEXON[grade]),
      nPartsType: String(partsIndex + 1),
      nReqLev: String(level),
    }),
  }));
}

// ---- Soul potential option search ("확률 검색" on cube/Soulpotential) ----
// No item/parts/level axis here - just grade x amplify stage (1-4).

export const SOUL_URL = "https://maplestory.nexon.com/Guide/OtherProbability/cube/Soulpotential";
export const SOUL_SEARCH_URL = "https://maplestory.nexon.com/Guide/OtherProbability/cube/GetSoulPotentialProbList";
export const SOUL_AMPLIFY_LEVELS = [1, 2, 3, 4] as const;
export const SOUL_GRADES: GradeSlug[] = ["rare", "epic", "unique", "legendary"];

export function fetchSoulGrades(amplifyLevel: number): Promise<GradedOptionResponse> {
  return fetchAllGrades(SOUL_GRADES, `soul:${amplifyLevel}`, (grade) => ({
    ajaxUrl: SOUL_SEARCH_URL,
    referer: SOUL_URL,
    body: new URLSearchParams({
      nGrade: String(GRADE_TO_NEXON[grade]),
      nLevel: String(amplifyLevel),
    }),
  }));
}
