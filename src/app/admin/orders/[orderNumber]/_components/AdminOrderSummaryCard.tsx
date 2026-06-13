"use client";

import type { AdminOrderSummaryCardProps } from "../_props";
import { AdminOrderCountdownTimer } from "./AdminOrderCountdownTimer";

export function AdminOrderSummaryCard({ order }: AdminOrderSummaryCardProps) {
  const isPaid = order.paid;
  const isEscalated = order.escalated;
  const extensionRequested = order.extension_requested;

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-5 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Status:</span>
          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {order.status.replace(/_/g, " ")}
          </span>
          {isPaid ? (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Paid
            </span>
          ) : (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Unpaid
            </span>
          )}
          {isEscalated && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
              Escalated
            </span>
          )}
          {extensionRequested && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Extension Req
            </span>
          )}
        </div>
        <div className="text-sm text-slate-300">
          Client: <span className="text-white font-medium">{order.client_username}</span>
        </div>
      </div>

      <div className="flex flex-col items-start sm:items-end space-y-1">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Deadline</span>
        <AdminOrderCountdownTimer dueDate={order.due_date} />
      </div>
    </div>
  );
}
