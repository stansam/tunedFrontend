"use client";

import Link from "next/link";
import type { AdminOrderDetailHeaderProps } from "../_props";

export function AdminOrderDetailHeader({
  order,
  onActivate,
  onEscalate,
  isActivating,
  isEscalating,
}: AdminOrderDetailHeaderProps) {
  const isPending = order.status === "pending";
  const isOverdue = order.status === "overdue";

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-2">
          <Link href="/admin/dashboard" className="hover:text-emerald-400 transition">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/admin/orders" className="hover:text-emerald-400 transition">
            Orders
          </Link>
          <span>/</span>
          <span className="text-slate-300 font-medium">Details</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          Order #{order.order_number}
          {order.escalated && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">
              Escalated
            </span>
          )}
        </h1>
      </div>

      <div className="flex flex-wrap gap-3">
        {isPending && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to activate this order?")) onActivate();
            }}
            disabled={isActivating}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm transition font-medium shadow-lg shadow-emerald-500/10"
          >
            {isActivating ? "Activating..." : "Activate Order"}
          </button>
        )}
        {isOverdue && !order.escalated && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to escalate this overdue order?")) onEscalate();
            }}
            disabled={isEscalating}
            className="w-full sm:w-auto px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm transition font-medium"
          >
            {isEscalating ? "Escalating..." : "Escalate Order"}
          </button>
        )}
      </div>
    </div>
  );
}
