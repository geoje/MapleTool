import { getConnInfo } from "@hono/node-server/conninfo";
import type { MiddlewareHandler } from "hono";
import { config } from "./config.js";

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Buckets accumulate one entry per distinct client per window; sweep periodically
// so long-running processes don't leak memory from one-off callers.
setInterval(
  () => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  },
  10 * 60_000,
).unref();

function clientKey(c: Parameters<MiddlewareHandler>[0]): string {
  const forwardedFor = c.req.header("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();

  return getConnInfo(c).remote.address ?? "unknown";
}

export function rateLimit(): MiddlewareHandler {
  return async (c, next) => {
    const key = clientKey(c);
    const now = Date.now();

    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + config.rateLimit.windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;

    const remaining = Math.max(0, config.rateLimit.max - bucket.count);
    c.header("X-RateLimit-Limit", String(config.rateLimit.max));
    c.header("X-RateLimit-Remaining", String(remaining));

    if (bucket.count > config.rateLimit.max) {
      c.header("Retry-After", String(Math.ceil((bucket.resetAt - now) / 1000)));
      return c.json(
        { title: "요청이 너무 많습니다.", status: 429, detail: "잠시 후 다시 시도해주세요." },
        429,
      );
    }

    await next();
  };
}
