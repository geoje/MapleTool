import { Hono } from "hono";
import { getMesoMarketRate } from "../mesomarket-store.js";

const mesomarket = new Hono();

// Pure lookup - never scrapes on request. Data is filled in by mesomarket-store.ts, which
// refreshes on server startup and every hour on the hour.
mesomarket.get("/", (c) => {
  const rate = getMesoMarketRate();
  if (!rate) {
    return c.json({ error: "Mesomarket rate not available yet" }, 404);
  }

  return c.json(rate);
});

export { mesomarket };
