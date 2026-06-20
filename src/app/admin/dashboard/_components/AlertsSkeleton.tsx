"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function AlertsSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-16 w-full rounded-xl bg-slate-200/60" />
      <Skeleton className="h-16 w-full rounded-xl bg-slate-200/60" />
    </div>
  );
}
