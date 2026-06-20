"use client";

import Link from "next/link";
import { History, LayoutGrid } from "lucide-react";
import { RelativeTime } from "./relativeTime";
import type { RecentActivityFeedProps } from "../_props/dashboard.props";

const humanize = (act: string) => {
  const map: Record<string, string> = {
    client_registered: "New client registered",
    order_created: "New order received",
    payment_completed: "Payment verified",
    order_completed: "Order completed",
  };
  return map[act] ?? act.replace(/_/g, " ");
};

export function RecentActivityFeed({ feed }: RecentActivityFeedProps) {
  if (feed.length === 0) {
    return (
      <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-6 text-center text-slate-500 text-sm h-fit flex flex-col items-center justify-center gap-3 min-h-[160px]">
        <History className="h-8 w-8 text-slate-300" />
        <p>No recent activity.</p>
        <Link href={{ pathname: "/admin/orders" }} className="text-xs text-emerald-600 hover:underline font-semibold flex items-center gap-1">
          <LayoutGrid className="h-3 w-3" /> Go to Workspace
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs h-fit flex flex-col">
      <div className="p-6 pb-2 border-b border-white/20">
        <h3 className="tracking-tight text-sm font-bold text-slate-800">System Activity</h3>
      </div>
      <div className="p-6 flex-1 overflow-y-auto max-h-[350px]">
        <ul className="space-y-6">
          {feed.map((entry) => (
            <li key={entry.id} className="relative flex gap-4">
              <div className="absolute left-[11px] top-6 -bottom-6 w-px bg-slate-200/50 last:hidden" aria-hidden="true" />
              <div className="relative mt-1.5 h-6 w-6 shrink-0 rounded-full border-2 border-emerald-500 bg-white shadow-xs" />
              <div className="flex-1 pb-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 wrap-break-word">
                  {humanize(entry.action)}
                  {entry.entity_id && (
                    <span className="ml-1 text-slate-400 text-[10px] font-normal">
                      #{entry.entity_id.slice(0, 8)}
                    </span>
                  )}
                </p>
                <RelativeTime date={entry.created_at} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
