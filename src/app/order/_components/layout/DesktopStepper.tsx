"use client";

import { Check, LayoutGrid, FileText, CreditCard, Save, Loader2 } from "lucide-react";
import { cn } from "../../_utils/order.utils";
import type { StepperProps } from "../../_props/order.props";

const STEPS = [
  { id: 1, title: "Service Details", sub: "Current Step", icon: LayoutGrid },
  { id: 2, title: "Paper Details", sub: "Next Step", icon: FileText },
  { id: 3, title: "Review & Checkout", sub: "Final Step", icon: CreditCard },
];

export function DesktopStepper({ currentStep, onStepClick, onSaveDraft, isSavingDraft }: StepperProps) {
  return (
    <div className="sticky top-24 flex flex-col gap-6">
      <div className="rounded-3xl border border-white/40 bg-white/20 p-6 backdrop-blur-xl shadow-xl shadow-black/5">
        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-500 px-2">Order Progress</h3>
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div key={step.id} className="relative flex items-center gap-4 group cursor-pointer" onClick={() => onStepClick(step.id as 1 | 2 | 3)}>
                {i < STEPS.length - 1 && (
                  <div className={cn("absolute left-6 top-10 h-10 w-0.5 bg-slate-200 transition-colors", isCompleted && "bg-emerald-500")} />
                )}
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all duration-300",
                  isActive ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-110" : 
                  isCompleted ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-200 bg-white text-slate-400"
                )}>
                  {isCompleted ? <Check size={20} strokeWidth={3} /> : <step.icon size={20} />}
                </div>
                <div className="flex flex-col">
                  <span className={cn("text-sm font-bold transition-colors", isActive ? "text-slate-900" : "text-slate-500")}>{step.title}</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{isActive ? "In Progress" : isCompleted ? "Completed" : "Next Step"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button 
        onClick={onSaveDraft}
        disabled={isSavingDraft}
        className="flex items-center justify-center gap-2 rounded-2xl border border-white bg-white/60 p-4 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-white hover:shadow-md active:scale-95 disabled:opacity-60"
      >
        {isSavingDraft ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        {isSavingDraft ? "Saving..." : "Save Draft"}
      </button>
    </div>
  );
}
