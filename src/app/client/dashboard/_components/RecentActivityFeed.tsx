"use client";

import Link from "next/link";
import { History, ShoppingCart } from "lucide-react";
import { RelativeTime } from "./relativeTime";
import { humanizeAction } from "../_utils/dashboard.utils";
import type { RecentActivityFeedProps } from "../_props/dashboard.props";

export function RecentActivityFeed({ feed }: RecentActivityFeedProps) {
  if (feed.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm p-6 text-center text-slate-500 text-sm h-fit flex flex-col items-center justify-center gap-3 min-h-[160px]">
        <History className="h-8 w-8 text-slate-300" />
        <p>No recent activity.</p>
        <Link href="/client/orders/new" className="text-xs text-emerald-600 hover:underline font-medium flex items-center gap-1">
          <ShoppingCart className="h-3 w-3" /> Place a new order
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm h-fit flex flex-col">
      <div className="p-6 pb-2 border-b">
        <h3 className="tracking-tight text-sm font-semibold">Recent Activity</h3>
      </div>
      <div className="p-6 flex-1 overflow-y-auto max-h-[350px]">
        <ul className="space-y-6">
          {feed.map((entry) => (
            <li key={entry.id} className="relative flex gap-4">
              <div className="absolute left-[11px] top-6 -bottom-6 w-px bg-slate-200 last:hidden" aria-hidden="true" />
              <div className="relative mt-1.5 h-6 w-6 shrink-0 rounded-full border-2 border-emerald-600 bg-white shadow-sm" />
              <div className="flex-1 pb-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 wrap-break-word">
                  {humanizeAction(entry.action)}
                  {entry.entity_id && (
                    <span className="ml-1 text-slate-400 text-xs font-normal">
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
