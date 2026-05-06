"use client";

import { useState, useEffect } from "react";
import { computeTimeRemaining } from "../_utils";
import type { TimeRemaining } from "../_types";

export function useOrderTimer(dueDate: string | null): TimeRemaining {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    computeTimeRemaining(dueDate),
  );

  // useEffect(() => {
  //   if (!dueDate) return;

  //   setTimeLeft(computeTimeRemaining(dueDate));

  //   const interval = setInterval(() => {
  //     setTimeLeft(computeTimeRemaining(dueDate));
  //   }, 1_000);

  //   return () => clearInterval(interval);
  // }, [dueDate]);
    useEffect(() => {
    if (!dueDate) return;

    const tick = () => setTimeLeft(computeTimeRemaining(dueDate));

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [dueDate]);

  return timeLeft;
}
