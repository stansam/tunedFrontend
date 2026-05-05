"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function Step1Skeleton() {
  return (
    <div className="rounded-3xl bg-white/60 p-8 space-y-8 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64 bg-slate-200" />
        <Skeleton className="h-4 w-48 bg-slate-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24 bg-slate-200" />
            <Skeleton className="h-14 w-full rounded-2xl bg-slate-200" />
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-black/5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-40 rounded-3xl bg-slate-200" />
        <Skeleton className="h-40 rounded-3xl bg-slate-200" />
      </div>
    </div>
  );
}
