import { Skeleton } from "@/components/ui/skeleton";

export function TestimonialsLoadingSkeleton() {
  return (
    <div className="flex-1 space-y-6 px-4 lg:px-6 py-6 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48 rounded-xl bg-white/40 border border-white/50" />
        <Skeleton className="h-4 w-80 rounded-lg bg-white/40 border border-white/50" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl bg-white/40 border border-white/50" />
        ))}
      </div>

      <div className="flex flex-wrap gap-4 py-2">
        <Skeleton className="h-10 flex-1 min-w-[200px] rounded-xl bg-white/40 border border-white/50" />
        <Skeleton className="h-10 w-40 rounded-xl bg-white/40 border border-white/50" />
        <Skeleton className="h-10 w-40 rounded-xl bg-white/40 border border-white/50" />
        <Skeleton className="h-10 w-40 rounded-xl bg-white/40 border border-white/50" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl bg-white/40 border border-white/50" />
        ))}
      </div>
    </div>
  );
}
