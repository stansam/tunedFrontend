"use client";

import { useId } from "react";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { EmptyChartCard } from "./EmptyChartCard";
import type { SpendingVelocityChartProps } from "../_props/dashboard.props";

const formatMonth = (value: string) => {
  const parts = value.split("-");
  if (parts.length === 2) {
    const monthIndex = parseInt(parts[1] as string, 10) - 1;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthIndex] ?? value;
  }
  return value;
};

export function SpendingVelocityChart({ data }: SpendingVelocityChartProps) {
  const gradId = useId();

  if (!data || data.length === 0) {
    return <EmptyChartCard title="Spending Velocity" />;
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm h-full flex flex-col min-h-[250px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-sm font-semibold">Spending Velocity</h3>
        <p className="text-xs text-slate-500">Monthly confirmed payments</p>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[180px]">
        <div className="h-full w-full">
          <AreaChart data={data} width={280} height={180} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatMonth} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
            <Area type="monotone" dataKey="amount" stroke="#059669" strokeWidth={2} fillOpacity={1} fill={`url(#${gradId})`} />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}
