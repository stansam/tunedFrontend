"use client";

import type { AdminOrderInfoCardProps } from "../_props";

export function AdminOrderInfoCard({ order }: AdminOrderInfoCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white/40 border border-white/50 rounded-xl p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-semibold text-slate-800">Order Details</h3>
      <div className="space-y-3 text-xs">
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Client Name</span>
          <span className="text-slate-800 font-semibold">{order.client_username}</span>
        </div>
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Service Type</span>
          <span className="text-slate-800 font-semibold">{order.service_name || "Custom Service"}</span>
        </div>
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Academic Level</span>
          <span className="text-slate-800 font-semibold">{order.academic_level_name || "N/A"}</span>
        </div>
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Order Price</span>
          <span className="text-emerald-700 font-bold text-sm">${order.total_price || "0.00"}</span>
        </div>
        <div>
          <span className="text-slate-500 block mb-0.5 font-medium">Created At</span>
          <span className="text-slate-800 font-semibold">{formatDate(order.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
