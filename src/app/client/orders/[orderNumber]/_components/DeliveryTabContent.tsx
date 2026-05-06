import { Package } from "lucide-react";

export function DeliveryTabContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
        <Package className="h-7 w-7 text-emerald-400" />
      </div>
      <div>
        <p className="font-semibold text-slate-800">Delivery Coming Soon</p>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Your completed order files and download links will appear here once
          the order is delivered.
        </p>
      </div>
    </div>
  );
}
