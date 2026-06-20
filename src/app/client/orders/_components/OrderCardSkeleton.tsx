import { Skeleton } from "@/components/ui/skeleton";

export function OrderCardSkeleton() {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white px-4 py-4 shadow-sm md:px-5">
      <Skeleton className="mt-[5px] h-2.5 w-2.5 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2.5">
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
      </div>
      <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
    </div>
  );
}
