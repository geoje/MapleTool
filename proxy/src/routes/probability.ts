import { Hono } from "hono";
import { readDataFile } from "../data-manager.js";

const probability = new Hono();

// Pure lookup - never scrapes on request. Data is filled in by scrape.ts,
// which runs on server startup and checks what's missing.
probability.get("/*", (c) => {
  const key = c.req.path.split("/api/probability/")[1] ?? "";

  if (!key || key.includes("..")) {
    return c.json({ error: "Invalid path" }, 404);
  }

  const data = readDataFile<Record<string, unknown>>(key);
  if (!data || Object.keys(data).length === 0) {
    return c.json({ error: `No data for: ${key}` }, 404);
  }

  return c.json(data);
});

export { probability };
