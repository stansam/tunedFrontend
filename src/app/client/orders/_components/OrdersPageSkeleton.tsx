import { Skeleton } from "@/components/ui/skeleton";
import { OrderListSkeleton } from "./OrderListSkeleton";

export function OrdersPageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-44 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>
      <div className="flex items-center gap-4 border-b border-slate-200 pb-0">
        {["Active", "Pending", "Completed", "Overdue"].map((t) => (
          <Skeleton key={t} className="mb-1 h-5 w-16 rounded" />
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-8 w-36 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-full rounded-lg sm:max-w-xs" />
      </div>
      <OrderListSkeleton />
    </div>
  );
}
