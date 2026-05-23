"use client";

import { BarChart3 } from "lucide-react";

export function EmptyChartCard({ title }: { readonly title: string }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm h-full flex flex-col min-h-[250px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-sm font-semibold">{title}</h3>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-6 gap-2">
        <BarChart3 className="h-8 w-8 stroke-[1.5]" />
        <span className="text-xs font-medium text-slate-500">No data available</span>
      </div>
    </div>
  );
}
