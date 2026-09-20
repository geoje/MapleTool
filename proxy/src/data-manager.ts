import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const DATA_DIR = join(process.cwd(), "data", "probability");

export function dataFileExists(key: string): boolean {
  return existsSync(join(DATA_DIR, `${key}.json`));
}

export function readDataFile<T = unknown>(key: string): T | null {
  const filePath = join(DATA_DIR, `${key}.json`);
  if (!existsSync(filePath)) return null;

  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

export function writeDataFile(key: string, data: unknown): void {
  const filePath = join(DATA_DIR, `${key}.json`);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
