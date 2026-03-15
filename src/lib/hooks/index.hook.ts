"use client";

import {
  useState,
  useCallback,
  useEffect,
} from "react";

export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return debouncedValue;
}

export function useMarqueeAnimation(paused: boolean) {
  const [isPaused, setIsPaused] = useState(paused);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { isPaused, pause, resume };
}