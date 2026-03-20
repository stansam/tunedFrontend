"use client";

import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StepsNavProps } from "../../_props/howItworks.props";
// import type { HowItWorksStep } from "../../_types/howItWorks.types";

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.65 },
  active: { scale: 1, opacity: 1 },
};

export function StepsNav({ 
  stepsItems, 
  current, 
  onChange 
}: StepsNavProps) {
    return (
        <nav
      aria-label="How it works — step navigation"
      className="w-full overflow-x-auto pb-2 pt-1"
    >
      <ol
        role="list"
        className="flex w-max min-w-full lg:w-full flex-nowrap lg:flex-wrap items-center justify-start lg:justify-center gap-2 px-4 sm:px-0"
      >
        {stepsItems.map((stepItem, stepIdx) => {
          const isCompleted = current > stepIdx;
          const isCurrent = current === stepIdx;

          return (
            <motion.li
              key={stepItem.id}
              role="listitem"
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={stepVariants}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative shrink-0"
            >
              <button
                type="button"
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Go to step ${stepIdx + 1}: ${stepItem.title}`}
                onClick={() => onChange(stepIdx)}
                className={cn(
                  "group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium",
                  "transition-colors duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2",
                  isCurrent
                    ? "bg-stone-800 text-white"
                    : isCompleted
                      ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    "transition-all duration-200",
                    isCompleted
                      ? "bg-amber-500 text-white"
                      : isCurrent
                        ? "bg-amber-400 text-stone-900"
                        : "bg-stone-200 text-stone-500 group-hover:bg-stone-300"
                  )}
                  aria-hidden="true"
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  ) : (
                    <span>{stepIdx + 1}</span>
                  )}
                </span>

                <span
                  className={cn(
                    "max-w-[120px] truncate",
                    !isCurrent && !isCompleted && "hidden sm:inline-block"
                  )}
                >
                  {stepItem.title}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}