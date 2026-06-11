"use client";

import { cn } from "@/lib/utils";
import type { OrdersStatsProps } from "../_props/orders.props";
import type { AdminOrderStatus } from "../_types/orders.types";

export function OrdersStats({ stats, activeTab, onTabChange }: OrdersStatsProps) {
  const cards: { label: string; value: number; key: AdminOrderStatus | "all"; border: string; activeBg: string }[] = [
    { label: "All", value: stats.all, key: "all", border: "border-slate-200/50", activeBg: "bg-slate-500/10 text-slate-800" },
    { label: "Pending", value: stats.pending, key: "pending", border: "border-amber-200/50", activeBg: "bg-amber-500/10 text-amber-800" },
    { label: "In Progress", value: stats.in_progress, key: "active", border: "border-emerald-200/50", activeBg: "bg-emerald-500/10 text-emerald-800" },
    { label: "Revision", value: stats.revision, key: "revision", border: "border-purple-200/50", activeBg: "bg-purple-500/10 text-purple-800" },
    { label: "Completed", value: stats.completed, key: "completed", border: "border-blue-200/50", activeBg: "bg-blue-500/10 text-blue-800" },
    { label: "Overdue", value: stats.overdue, key: "overdue", border: "border-red-200/50", activeBg: "bg-red-500/10 text-red-800" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
      {cards.map((c) => {
        const isActive = activeTab === c.key;
        return (
          <button
            key={c.key}
            onClick={() => onTabChange(c.key)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 text-center",
              "bg-white/40 backdrop-blur-md hover:bg-white/60 hover:shadow-md cursor-pointer",
              c.border,
              isActive ? cn("ring-2 ring-emerald-500 bg-white/80 shadow-md", c.activeBg) : "text-slate-600"
            )}
          >
            <span className="text-2xl font-bold tracking-tight">{c.value}</span>
            <span className="text-xs font-medium uppercase mt-1 tracking-wider opacity-80">{c.label}</span>
          </button>
        );
      })}
    </div>
  );
}
