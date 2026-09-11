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

export function formatCountDelta(delta: number): string | null {
  const truncated = truncateToOneDecimal(delta);
  if (truncated == 0) return null;

  const sign = truncated > 0 ? "+" : "-";
  return `(${sign}${formatTruncated(Math.abs(truncated))})`;
}
