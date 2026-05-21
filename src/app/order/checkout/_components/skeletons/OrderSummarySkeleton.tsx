import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function OrderSummarySkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
      <Skeleton className="h-6 w-36" />

      <div className="space-y-1">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-6 w-36" />
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
        <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3.5 w-40" />
        </div>
      </div>

      <Separator />

      <div className="space-y-2.5">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      <Separator />

      <div className="flex justify-between">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-20" />
      </div>

      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}
