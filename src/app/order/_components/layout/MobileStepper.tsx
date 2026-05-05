"use client";

import { Check } from "lucide-react";
import { cn } from "../../_utils/order.utils";
import type { StepperProps } from "../../_props/order.props";

export function MobileStepper({ currentStep, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      {[1, 2, 3].map((step) => {
        const isActive = currentStep === step;
        const isCompleted = currentStep > step;
        return (
          <div key={step} className="flex flex-1 items-center last:flex-none cursor-pointer" onClick={() => onStepClick(step as 1 | 2 | 3)}>
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold transition-all",
              isActive ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" : 
              isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-white text-slate-400"
            )}>
              {isCompleted ? <Check size={16} strokeWidth={3} /> : step}
            </div>
            {step < 3 && (
              <div className="mx-2 h-0.5 flex-1 bg-white">
                <div className={cn("h-full bg-emerald-500 transition-all duration-500", isCompleted ? "w-full" : "w-0")} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
