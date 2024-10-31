const units = ["억", "만", ""];

export function formatNumber(num: number): string {
  if (num === 0) return "0";

  const parts = [];

  parts.push(Math.floor(num / 100000000));
  num %= 100000000;

  parts.push(Math.floor(num / 10000));
  num %= 10000;

  parts.push(Math.floor(num));

  const result = parts
    .map((part, index) => {
      if (part === 0) return "";
      return `${part}${units[index]}`;
    })
    .filter((part) => part !== "")
    .join(" ");

  return result;
}

export function formatSearchParams(params: Object) {
  return new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString();
}
