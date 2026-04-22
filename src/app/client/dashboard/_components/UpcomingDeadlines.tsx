"use client";

import type { UpcomingDeadline } from "../_types/dashboard.types";


export function UpcomingDeadlines({ deadlines }: { readonly deadlines: UpcomingDeadline[] }) {
  if (deadlines.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm p-6 text-center text-slate-500 text-sm h-full flex items-center justify-center">
        No upcoming deadlines.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm h-full flex flex-col">
      <div className="p-6 pb-2 border-b">
        <h3 className="tracking-tight text-sm font-semibold">Upcoming Deadlines</h3>
      </div>
      <div className="p-0 flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase hidden md:table-header-group">
            <tr>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Topic</th>
              <th className="px-6 py-3 font-medium">Due Date</th>
              <th className="px-6 py-3 font-medium text-right">Urgency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {deadlines.map((deadline) => (
              <tr key={deadline.id} className="hover:bg-slate-50 transition-colors flex flex-col md:table-row py-3 md:py-0">
                <td className="px-6 py-1 md:py-4 font-mono font-medium text-slate-800">
                  {deadline.order_number}
                </td>
                <td className="px-6 py-1 md:py-4 text-slate-600 truncate max-w-[200px]" title={deadline.title}>
                  {deadline.title}
                </td>
                <td className="px-6 py-1 md:py-4 text-slate-500">
                  {new Date(deadline.due_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-1 md:py-4 md:text-right">
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

function UrgencyBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    LOW: "bg-slate-100 text-slate-700",
    NORMAL: "bg-blue-100 text-blue-700",
    HIGH: "bg-amber-100 text-amber-700",
    URGENT: "bg-red-100 text-red-700",
  };

  const cssClass = colors[priority] || colors.NORMAL;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider ${cssClass}`}>
      {priority}
    </span>
  );
}
