"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PaymentsSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full py-4 animate-pulse">
      {/* Title block skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-lg bg-white/40" />
        <Skeleton className="h-4 w-72 rounded-lg bg-white/40" />
      </div>

      {/* Toolbar skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between p-4 rounded-2xl bg-white/20 border border-white/50">
        <Skeleton className="h-9 w-64 rounded-xl bg-white/40" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-xl bg-white/40" />
          ))}
        </div>
      </div>

      {/* Card list skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/30 border border-white/50 p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-16 bg-white/40" />
                  <Skeleton className="h-4 w-28 bg-white/40" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-20 bg-white/40" />
                  <Skeleton className="h-4 w-32 bg-white/40" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-12 bg-white/40" />
                  <Skeleton className="h-4 w-24 bg-white/40" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-20 rounded-full bg-white/40" />
                </div>
              </div>
              <Skeleton className="size-8 rounded-full bg-white/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
