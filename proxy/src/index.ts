import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { config } from "./config.js";
import { rateLimit } from "./rate-limit.js";
import { character } from "./routes/character.js";
import { union } from "./routes/union.js";
import { probability } from "./routes/probability.js";
import { itemprice } from "./routes/itemprice.js";
import { maplechart } from "./routes/maplechart.js";
import { scrapeAll } from "./scrape.js";
import { startItemPriceSchedule } from "./itemprice-store.js";
import { startMaplechartSchedule } from "./maplechart-store.js";

const app = new Hono();

app.use(logger());
app.get("/health", (c) => c.text("ok"));

app.use("/api/*", rateLimit());

app.route("/api/character", character);
app.route("/api/union", union);
app.route("/api/probability", probability);
app.route("/api/itemprice", itemprice);
app.route("/api/maplechart", maplechart);

app.notFound((c) => c.json({ title: "Not Found", status: 400, detail: "잘못된 요청입니다." }, 400));

serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(`[src/index.ts] mapletool-proxy listening on :${info.port}`);
});

scrapeAll().catch((error) => console.error("[src/index.ts] Fatal error:", error));
startItemPriceSchedule();
startMaplechartSchedule();
