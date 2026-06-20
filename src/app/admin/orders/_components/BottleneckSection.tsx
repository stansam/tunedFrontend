"use client";

import { Activity } from "lucide-react";
import type { BottleneckSectionProps } from "../_props/orders.props";

export function BottleneckSection({ bottlenecks }: BottleneckSectionProps) {
  const { pending_activation = 0, under_review = 0, awaiting_payment = 0 } = bottlenecks;
  const total = Math.max(pending_activation + under_review + awaiting_payment, 1);

  const stages = [
    { label: "Pending Activation", value: pending_activation, color: "bg-amber-500" },
    { label: "Under Review", value: under_review, color: "bg-purple-500" },
    { label: "Awaiting Payment", value: awaiting_payment, color: "bg-red-500" },
  ];

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2">
        <Activity className="size-4 text-emerald-500" />
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Bottleneck Detection</h3>
      </div>
      <p className="text-xs text-slate-500">Where orders are getting stuck right now</p>
      
      <div className="space-y-4 pt-2">
        {stages.map((stage) => {
          const pct = Math.round((stage.value / total) * 100);
          return (
            <div key={stage.label} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{stage.label}</span>
                <span>{stage.value}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`${stage.color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
