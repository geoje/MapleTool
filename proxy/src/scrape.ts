import { dataFileExists, writeDataFile } from "./data-manager.js";
import {
  CUBE_URLS,
  OPTION_LEVELS,
  PARTS_TYPES,
  SOUL_AMPLIFY_LEVELS,
  fetchCubeGrades,
  fetchSoulGrades,
} from "./cube-scraper.js";

// A file on disk means that combination is already done, no matter what's in
// it - every field gets read in one pass before the file is ever written, so
// there's nothing left to fill in later.
async function scrapeCubes(): Promise<void> {
  for (const cubeType of Object.keys(CUBE_URLS)) {
    for (const parts of PARTS_TYPES) {
      for (const level of OPTION_LEVELS) {
        const key = `cube/${cubeType}/${parts.slug}/${level}`;
        if (dataFileExists(key)) continue;

        try {
          const data = await fetchCubeGrades(cubeType, parts.slug, level);
          writeDataFile(key, data);
          console.log(`[src/scrape.ts] ${key} -> saved`);
        } catch (error) {
          console.error(`[src/scrape.ts] Failed ${key}:`, error);
        }
      }
    }
  }
}

async function scrapeSoul(): Promise<void> {
  for (const amplifyLevel of SOUL_AMPLIFY_LEVELS) {
    const key = `soul/${amplifyLevel}`;
    if (dataFileExists(key)) continue;

    try {
      const data = await fetchSoulGrades(amplifyLevel);
      writeDataFile(key, data);
      console.log(`[src/scrape.ts] ${key} -> saved`);
    } catch (error) {
      console.error(`[src/scrape.ts] Failed ${key}:`, error);
    }
  }
}

// Checks what's already on disk and scrapes only what's missing. Cubes first,
// then soul - both share the same 5s-spaced request queue in cube-scraper.ts,
// so this never overlaps with itself.
export async function scrapeAll(): Promise<void> {
  console.log("[src/scrape.ts] Checking cube option data...");
  await scrapeCubes();
  console.log("[src/scrape.ts] Checking soul option data...");
  await scrapeSoul();
  console.log("[src/scrape.ts] Done.");
}
