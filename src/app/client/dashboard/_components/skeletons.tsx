"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function KPICardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function MilestoneTrackerSkeleton() {
  return <Skeleton className="h-40 w-full rounded-xl" />;
}

export function ChartSkeleton() {
  return <Skeleton className="h-64 w-full rounded-xl" />;
}

export function FeedSkeleton() {
  return <Skeleton className="h-[400px] w-full rounded-xl" />;
}

export function AlertsSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
    </div>
  );
}
