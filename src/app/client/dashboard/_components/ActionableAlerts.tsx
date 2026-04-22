"use client";

import type { ActionableAlert } from "../_types/dashboard.types";
import { AlertCircle } from "lucide-react";

export function ActionableAlerts({ alerts }: { readonly alerts: ActionableAlert[] }) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm p-6 text-center text-slate-500 text-sm">
        No pending alerts or notifications.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="flex items-center gap-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 shadow-sm transition hover:bg-yellow-100"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">{alert.message}</p>
          </div>
          <button className="text-sm font-semibold hover:underline">
            Review
          </button>
        </div>
      ))}
    </div>
  );
}
