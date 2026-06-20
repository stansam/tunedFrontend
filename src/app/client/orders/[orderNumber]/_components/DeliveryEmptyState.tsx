import { PackageOpen } from "lucide-react";

export function DeliveryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white py-14 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <PackageOpen className="h-7 w-7 text-slate-400" />
      </div>
      <div>
        <p className="font-semibold text-slate-800">No Deliveries Yet</p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Your order hasn&apos;t been delivered yet. You&apos;ll be notified
          here once the delivery is ready for your review.
        </p>
      </div>
    </div>
  );
}
