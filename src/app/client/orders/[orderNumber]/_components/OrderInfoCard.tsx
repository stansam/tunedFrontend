import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_BADGE_CLASSES, STATUS_LABELS, formatDateTime } from "../_utils";
import type { OrderInfoCardProps } from "../_props";

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="shrink-0 text-slate-500">{label}</span>
      <span className="text-right text-slate-800">{value}</span>
    </div>
  );
}

export function OrderInfoCard({ order }: OrderInfoCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <Info className="h-4 w-4 shrink-0 text-slate-400" />
        <h3 className="font-semibold text-slate-800">Order Details</h3>
      </div>

      <div className="flex flex-col gap-2.5">
        <Row
          label="Service:"
          value={
            <span className="max-w-[140px] truncate">
              {order.service_name ?? "—"}
            </span>
          }
        />
        <Row
          label="Status:"
          value={
            <span
              className={cn(
                "inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                STATUS_BADGE_CLASSES[order.status] ??
                  "bg-slate-200 text-slate-600",
              )}
            >
              {STATUS_LABELS[order.status] ?? order.status}
            </span>
          }
        />
      </div>

      <div className="my-3 border-t border-slate-100" />

      <div className="flex flex-col gap-2.5">
        <Row
          label="Date Ordered"
          value={order.created_at ? formatDateTime(order.created_at) : "—"}
        />
        <Row label="Ordered by" value={order.client_username ?? "—"} />
        <Row
          label="Total Price"
          value={
            <span className="font-semibold">
              ${Number(order.total_price).toFixed(2)}
            </span>
          }
        />
        <Row
          label="Order Number"
          value={
            <span className="font-medium text-emerald-600">
              {order.order_number}
            </span>
          }
        />
      </div>
    </div>
  );
}
