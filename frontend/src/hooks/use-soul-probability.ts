import { useEffect, useState } from "react";
import type { CubeProbabilityData } from "@/hooks/use-cube-probability";

const cache = new Map<string, CubeProbabilityData>();

export function useSoulProbability(amplifyLevel: number) {
  const key = `soul/${amplifyLevel}`;

  const [data, setData] = useState<CubeProbabilityData | null>(() => cache.get(key) ?? null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const cached = cache.get(key);
    if (cached) {
      setData(cached);
      setIsFetching(false);
      return;
    }

    const controller = new AbortController();
    setIsFetching(true);

    fetch(`/api/probability/${key}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<CubeProbabilityData>;
      })
      .then((result) => {
        cache.set(key, result);
        setData(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setData(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsFetching(false);
      });

    return () => controller.abort();
  }, [key]);

  return { data, isFetching };
}
