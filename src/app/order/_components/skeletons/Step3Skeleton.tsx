"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function Step3Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-3xl bg-white/60 p-8 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 bg-slate-200" />
          <Skeleton className="h-4 w-48 bg-slate-200" />
        </div>
        <Skeleton className="h-40 rounded-2xl bg-slate-200" />
        <Skeleton className="h-40 rounded-2xl bg-slate-200" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-24 rounded-2xl bg-slate-200" />
          <Skeleton className="h-24 rounded-2xl bg-slate-200" />
        </div>
      </div>
      <Skeleton className="h-64 rounded-3xl bg-slate-900/10" />
    </div>
  );
}
