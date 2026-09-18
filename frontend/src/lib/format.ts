const units = ["조", "억", "만"];

export function formatNumber(num: number): string {
  if (num === 0) return "0";

  const isNegative = num < 0;
  num = Math.floor(Math.abs(num) / 10000) * 10000;

  if (num === 0) return "0";

  const parts = [];

  parts.push(Math.floor(num / 1_000_000_000_000));
  num %= 1_000_000_000_000;

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

// Rounds (not truncates) to the nearest two decimal places.
export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

function formatFixedPoint(value: number, decimals: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(decimals);
}

export function formatCubeCount(value: number): string {
  return formatFixedPoint(truncateToOneDecimal(value), 1);
}

export function formatSpareCount(value: number): string {
  return formatFixedPoint(roundToTwoDecimals(value), 2);
}

// Rounds to the nearest 10,000,000 (cheonman) and drops anything below that, per product spec.
// Shown as a 조/억/천만 breakdown (no decimals) once the value reaches 1천만; falls back to units
// of 10,000 (man), then the raw value, when the amount is too small to show at that precision.
// Once 조 shows up, 천만 is dropped too — only 조/억 precision is shown.
export function formatCostRounded(value: number): string {
  const rounded = Math.round(value / 10_000_000) * 10_000_000;
  if (rounded === 0) {
    const man = Math.round(value / 10_000);
    if (man > 0) return `${man}만`;
    return String(value);
  }

  const jo = Math.floor(rounded / 1_000_000_000_000);
  const afterJo = rounded % 1_000_000_000_000;
  const eok = Math.floor(afterJo / 100_000_000);
  const cheonman = Math.floor((afterJo % 100_000_000) / 10_000_000);

  const parts = [];
  if (jo > 0) parts.push(`${jo}조`);
  if (eok > 0) parts.push(`${eok}억`);
  if (jo === 0 && cheonman > 0) parts.push(`${cheonman}천만`);

  return parts.join(" ");
}

export function formatCostExact(value: number): string {
  const truncated = Math.trunc(value);
  if (truncated === 0) return "0";

  const jo = Math.floor(truncated / 1_000_000_000_000);
  const afterJo = truncated % 1_000_000_000_000;
  const eok = Math.floor(afterJo / 100_000_000);
  const remainder = afterJo % 100_000_000;
  const man = Math.floor(remainder / 10_000);
  const rest = remainder % 10_000;

  const parts = [];
  if (jo > 0) parts.push(`${jo}조`);
  if (eok > 0) parts.push(`${eok}억`);
  if (man > 0) parts.push(`${man}만`);
  if (rest > 0 || parts.length === 0) parts.push(`${rest}`);

  return parts.join(" ");
}

export function formatCountDelta(delta: number): string | null {
  const truncated = truncateToOneDecimal(delta);
  if (truncated == 0) return null;

  const sign = truncated > 0 ? "+" : "-";
  return `(${sign}${formatFixedPoint(Math.abs(truncated), 1)})`;
}
