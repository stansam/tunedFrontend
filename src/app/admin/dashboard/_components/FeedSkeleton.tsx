"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FeedSkeleton() {
  return <Skeleton className="h-[400px] w-full rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs" />;
}
