"use client";

import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { CHART_COLORS } from "../_utils/dashboard.utils";
import { EmptyChartCard } from "./EmptyChartCard";
import type { ProjectLifecycleChartProps } from "../_props/dashboard.props";

export function ProjectLifecycleChart({ data }: ProjectLifecycleChartProps) {
  if (!data || data.length === 0) {
    return <EmptyChartCard title="Project Lifecycle" />;
  }

  const chartData = data.map((entry, index) => ({
    ...entry,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  return (
    <div className="rounded-xl border bg-white shadow-sm h-full flex flex-col min-h-[250px]">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-sm font-semibold">Project Lifecycle</h3>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[180px] flex items-center justify-center">
        <div className="h-full w-full flex justify-center">
          <PieChart width={240} height={180}>
            <Pie
              data={chartData}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            />
            <Tooltip wrapperStyle={{ borderRadius: "8px", outline: "none" }} />
            <Legend verticalAlign="bottom" height={25} iconType="circle" fontSize={8} />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
