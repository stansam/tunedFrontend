"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return <Skeleton className="h-[280px] w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs" />;
}
