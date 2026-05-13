import { Skeleton } from "@/components/ui/skeleton";

function MessageRowSkeleton() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 shrink-0" />
      <Skeleton className="h-8 w-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-44 rounded" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-36 rounded" />
      </div>

      <Skeleton className="h-24 w-full rounded-xl" />

      <div className="flex gap-1 border-b border-slate-200 pt-1">
        {["Details", "Activity", "Delivery"].map((t) => (
          <Skeleton key={t} className="mb-1 h-5 w-16 rounded" />
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <div className="min-w-0 flex-1 flex flex-col gap-4">
          <div className="rounded-xl bg-white p-5 shadow-sm space-y-3">
            <Skeleton className="h-5 w-28 rounded" />
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-4/6 rounded" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
          <MessageRowSkeleton />
          <MessageRowSkeleton />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>

        <div className="w-full lg:w-72 flex flex-col gap-4">
          <Skeleton className="h-52 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
