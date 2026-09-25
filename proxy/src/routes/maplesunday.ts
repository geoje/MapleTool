import { Hono } from "hono";
import { getMapleSundayInfo } from "../maplesunday-store.js";

const maplesunday = new Hono();

// Pure lookup - never scrapes on request. Data is filled in by maplesunday-store.ts, which
// refreshes on server startup and every hour on the hour.
maplesunday.get("/", (c) => {
  const info = getMapleSundayInfo();
  if (!info) {
    return c.json({ error: "Maplesunday info not available yet" }, 404);
  }

  return c.json(info);
});

export { maplesunday };
