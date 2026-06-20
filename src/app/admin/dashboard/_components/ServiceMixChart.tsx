"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { EmptyChartCard } from "./EmptyChartCard";
import type { ServiceMixChartProps } from "../_props/dashboard.props";

export function ServiceMixChart({ data }: ServiceMixChartProps) {
  if (!data || data.length === 0) {
    return <EmptyChartCard title="Service Mix" />;
  }

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs h-full flex flex-col min-h-[280px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-xs font-bold text-slate-800 uppercase">Service Mix</h3>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[180px] flex items-center justify-center">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <XAxis type="number" fontSize={10} hide />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                fontSize={9}
                width={80}
                stroke="#64748b"
              />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.06)" }} contentStyle={{ borderRadius: "8px" }} />
              <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
