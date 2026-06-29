import { Skeleton } from "@/components/ui/skeleton";

export function BlogsLoadingSkeleton() {
  return (
    <div className="flex-1 space-y-6 px-4 lg:px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl bg-white/40 border border-white/50" />
        ))}
      </div>
      <div className="flex justify-between items-center gap-4 py-2">
        <Skeleton className="h-10 w-48 rounded-xl bg-white/40 border border-white/50" />
        <Skeleton className="h-10 w-32 rounded-xl bg-white/40 border border-white/50" />
      </div>
      <Skeleton className="h-96 w-full rounded-2xl bg-white/40 border border-white/50" />
    </div>
  );
}
