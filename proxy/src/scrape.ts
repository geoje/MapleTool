import { readDataFile, writeDataFile } from "./data-manager.js";
import {
  CUBE_GRADES,
  CUBE_URLS,
  OPTION_LEVELS,
  PARTS_TYPES,
  SOUL_AMPLIFY_LEVELS,
  SOUL_GRADES,
  fetchMissingCubeGrades,
  fetchMissingSoulGrades,
  type GradedOptionResponse,
} from "./cube-scraper.js";

function isComplete(existing: GradedOptionResponse | null, grades: readonly string[]): boolean {
  return !!existing && grades.every((grade) => existing[grade as keyof GradedOptionResponse]);
}

async function scrapeCubes(): Promise<void> {
  for (const cubeType of Object.keys(CUBE_URLS)) {
    const grades = CUBE_GRADES[cubeType] ?? [];
    for (const parts of PARTS_TYPES) {
      for (const level of OPTION_LEVELS) {
        const key = `cube/${cubeType}/${parts.slug}/${level}`;
        const existing = readDataFile<GradedOptionResponse>(key);
        if (isComplete(existing, grades)) continue;

        try {
          const merged = await fetchMissingCubeGrades(cubeType, parts.slug, level, existing);
          writeDataFile(key, merged);
          console.log(`[Scrape] ${key} -> saved`);
        } catch (error) {
          console.error(`[Scrape] Failed ${key}:`, error);
        }
      }
    }
  }
}

async function scrapeSoul(): Promise<void> {
  for (const amplifyLevel of SOUL_AMPLIFY_LEVELS) {
    const key = `soul/${amplifyLevel}`;
    const existing = readDataFile<GradedOptionResponse>(key);
    if (isComplete(existing, SOUL_GRADES)) continue;

    try {
      const merged = await fetchMissingSoulGrades(amplifyLevel, existing);
      writeDataFile(key, merged);
      console.log(`[Scrape] ${key} -> saved`);
    } catch (error) {
      console.error(`[Scrape] Failed ${key}:`, error);
    }
  }
}

// Checks what's already on disk and scrapes only what's missing. Cubes first,
// then soul - both share the same 5s-spaced request queue in cube-scraper.ts,
// so this never overlaps with itself.
export async function scrapeAll(): Promise<void> {
  console.log("[Scrape] Checking cube option data...");
  await scrapeCubes();
  console.log("[Scrape] Checking soul option data...");
  await scrapeSoul();
  console.log("[Scrape] Done.");
}
