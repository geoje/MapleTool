import { Hono } from "hono";
import { getItemPrice } from "../itemprice-store.js";

const itemprice = new Hono();

// Pure lookup - never scrapes on request. Data is filled in by itemprice-store.ts,
// which refreshes on server startup and every hour on the hour.
itemprice.get("/", (c) => {
  const name = c.req.query("name");
  if (!name || !name.trim()) {
    return c.json({ error: "Invalid name" }, 400);
  }

  const data = getItemPrice(name);
  if (!data) {
    return c.json({ error: `No price for: ${name}` }, 404);
  }

  return c.json(data);
});

export { itemprice };
