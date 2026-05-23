"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { ActionableAlertsProps } from "../_props/dashboard.props";

export function ActionableAlerts({ alerts }: ActionableAlertsProps) {
  const router = useRouter();

  if (alerts.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm p-6 text-center text-slate-500 text-sm flex flex-col items-center justify-center gap-2">
        <CheckCircle className="h-8 w-8 text-emerald-500" />
        <p className="font-semibold text-slate-700">All caught up!</p>
        <p className="text-xs text-slate-400">No pending actionable items.</p>
      </div>
    );
  }

  const handleReview = (orderId?: string) => {
    if (orderId) {
      router.push(`/client/orders/${orderId}`);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-4 max-h-[300px] overflow-auto">
      <div className="space-y-3">
        {alerts.map((alert) => {
          const orderId = alert.metadata?.order_id;
          return (
            <div
              key={alert.id}
              role="alert"
              className="flex items-center gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 shadow-sm transition hover:bg-amber-100"
            >
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium wrap-break-word">{alert.message}</p>
              </div>
              <button
                type="button"
                onClick={() => handleReview(orderId)}
                disabled={!orderId}
                aria-disabled={!orderId}
                className="shrink-0 text-sm font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-amber-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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

