import { Skeleton } from "@/components/ui/skeleton";

export function SamplesLoadingSkeleton() {
  return (
    <div className="flex-1 space-y-6 px-4 lg:px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-pulse">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40 rounded-xl bg-white/40 border border-white/50" />
          <Skeleton className="h-4 w-72 rounded-lg bg-white/40 border border-white/50" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl bg-white/40 border border-white/50" />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 py-2">
        <Skeleton className="h-10 w-full sm:w-64 rounded-xl bg-white/40 border border-white/50" />
        <Skeleton className="h-10 w-full sm:w-48 rounded-xl bg-white/40 border border-white/50" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl bg-white/40 border border-white/50" />
        ))}
      </div>
    </div>
  );
}
