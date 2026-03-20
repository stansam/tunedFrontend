"use client";

import { motion, Variants } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HowItWorksStep } from "../../_types/howItWorks.types";

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
};

export function StepsNav({ 
  stepsItems, 
  current, 
  onChange 
}: { 
  stepsItems: readonly HowItWorksStep[]; 
  current: number; 
  onChange: (index: number) => void; 
}) {
    return (
        <nav aria-label="Progress" className="flex justify-center px-4 w-full overflow-x-auto pb-4 pt-2 -mx-4 sm:mx-0 custom-scrollbar">
            <ol className="flex w-max min-w-full lg:w-full flex-nowrap lg:flex-wrap items-center justify-start lg:justify-center gap-2 px-4 sm:px-0" role="list">
                {stepsItems.map((stepItem, stepIdx) => {
                    const isCompleted = current > stepIdx;
                    const isCurrent = current === stepIdx;
                    return (
                        <motion.li key={stepItem.id} initial="inactive" animate={isCurrent ? "active" : "inactive"} variants={stepVariants} transition={{ duration: 0.3 }} className="relative shrink-0" >
                            <button
                                type="button"
                                className={cn(
                                    "group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500",
                                    isCurrent 
                                        ? "bg-emerald-600 text-white" 
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                                onClick={() => onChange(stepIdx)}
                            >
                                <span className={cn(
                                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                                    isCompleted 
                                        ? "bg-emerald-600 text-white" 
                                        : isCurrent 
                                            ? "bg-emerald-400 text-emerald-900" 
                                            : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                                )}>
                                    {isCompleted ? (
                                        <Check className="h-3 w-3" />
                                    ) : (
                                        <span>{stepIdx + 1}</span>
                                    )}
                                </span>
                                <span className={cn("inline-block", !isCurrent && "hidden sm:inline-block")}>
                                    {isCurrent ? "Current Step" : `Step ${stepIdx + 1}`}
                                </span>
                            </button>
                        </motion.li>
                    );
                })}
            </ol>
        </nav>
    );
}