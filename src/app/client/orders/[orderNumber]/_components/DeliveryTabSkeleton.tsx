import { Skeleton } from "@/components/ui/skeleton";

function AttachmentSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
      <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  );
}

export function DeliveryTabSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-4 w-44 rounded" />
        </div>
        <Skeleton className="h-9 w-36 rounded-full" />
      </div>

      {/* Message card */}
      <div className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
      </div>

      {/* Attachments */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24 rounded" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AttachmentSkeleton />
          <AttachmentSkeleton />
          <AttachmentSkeleton />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 border-t border-slate-100 pt-4">
        <Skeleton className="h-10 w-40 rounded-full" />
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>
    </div>
  );
}
