import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { config } from "./config.js";
import { rateLimit } from "./rate-limit.js";
import { character } from "./routes/character.js";
import { union } from "./routes/union.js";

const app = new Hono();

app.use(logger());
app.get("/health", (c) => c.text("ok"));

app.use("/api/*", rateLimit());

app.route("/api/character", character);
app.route("/api/union", union);

app.notFound((c) => c.json({ title: "Not Found", status: 400, detail: "잘못된 요청입니다." }, 400));

serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(`mapletool-proxy listening on :${info.port}`);
});
