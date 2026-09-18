import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { UnionBasic } from "@/types";

let cachedKey: string | undefined;
let cachedData: UnionBasic | undefined;

export function useUnionBasic(name: string, searchToken?: number) {
  const [data, setData] = useState<UnionBasic | undefined>(() =>
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

    fetch(`/api/union/basic?name=${encodeURIComponent(name)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          const problem = await response.json().catch(() => ({}));
          throw new Error(problem.detail ?? "서버 요청에 실패하였습니다.");
        }

        return response.json() as Promise<UnionBasic>;
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
