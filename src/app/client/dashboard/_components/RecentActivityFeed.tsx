"use client";

import type { ActivityLogEntry } from "../_types/dashboard.types";
import { formatDistanceToNow } from "date-fns";

export function RecentActivityFeed({ feed }: { readonly feed: ActivityLogEntry[] }) {
  if (feed.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm p-6 text-center text-slate-500 text-sm h-full flex items-center justify-center">
        No recent activity.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm h-full flex flex-col">
      <div className="p-6 pb-2 border-b">
        <h3 className="tracking-tight text-sm font-semibold">Recent Activity</h3>
      </div>
      <div className="p-6 flex-1 overflow-y-auto max-h-[400px]">
        <ul className="space-y-6">
          {feed.map((entry) => (
            <li key={entry.id} className="relative flex gap-4">
              <div className="absolute left-[11px] top-6 -bottom-6 w-px bg-slate-200 last:hidden" />
              <div className="relative mt-1.5 h-6 w-6 rounded-full border-2 border-emerald-600 bg-white shadow-sm" />
              <div className="flex-1 pb-1">
                <p className="text-sm font-medium text-slate-800">{entry.message}</p>
                <div className="text-xs text-slate-500 mt-1">
                  {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
