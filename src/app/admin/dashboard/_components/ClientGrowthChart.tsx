"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { EmptyChartCard } from "./EmptyChartCard";
import type { ReferralGrowthChartProps } from "../_props/dashboard.props";

const formatMonth = (val: string) => {
  const parts = val.split("-");
  if (parts.length === 2) {
    const idx = parseInt(parts[1] as string, 10) - 1;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[idx] ?? val;
  }
  return val;
};

export function ClientGrowthChart({ data }: ReferralGrowthChartProps) {
  if (!data || data.length === 0) {
    return <EmptyChartCard title="Client Growth" />;
  }

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs h-full flex flex-col min-h-[280px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-xs font-bold text-slate-800 uppercase">Client Growth</h3>
        <p className="text-[10px] text-slate-500 font-medium">New registrations over time</p>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[180px] flex items-center justify-center">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={formatMonth} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: "#3b82f6" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
