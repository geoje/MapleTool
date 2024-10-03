import React, { useEffect, useRef } from "react";

export default function useDidUpdateEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
) {
  const mountingRef = useRef(false);

  useEffect(() => {
    mountingRef.current = true;
  }, []);
  useEffect(() => {
    if (!mountingRef.current) return effect();
    mountingRef.current = false;
  }, [deps]);
}
