import { cn } from "@/lib/utils";
import type { BlogCardSkeletonProps, SampleCardSkeletonProps } from "../_props";

export function HeroSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="w-full md:w-[42%] space-y-4">
          <div className="h-32 rounded-2xl bg-slate-200" />
          <div className="h-20 rounded-2xl bg-slate-200" />
          <div className="h-8 w-3/4 rounded-full bg-slate-200" />
          <div className="h-10 w-full max-w-[320px] rounded-full bg-slate-200" />
        </div>
        <div className="w-full md:w-[58%] flex justify-center">
          <div className="h-[560px] w-[320px] rounded-[48px] bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton({ isPrimary = false }: BlogCardSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-slate-200",
        isPrimary ? "min-h-[340px]" : "min-h-[240px]"
      )}
      aria-hidden="true"
    />
  );
}

function SampleCardSkeleton({ index = 0 }: SampleCardSkeletonProps) {
  return (
    <div
      className="animate-pulse rounded-2xl bg-slate-100 overflow-hidden"
      aria-hidden="true"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="h-44 w-full bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 rounded bg-slate-200" />
        <div className="h-4 w-4/5 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-3/4 rounded bg-slate-200" />
      </div>
    </div>
  );
}