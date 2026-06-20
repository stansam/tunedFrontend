"use client";

import type { AdminDeliveryStatusBadgeProps } from "../_props";

export function AdminDeliveryStatusBadge({ status, statusColor }: AdminDeliveryStatusBadgeProps) {
  const getBadgeClasses = (color: string) => {
    switch (color) {
      case "success":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "danger":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getBadgeClasses(statusColor)}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
