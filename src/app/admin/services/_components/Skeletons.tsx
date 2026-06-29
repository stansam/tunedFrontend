import { Skeleton } from "@/components/ui/skeleton";

export function FilterSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-white/50 bg-white/20 backdrop-blur-md">
      <Skeleton className="h-10 flex-1 rounded-xl" />
      <Skeleton className="h-10 w-full md:w-40 rounded-xl" />
      <Skeleton className="h-10 w-full md:w-40 rounded-xl" />
    </div>
  );
}

export function ServiceRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-xl" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="rounded-xl border border-white/50 bg-white/30 backdrop-blur-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-16 rounded-xl" />
          <Skeleton className="h-9 w-16 rounded-xl" />
        </div>
      </div>
      <div className="space-y-3 pt-2">
        <ServiceRowSkeleton />
        <ServiceRowSkeleton />
      </div>
    </div>
  );
}

export function ServicesLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <FilterSkeleton />
      <div className="space-y-6">
        <CategorySkeleton />
        <CategorySkeleton />
      </div>
    </div>
  );
}
