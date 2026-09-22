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
  // 소울 옵션은 "0.5%"/"1.5%" 같은 소수 값도 내려오므로, "0"과 "5"로 쪼개지 않고
  // 소수점을 포함한 한 토큰으로 잡아야 name 치환과 value 둘 다 올바르게 나온다.
  const matches = main.match(/\d+(?:\.\d+)?/g);
  if (!matches) return { name: option, value: 0 };

  const value = Number(matches[matches.length - 1]);
  const valueText = String(value);
  const lastIndex = main.lastIndexOf(valueText);
  const name = main.slice(0, lastIndex) + "n" + main.slice(lastIndex + valueText.length);

  return { name: [name, ...rest].join("("), value };
}
