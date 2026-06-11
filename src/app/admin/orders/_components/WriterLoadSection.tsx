"use client";

import { Users } from "lucide-react";
import type { WriterLoadSectionProps } from "../_props/orders.props";

export function WriterLoadSection({ writerLoad }: WriterLoadSectionProps) {
  const getBadgeColor = (status: "Busy" | "OK" | "Free") => {
    if (status === "Busy") return "bg-amber-100 text-amber-800 border-amber-200";
    if (status === "OK") return "bg-emerald-100 text-emerald-800 border-emerald-200";
    return "bg-slate-100 text-slate-800 border-slate-200";
  };

  const getBarColor = (status: "Busy" | "OK" | "Free") => {
    if (status === "Busy") return "bg-amber-500";
    if (status === "OK") return "bg-emerald-500";
    return "bg-slate-400";
  };

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-6 space-y-4 h-full flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <Users className="size-4 text-emerald-500" />
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Writer Load Distribution</h3>
      </div>
      
      <div className="space-y-3 pt-2">
        {writerLoad.map((w) => {
          const initials = w.name.split(" ").map(n => n[0]).join("");
          const loadPercent = Math.min((w.orders_count / 10) * 100, 100);
          return (
            <div key={w.id} className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span className="truncate">{w.name}</span>
                  <span className="shrink-0">{w.orders_count} orders</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${getBarColor(w.status)}`} style={{ width: `${loadPercent}%` }} />
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getBadgeColor(w.status)}`}>
                {w.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
