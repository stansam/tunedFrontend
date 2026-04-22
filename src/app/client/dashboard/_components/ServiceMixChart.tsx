"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import type { ChartData } from "../_types/dashboard.types";

export function ServiceMixChart({ data }: { readonly data: ChartData[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="rounded-xl border bg-white shadow-sm h-full flex flex-col">
      <div className="p-6 pb-2">
        <h3 className="tracking-tight text-sm font-semibold">Service Mix</h3>
      </div>
      <div className="p-6 pt-0 flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false}
              fontSize={12}
              width={100}
            />
            <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px' }} />
            <Bar dataKey="value" fill="#059669" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>

        </ResponsiveContainer>
      </div>
    </div>
  );
}
