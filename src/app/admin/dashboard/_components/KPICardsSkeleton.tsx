"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function KPICardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded bg-slate-200/60" />
            <Skeleton className="h-4 w-12 rounded-full bg-slate-200/60" />
          </div>
          <Skeleton className="h-7 w-28 rounded bg-slate-200/60" />
          <Skeleton className="h-3 w-40 rounded bg-slate-200/60" />
        </div>
      ))}
    </div>
  );
}
