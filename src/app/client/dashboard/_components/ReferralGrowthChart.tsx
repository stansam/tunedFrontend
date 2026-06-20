"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { EmptyChartCard } from "./EmptyChartCard";
import type { ReferralGrowthChartProps } from "../_props/dashboard.props";

export function ReferralGrowthChart({ data }: ReferralGrowthChartProps) {
  if (!data || data.length === 0) {
    return <EmptyChartCard title="Referral Growth" />;
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm h-full flex flex-col min-h-[250px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-sm font-semibold">Referral Growth</h3>
        <p className="text-xs text-slate-500">Cumulative commission</p>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[180px] flex items-center justify-center">
        <div className="h-full w-full">
          <LineChart data={data} width={280} height={180} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: "#3b82f6" }} />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
