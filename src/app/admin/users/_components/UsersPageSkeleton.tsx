import { Skeleton } from "@/components/ui/skeleton";

export function UsersPageSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 p-4 md:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 bg-slate-300" />
          <Skeleton className="h-4 w-72 bg-slate-300" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 bg-slate-300 rounded-xl" />
          <Skeleton className="h-10 w-32 bg-slate-300 rounded-xl" />
        </div>
      </div>

      {/* Stats KPI Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-md shadow-sm h-32">
            <Skeleton className="h-4 w-24 bg-slate-300" />
            <Skeleton className="mt-4 h-8 w-16 bg-slate-300" />
            <Skeleton className="mt-2 h-4 w-32 bg-slate-300" />
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-md shadow-sm h-96">
          <Skeleton className="h-6 w-36 bg-slate-300" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/10">
                <Skeleton className="h-10 w-10 rounded-full bg-slate-300" />
                <Skeleton className="h-4 w-32 bg-slate-300" />
                <Skeleton className="h-4 w-16 bg-slate-300" />
                <Skeleton className="h-4 w-12 bg-slate-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-md shadow-sm h-64">
            <Skeleton className="h-6 w-48 bg-slate-300" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full bg-slate-300" />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-md shadow-sm h-32">
            <Skeleton className="h-6 w-48 bg-slate-300" />
            <Skeleton className="mt-4 h-4 w-full bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
