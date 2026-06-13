"use client";

import type { AdminDeliveryStatusBadgeProps } from "../_props";

export function AdminDeliveryStatusBadge({ status, statusColor }: AdminDeliveryStatusBadgeProps) {
  const getBadgeClasses = (color: string) => {
    switch (color) {
      case "success":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "warning":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "danger":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getBadgeClasses(statusColor)}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
