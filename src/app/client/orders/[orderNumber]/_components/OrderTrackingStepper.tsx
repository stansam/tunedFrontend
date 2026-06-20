"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTrackingSteps } from "../_utils/tracking";
import type { OrderTrackingStepperProps } from "../_props";
import type { TrackingStepStatus } from "../_types";

const DOT_CLASSES: Record<TrackingStepStatus, string> = {
  completed: "border-emerald-600 bg-emerald-600",
  active: "border-emerald-600 bg-white",
  pending: "border-slate-300 bg-white",
};

const LABEL_CLASSES: Record<TrackingStepStatus, string> = {
  completed: "font-semibold text-slate-800",
  active: "font-semibold text-slate-800",
  pending: "text-slate-400",
};

const LINE_CLASSES: Record<TrackingStepStatus, string> = {
  completed: "bg-emerald-400",
  active: "bg-slate-200",
  pending: "bg-slate-200",
};

export function OrderTrackingStepper({ status }: OrderTrackingStepperProps) {
  const steps = getTrackingSteps(status);
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between"
        aria-expanded={open}
        aria-controls="tracking-steps"
      >
        <h3 className="font-semibold text-slate-800">Track Order</h3>
        {open ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </button>

      {open && (
        <ol id="tracking-steps" className="mt-4 flex flex-col">
          {steps.map((step, idx) => (
            <li key={step.label} className="flex items-start gap-3">
              {/* Dot + connector line */}
              <div className="flex flex-col items-center">
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0 rounded-full border-2",
                    DOT_CLASSES[step.status],
                  )}
                />
                {idx < steps.length - 1 && (
                  <span
                    aria-hidden
                    className={cn("mt-1 h-6 w-0.5", LINE_CLASSES[step.status])}
                  />
                )}
              </div>

              {/* Step label */}
              <span className={cn("pb-2 text-sm", LABEL_CLASSES[step.status])}>
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
