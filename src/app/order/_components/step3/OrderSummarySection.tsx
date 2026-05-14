"use client";

import { Edit3 } from "lucide-react";
import type { OrderFormState } from "../../_types/order.types";
import { formatDeadlineDisplay } from "../../_utils/deadline.utils";
import { computeDeadlineISO } from "../../_utils/order.utils";

export function OrderSummarySection({ state, goToStep }: { state: OrderFormState, goToStep: (step: 1 | 2 | 3) => void }) {
  const deadline = state.step1.deadlineDate 
    ? formatDeadlineDisplay(computeDeadlineISO(state.step1.deadlineDate, state.step1.deadlineTime))
    : "Not set";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Project Overview</h3>
          <button onClick={() => goToStep(1)} className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
            <Edit3 size={12} /> Edit
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Service</p>
            <p className="text-sm font-semibold text-slate-700">Essay Writing</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Deadline</p>
            <p className="text-sm font-semibold text-slate-700">{deadline}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Word Count</p>
            <p className="text-sm font-semibold text-slate-700">{state.step2.wordCount} words</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Report</p>
            <p className="text-sm font-semibold text-slate-700 capitalize">{state.step1.reportType || "None"}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Academic Requirements</h3>
          <button onClick={() => goToStep(2)} className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
            <Edit3 size={12} /> Edit
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Spacing</p>
            <p className="text-sm font-semibold text-slate-700 capitalize">{state.step2.lineSpacing}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Style</p>
            <p className="text-sm font-semibold text-slate-700 uppercase">{state.step2.formatStyle}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Sources</p>
            <p className="text-sm font-semibold text-slate-700">{state.step2.sources}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
