"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import type { Priority } from "../_types/dashboard.types";
import type { UpcomingDeadlinesProps } from "../_props/dashboard.props";

const pColors: Record<Priority, string> = {
  LOW: "bg-slate-100 text-slate-700",
  NORMAL: "bg-blue-100 text-blue-700",
  HIGH: "bg-amber-100 text-amber-700",
  URGENT: "bg-red-100 text-red-700",
};

function UrgencyBadge({ priority }: { readonly priority: Priority }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${pColors[priority]}`}>
      {priority}
    </span>
  );
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  if (deadlines.length === 0) {
    return (
      <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-6 text-center text-slate-500 text-sm h-fit flex flex-col items-center justify-center gap-3 min-h-[160px]">
        <Clock className="h-8 w-8 text-slate-300" />
        <p>No upcoming deadlines.</p>
        <Link href={{ pathname: "/admin/orders" }} className="text-xs text-emerald-600 hover:underline font-semibold">
          View all orders →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs h-fit flex flex-col overflow-hidden">
      <div className="p-6 pb-2 border-b border-white/20">
        <h3 className="tracking-tight text-sm font-bold text-slate-800">Critical Deadlines</h3>
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="md:hidden divide-y divide-white/25 p-4 space-y-4">
          {deadlines.map((d) => (
            <div key={d.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-700">{d.order_number}</span>
                <UrgencyBadge priority={d.priority} />
              </div>
              <p className="text-xs text-slate-600 truncate">{d.title || "Untitled"}</p>
              <p className="text-[10px] text-slate-400 font-medium">Due: {new Date(d.due_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <table className="w-full text-xs text-left hidden md:table">
          <thead className="bg-white/10 text-slate-500 uppercase font-bold text-[10px]">
            <tr>
              <th className="px-6 py-3">Order</th>
              <th className="px-6 py-3">Topic</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3 text-right">Urgency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {deadlines.map((d) => (
              <tr key={d.id} className="hover:bg-white/10 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-800">{d.order_number}</td>
                <td className="px-6 py-4 text-slate-600 truncate max-w-[200px]">{d.title || "Untitled"}</td>
                <td className="px-6 py-4 text-slate-500 font-medium">{new Date(d.due_date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right"><UrgencyBadge priority={d.priority} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
