"use client";

import { useState, useCallback, useEffect } from "react";
import type { HowItWorksStep } from "../_types/howItWorks.types";

export function useHowItWorks(
  steps: readonly HowItWorksStep[],
  autoPlayInterval: number = 5000
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (steps.length === 0) return;
    const timerId = setTimeout(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    }, autoPlayInterval);

    return () => clearTimeout(timerId);
  }, [currentStepIndex, steps.length, autoPlayInterval]);

  const setStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < steps.length) {
        setCurrentStepIndex(index);
      }
    },
    [steps.length]
  );

  return { currentStepIndex, setStep };
}
