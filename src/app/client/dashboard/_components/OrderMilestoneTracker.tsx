"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import type { MilestoneOrder } from "../_types/dashboard.types";

export function OrderMilestoneTracker({ order }: { readonly order: MilestoneOrder | null }) {
  if (!order) {
    return (
      <div className="rounded-xl border bg-white shadow-sm p-6 flex flex-col items-center justify-center min-h-[160px] text-slate-500 text-sm">
        No active orders to track.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="p-6 pb-2 flex flex-col md:flex-row md:items-center justify-between border-b">
        <h3 className="tracking-tight text-sm font-semibold">Latest Order Tracker</h3>
        <span className="text-xs font-mono text-slate-500 mt-1 md:mt-0">
          {order.order_number}
        </span>
      </div>
      <div className="p-6 md:px-12 flex flex-col space-y-4">
        {/* Progress Bar Container */}
        <div className="relative pt-6">
          <div className="w-full bg-slate-200 rounded-full h-2 absolute top-8 left-0 z-0 overflow-hidden">
             <div 
               className="bg-emerald-600 h-2 rounded-full transition-all duration-1000 ease-in-out" 
               style={{ width: `${order.progress}%` }} 
             />
          </div>
          <div className="relative z-10 flex justify-between">
            <MilestoneStep label="Pending" active={order.progress >= 0} completed={order.progress >= 25} />
            <MilestoneStep label="Active"  active={order.progress >= 25} completed={order.progress >= 75} />
            <MilestoneStep label="Review"  active={order.progress >= 75} completed={order.progress >= 90} />
            <MilestoneStep label="Completed" active={order.progress >= 100} completed={order.progress >= 100} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MilestoneStep({ label, active, completed }: { label: string; active: boolean; completed: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 bg-white ${completed ? 'border-emerald-600' : active ? 'border-amber-500' : 'border-slate-300'}`}>
        {completed ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        ) : active ? (
          <Clock className="w-3 h-3 text-amber-500 animate-pulse" />
        ) : (
           <Circle className="w-3 h-3 text-slate-300" />
        )}
      </div>
      <span className={`mt-2 text-xs font-medium ${active ? 'text-slate-800' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
}
