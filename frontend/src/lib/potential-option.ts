export interface PotentialOptionValue {
  name: string;
  value: number;
}

// Ported from the old Spring-Boot-era crawler's extractValueFromOption (Python):
// only the last number before any "(" is pulled out and replaced with "n", so
// options that only differ by that number (e.g. "최대 HP +120" / "최대 HP +360")
// collapse to the same "n" name for later probability/value calculations.
export function extractPotentialOptionValue(option: string): PotentialOptionValue {
  const [main, ...rest] = option.split("(");
  const matches = main.match(/\d+/g);
  if (!matches) return { name: option, value: 0 };

  const value = Number(matches[matches.length - 1]);
  const valueText = String(value);
  const lastIndex = main.lastIndexOf(valueText);
  const name = main.slice(0, lastIndex) + "n" + main.slice(lastIndex + valueText.length);

  return { name: [name, ...rest].join("("), value };
}
