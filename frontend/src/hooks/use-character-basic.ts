import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CharacterBasic } from "@/types";

let cachedKey: string | undefined;
let cachedData: CharacterBasic | undefined;

export function useCharacterBasic(name: string, searchToken?: number) {
  const [data, setData] = useState<CharacterBasic | undefined>(() =>
    cachedKey === `${name}:${searchToken ?? 0}` ? cachedData : undefined
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!name) {
      setData(undefined);
      return;
    }

    const key = `${name}:${searchToken ?? 0}`;
    if (cachedKey === key) {
      setData(cachedData);
      return;
    }

    const controller = new AbortController();
    setIsFetching(true);

    fetch(`/api/character/basic?name=${encodeURIComponent(name)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          const problem = await response.json().catch(() => ({}));
          throw new Error(problem.detail ?? "서버 요청에 실패하였습니다.");
        }

        return response.json() as Promise<CharacterBasic>;
      })
      .then((result) => {
        cachedKey = key;
        cachedData = result;
        setData(result);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        toast.warning(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsFetching(false);
      });

    return () => controller.abort();
  }, [name, searchToken]);

  return { data, isFetching };
}
