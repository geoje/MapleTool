import { Hono } from "hono";
import { getItemPrice } from "../price-store.js";

const price = new Hono();

// Pure lookup - never scrapes on request. Data is filled in by price-store.ts,
// which refreshes on server startup and every hour on the hour.
price.get("/", (c) => {
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

export { price };
