"use client";

import { Activity } from "lucide-react";
import type { KPIData } from "../_types/dashboard.types";

export function KPICards({ data }: { readonly data: KPIData }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <div className="rounded-xl border bg-white text-slate-950 shadow-sm">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Active Projects</h3>
          <Activity className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">{data.active_projects}</div>
          <p className="text-xs text-slate-500">Orders in progress or review</p>
        </div>
      </div>
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="tracking-tight text-sm font-medium">Portfolio Value</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">${data.portfolio_value.toFixed(2)}</div>
          <p className="text-xs text-slate-500">Invested in active orders</p>
        </div>
      </div>
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="tracking-tight text-sm font-medium">Reward Points</h3>
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">{data.reward_points} pts</div>
          <p className="text-xs text-slate-500">Ready for redemption</p>
        </div>
      </div>
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="p-6 flex flex-row items-center justify-between pb-2">
          <h3 className="tracking-tight text-sm font-medium">Next Deadline</h3>
        </div>
        <div className="p-6 pt-0 flex flex-col justify-center">
          {data.next_deadline ? (
            <div className="text-xl font-bold text-emerald-600">
              {new Date(data.next_deadline).toLocaleDateString()}
            </div>
          ) : (
            <div className="text-xl font-bold text-slate-400">None</div>
          )}
          <p className="text-xs text-slate-500">Earliest active order</p>
        </div>
      </div>
    </div>
  );
}
