"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { getPriorityColorClass } from "../_utils/dashboard.utils";
import type { Priority } from "../_types/dashboard.types";
import type { UpcomingDeadlinesProps } from "../_props/dashboard.props";

function UrgencyBadge({ priority }: { readonly priority: Priority }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${getPriorityColorClass(priority)}`}>
      {priority}
    </span>
  );
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  if (deadlines.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm p-6 text-center text-slate-500 text-sm h-fit flex flex-col items-center justify-center gap-3 min-h-[160px]">
        <Clock className="h-8 w-8 text-slate-300" />
        <p>No upcoming deadlines.</p>
        <Link href="/client/orders" className="text-xs text-emerald-600 hover:underline font-medium">
          View all orders →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm h-fit flex flex-col overflow-auto">
      <div className="p-6 pb-2 border-b">
        <h3 className="tracking-tight text-sm font-semibold">Upcoming Deadlines</h3>
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="md:hidden divide-y divide-slate-100 p-4 space-y-4">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="pt-4 first:pt-0 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-medium text-slate-800">{deadline.order_number}</span>
                <UrgencyBadge priority={deadline.priority} />
              </div>
              <p className="text-sm text-slate-600 truncate" title={deadline.title || "Untitled"}>{deadline.title || "Untitled"}</p>
              <p className="text-xs text-slate-500">Due: {new Date(deadline.due_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <table className="w-full text-sm text-left hidden md:table">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Topic</th>
              <th className="px-6 py-3 font-medium">Due Date</th>
              <th className="px-6 py-3 font-medium text-right">Urgency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {deadlines.map((deadline) => (
              <tr key={deadline.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-medium text-slate-800">{deadline.order_number}</td>
                <td className="px-6 py-4 text-slate-600 truncate max-w-[200px]" title={deadline.title || "Untitled"}>{deadline.title || "Untitled"}</td>
                <td className="px-6 py-4 text-slate-500">{new Date(deadline.due_date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <UrgencyBadge priority={deadline.priority} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
