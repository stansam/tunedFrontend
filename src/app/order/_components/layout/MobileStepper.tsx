"use client";

import { Check, Save, Loader2 } from "lucide-react";
import { cn } from "../../_utils/order.utils";
import type { StepperProps } from "../../_props/order.props";

export function MobileStepper({ currentStep, onStepClick, onSaveDraft, isSavingDraft }: StepperProps) {
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
      <button
        onClick={onSaveDraft}
        disabled={isSavingDraft}
        aria-label="Save draft"
        className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm transition-all hover:text-emerald-600 active:scale-95 disabled:opacity-50"
      >
        {isSavingDraft
          ? <Loader2 size={15} className="animate-spin" />
          : <Save size={15} />}
      </button>
    </div>
  );
}
