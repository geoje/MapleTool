import { Hono } from "hono";
import { getMaplechartRate } from "../maplechart-store.js";

const maplechart = new Hono();

// Pure lookup - never scrapes on request. Data is filled in by maplechart-store.ts, which
// refreshes on server startup and every hour on the hour.
maplechart.get("/", (c) => {
  const rate = getMaplechartRate();
  if (!rate) {
    return c.json({ error: "Maplechart rate not available yet" }, 404);
  }

  return c.json(rate);
});

export { maplechart };
