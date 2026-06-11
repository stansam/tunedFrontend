"use client";

import { useId } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { EmptyChartCard } from "./EmptyChartCard";
import type { SpendingVelocityChartProps } from "../_props/dashboard.props";

const formatMonth = (val: string) => {
  const parts = val.split("-");
  if (parts.length === 2) {
    const idx = parseInt(parts[1] as string, 10) - 1;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[idx] ?? val;
  }
  return val;
};

export function RevenueVelocityChart({ data }: SpendingVelocityChartProps) {
  const gradId = useId();

  if (!data || data.length === 0) {
    return <EmptyChartCard title="Revenue Velocity" />;
  }

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs h-full flex flex-col min-h-[280px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-xs font-bold text-slate-800 uppercase">Revenue Velocity</h3>
        <p className="text-[10px] text-slate-500 font-medium">Monthly platform volume</p>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[180px]">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={formatMonth} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
              <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill={`url(#${gradId})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
