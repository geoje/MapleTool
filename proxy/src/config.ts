function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function int(name: string, fallback: number): number {
  const value = process.env[name];
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) throw new Error(`Env var ${name} must be an integer, got "${value}"`);
  return parsed;
}

export const config = {
  port: int("PORT", 3000),
  nexon: {
    baseUrl: process.env.NEXON_BASE_URL ?? "https://open.api.nexon.com/maplestory/v1",
    apiKey: required("NEXON_API_KEY"),
  },
  rateLimit: {
    windowMs: int("RATE_LIMIT_WINDOW_MS", 60_000),
    max: int("RATE_LIMIT_MAX", 60),
  },
};
