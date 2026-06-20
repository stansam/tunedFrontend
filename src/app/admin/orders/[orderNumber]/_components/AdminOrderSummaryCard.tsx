"use client";

import type { AdminOrderSummaryCardProps } from "../_props";
import { AdminOrderCountdownTimer } from "./AdminOrderCountdownTimer";

const BADGE_CLASSES: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  revision: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  overdue: "bg-red-100 text-red-800 border-red-200",
  canceled: "bg-slate-100 text-slate-500 border-slate-200",
  "completed pending review": "bg-orange-100 text-orange-800 border-orange-200",
  "completed_pending_review": "bg-orange-100 text-orange-800 border-orange-200",
};

export function AdminOrderSummaryCard({ order }: AdminOrderSummaryCardProps) {
  const isPaid = order.paid;
  const isEscalated = order.escalated;
  const extensionRequested = order.extension_requested;

  const statusClass = BADGE_CLASSES[order.status] ?? "bg-slate-100 border-slate-200 text-slate-800";

  return (
    <div className="bg-white/40 border border-white/50 backdrop-blur-md rounded-xl p-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Status:</span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusClass}`}>
            {order.status.replace(/_/g, " ")}
          </span>
          {isPaid ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-emerald-100 text-emerald-800 border-emerald-200">
              Paid
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-amber-100 text-amber-800 border-amber-200">
              Unpaid
            </span>
          )}
          {isEscalated && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-red-100 text-red-800 border-red-200 animate-pulse">
              Escalated
            </span>
          )}
          {extensionRequested && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-blue-100 text-blue-800 border-blue-200">
              Extension Req
            </span>
          )}
        </div>
        <div className="text-sm text-slate-600">
          Client: <span className="text-slate-800 font-semibold">{order.client_username}</span>
        </div>
      </div>

      <div className="flex flex-col items-start sm:items-end space-y-1">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Deadline</span>
        <AdminOrderCountdownTimer dueDate={order.due_date} />
      </div>
    </div>
  );
}
