"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { ActionableAlertsProps } from "../_props/dashboard.props";

export function ActionableAlerts({ alerts }: ActionableAlertsProps) {
  const router = useRouter();

  if (alerts.length === 0) {
    return (
      <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-6 text-center text-slate-500 text-sm flex flex-col items-center justify-center gap-2">
        <CheckCircle className="h-8 w-8 text-emerald-500" />
        <p className="font-semibold text-slate-700">All caught up!</p>
        <p className="text-xs text-slate-400">No pending actions required.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/50 bg-white/30 backdrop-blur-md p-4 max-h-[300px] overflow-auto">
      <div className="space-y-3">
        {alerts.map((alert) => {
          const orderId = alert.metadata?.order_id;
          return (
            <div
              key={alert.id}
              role="alert"
              className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50/70 backdrop-blur-xs p-4 text-amber-900 shadow-xs transition hover:bg-amber-100/80"
            >
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold leading-relaxed wrap-break-word">{alert.message}</p>
              </div>
              <button
                type="button"
                onClick={() => orderId && router.push(`/admin/orders/${orderId}` as Route)}
                disabled={!orderId}
                className="shrink-0 text-xs font-bold hover:underline focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed text-amber-700 hover:text-amber-800"
              >
                Review
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
