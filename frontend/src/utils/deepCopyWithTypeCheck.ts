export function deepCopyWithTypeCheck<T>(source: T, target: any): T {
  if (
    typeof source !== "undefined" &&
    (typeof source !== typeof target ||
      Array.isArray(source) !== Array.isArray(target))
  ) {
    return source;
  }

  if (Array.isArray(source) && Array.isArray(target)) {
    return source.map((item, index) =>
      deepCopyWithTypeCheck(item, target[index])
    ) as unknown as T;
  }

  if (typeof source === "object" && source !== null && target !== null) {
    const result = { ...source };
    for (const key in source) {
      if (key in target) {
        (result as any)[key] = deepCopyWithTypeCheck(
          (source as any)[key],
          target[key]
        );
      }
    }
    return result as T;
  }

  return target;
}
