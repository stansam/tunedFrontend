"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function UpcomingDeadlinesSkeleton() {
  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/20">
        <Skeleton className="h-4 w-32 rounded bg-slate-200/60" />
        <Skeleton className="h-4 w-16 rounded bg-slate-200/60" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
            <div className="space-y-1">
              <Skeleton className="h-4 w-24 rounded bg-slate-200/60" />
              <Skeleton className="h-3 w-36 rounded bg-slate-200/60" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full bg-slate-200/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
