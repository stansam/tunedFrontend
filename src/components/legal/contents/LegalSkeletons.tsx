"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ConsentSkeleton() {
  return (
    <div className="space-y-4 py-2">
      <Skeleton className="h-16 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <div className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function TermsContentSkeleton() {
  return (
    <div className="flex h-[60vh] max-h-[600px] flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-56 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full min-w-[120px] rounded-lg" />
        ))}
      </aside>
      <div className="flex-1 space-y-6">
        <Skeleton className="h-6 w-1/3 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <Skeleton className="h-4 w-4/5 rounded-md" />
        <hr className="border-slate-100" />
        <Skeleton className="h-6 w-1/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
      </div>
    </div>
  );
}

export function PrivacyContentSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-11 w-full rounded-xl" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function RefundContentSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-14 w-full rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function SecurityContentSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-60 w-full rounded-2xl" />
    </div>
  );
}
