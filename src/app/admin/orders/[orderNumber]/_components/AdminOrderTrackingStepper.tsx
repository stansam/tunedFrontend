"use client";

import type { AdminOrderTrackingStepperProps } from "../_props";

export function AdminOrderTrackingStepper({ status }: AdminOrderTrackingStepperProps) {
  const steps = [
    { key: "pending", label: "Pending Activation" },
    { key: "active", label: "In Progress" },
    { key: "completed_pending_review", label: "Delivered (Under Review)" },
    { key: "completed", label: "Completed" },
  ];

  const getStatusIndex = (currentStatus: string) => {
    if (currentStatus === "pending") return 0;
    if (currentStatus === "active" || currentStatus === "revision" || currentStatus === "overdue") return 1;
    if (currentStatus === "completed_pending_review") return 2;
    if (currentStatus === "completed") return 3;
    return -1;
  };

  const currentIndex = getStatusIndex(status);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg space-y-4">
      <h3 className="text-sm font-semibold text-white">Project Pipeline</h3>
      <div className="space-y-4 relative">
        <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-white/10" />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          
          return (
            <div key={step.key} className="flex items-start gap-3 relative z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs font-semibold ${
                isCompleted 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                  : isActive 
                    ? "bg-emerald-500 text-white border-emerald-500" 
                    : "bg-slate-900 border-white/10 text-slate-500"
              }`}>
                {isCompleted ? "✓" : idx + 1}
              </div>
              <div className="pt-0.5">
                <p className={`text-xs font-medium ${isActive ? "text-white" : "text-slate-400"}`}>
                  {step.label}
                </p>
                {isActive && (
                  <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                    Current Stage
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
