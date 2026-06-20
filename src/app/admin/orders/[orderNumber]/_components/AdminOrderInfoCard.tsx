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
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg space-y-4">
      <h3 className="text-sm font-semibold text-white">Order Details</h3>
      <div className="space-y-3 text-xs">
        <div>
          <span className="text-slate-400 block mb-0.5">Client Name</span>
          <span className="text-white font-medium">{order.client_username}</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Service Type</span>
          <span className="text-white font-medium">{order.service_name || "Custom Service"}</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Academic Level</span>
          <span className="text-white font-medium">{order.academic_level_name || "N/A"}</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Order Price</span>
          <span className="text-emerald-400 font-bold text-sm">${order.total_price || "0.00"}</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Created At</span>
          <span className="text-white">{formatDate(order.created_at)}</span>
        </div>
      </div>
    </div>
  );
}
