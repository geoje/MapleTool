import { useEffect, useState } from "react";
import type { CubeType, EquipmentLevelTier } from "@/constants/enhance";
import { CATEGORY_TO_PARTS_SLUG, LEVEL_TIER_TO_OPTION_LEVEL } from "@/constants/cube-parts";

export type CubeGrade = "rare" | "epic" | "unique" | "legendary";

export interface CubeOptionGroup {
  optionNumber: number;
  items: Array<{ name: string; probability: number }>;
}

export type CubeProbabilityData = Partial<Record<CubeGrade, CubeOptionGroup[]>>;

const cache = new Map<string, CubeProbabilityData>();

export function useCubeProbability(cubeType: CubeType | null, category: string, levelTier: EquipmentLevelTier) {
  const partsSlug = CATEGORY_TO_PARTS_SLUG[category];
  const level = LEVEL_TIER_TO_OPTION_LEVEL[levelTier];
  const key = cubeType && partsSlug ? `cube/${cubeType}/${partsSlug}/${level}` : undefined;

  const [data, setData] = useState<CubeProbabilityData | null>(() => (key ? (cache.get(key) ?? null) : null));
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!key) {
      setData(null);
      return;
    }

    const cached = cache.get(key);
    if (cached) {
      setData(cached);
      setIsFetching(false);
      return;
    }

    const controller = new AbortController();
    setIsFetching(true);
    // Deliberately keep the previous key's data in state instead of clearing
    // it here - the table renders it as a same-shaped skeleton while this
    // fetch is in flight, rather than collapsing to an empty loading state.

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
