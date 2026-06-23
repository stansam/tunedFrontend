"use client";

import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StepsNavProps } from "../../_props/howItworks.props";

export function MobileStepsNav({
  stepsItems,
  current,
  onChange,
}: StepsNavProps) {
  const isFirstStep = current === 0;
  const isLastStep = current === stepsItems.length - 1;

  const handlePrev = () => {
    if (!isFirstStep) onChange(current - 1);
  };

  const handleNext = () => {
    if (!isLastStep) onChange(current + 1);
  };

  return (
    <nav
      aria-label="How it works — mobile step navigation"
      className="w-full select-none"
    >
      <div className="flex items-center justify-center gap-3 px-4 py-1">
        <button
          type="button"
          disabled={isFirstStep}
          onClick={handlePrev}
          aria-label="Previous step"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-all active:scale-95 touch-manipulation",
            isFirstStep ? "opacity-40 cursor-not-allowed" : "hover:bg-stone-200"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <ol role="list" className="flex items-center gap-1.5">
          {stepsItems.map((stepItem, stepIdx) => {
            const isCompleted = current > stepIdx;
            const isCurrent = current === stepIdx;

            return (
              <li key={stepItem.id} role="listitem">
                <button
                  type="button"
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`Go to step ${stepIdx + 1}: ${stepItem.title}`}
                  onClick={() => onChange(stepIdx)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all active:scale-95 touch-manipulation",
                    isCurrent
                      ? "bg-stone-800 text-white"
                      : isCompleted
                        ? "bg-amber-100 text-amber-800"
                        : "bg-stone-100 text-stone-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    <span>{stepIdx + 1}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          disabled={isLastStep}
          onClick={handleNext}
          aria-label="Next step"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-all active:scale-95 touch-manipulation",
            isLastStep ? "opacity-40 cursor-not-allowed" : "hover:bg-stone-200"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
