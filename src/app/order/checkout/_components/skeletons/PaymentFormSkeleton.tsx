import { Skeleton } from "@/components/ui/skeleton";

export function PaymentFormSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-11 w-full rounded-lg" />
      </div>

      <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}
