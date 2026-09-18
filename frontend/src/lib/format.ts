const units = ["억", "만"];

export function formatNumber(num: number): string {
  if (num === 0) return "0";

  const isNegative = num < 0;
  num = Math.floor(Math.abs(num) / 10000) * 10000;

  if (num === 0) return "0";

  const parts = [];

  parts.push(Math.floor(num / 100000000));
  num %= 100000000;

  parts.push(Math.floor(num / 10000));

  const result = parts
    .map((part, index) => {
      if (part === 0) return "";
      return `${part}${units[index]}`;
    })
    .filter((part) => part !== "")
    .join(" ");

  return isNegative ? `-${result}` : result;
}

export function formatDelta(delta: number): string | null {
  if (delta == 0) return null;

  const formatted = formatNumber(Math.abs(delta));
  if (formatted === "0") return null;

  const sign = delta > 0 ? "+" : "-";
  return `(${sign}${formatted})`;
}

// Truncates (not rounds) toward zero, keeping only one decimal place.
export function truncateToOneDecimal(value: number): number {
  return Math.trunc(value * 10) / 10;
}

function formatTruncated(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function formatCubeCount(value: number): string {
  return formatTruncated(truncateToOneDecimal(value));
}

// Rounds to the nearest 천만(10,000,000) and drops anything below that, per product spec.
// Falls back to 만 단위, then the raw value, when the amount is too small to show at that precision.
export function formatCostRounded(value: number): string {
  const rounded = Math.round(value / 10_000_000) * 10_000_000;
  if (rounded >= 100_000_000) {
    const eok = (rounded / 100_000_000).toFixed(1).replace(/\.0$/, "");
    return `${eok}억`;
  }
  if (rounded > 0) return `${rounded / 10_000_000}천만`;

  const man = Math.round(value / 10_000);
  if (man > 0) return `${man}만`;

  return String(value);
}

export function formatCostExact(value: number): string {
  if (value === 0) return "0";

  const eok = Math.floor(value / 100_000_000);
  const remainder = value % 100_000_000;
  const man = Math.floor(remainder / 10_000);
  const rest = remainder % 10_000;

  const parts = [];
  if (eok > 0) parts.push(`${eok}억`);
  if (man > 0) parts.push(`${man}만`);
  if (rest > 0 || parts.length === 0) parts.push(`${rest}`);

  return parts.join(" ");
}

export function formatCountDelta(delta: number): string | null {
  const truncated = truncateToOneDecimal(delta);
  if (truncated == 0) return null;

  const sign = truncated > 0 ? "+" : "-";
  return `(${sign}${formatTruncated(Math.abs(truncated))})`;
}
