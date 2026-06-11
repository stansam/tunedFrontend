"use client";

import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { EmptyChartCard } from "./EmptyChartCard";
import type { ProjectLifecycleChartProps } from "../_props/dashboard.props";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#64748b"];

export function ProjectLifecycleChart({ data }: ProjectLifecycleChartProps) {
  if (!data || data.length === 0) {
    return <EmptyChartCard title="Order Lifecycle" />;
  }

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs h-full flex flex-col min-h-[280px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-xs font-bold text-slate-800 uppercase">Order Lifecycle</h3>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[180px] flex items-center justify-center">
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ borderRadius: "8px", outline: "none" }} />
              <Legend verticalAlign="bottom" height={25} iconType="circle" wrapperStyle={{ fontSize: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
