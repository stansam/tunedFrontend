"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { EmptyChartCard } from "./EmptyChartCard";
import type { ServiceMixChartProps } from "../_props/dashboard.props";

export function ServiceMixChart({ data }: ServiceMixChartProps) {
  if (!data || data.length === 0) {
    return <EmptyChartCard title="Service Mix" />;
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm h-full flex flex-col min-h-[250px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-sm font-semibold">Service Mix</h3>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[180px] flex items-center justify-center">
        <div className="h-full w-full">
          <BarChart
            data={data}
            layout="vertical"
            width={280}
            height={180}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <XAxis type="number" fontSize={10} hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              fontSize={10}
              width={100}
            />
            <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: "8px" }} />
            <Bar dataKey="value" fill="#059669" radius={[0, 4, 4, 0]} barSize={16} />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
