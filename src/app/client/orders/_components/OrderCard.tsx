import { cn } from "@/lib/utils";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderContextMenu } from "./OrderContextMenu";
import { STATUS_DOT_CLASSES, formatPageCount } from "../_utils";
import type { OrderCardProps } from "../_props";

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white px-4 py-4 shadow-sm transition-shadow hover:shadow-md md:px-5">
      <span
        aria-hidden="true"
        className={cn(
          "mt-[5px] h-2.5 w-2.5 shrink-0 rounded-full",
          STATUS_DOT_CLASSES[order.status] ?? "bg-slate-300",
        )}
      />

      <div className="min-w-0 flex-1">
        <p
          className="truncate text-sm font-semibold text-slate-900 md:text-base"
          title={order.title}
        >
          {order.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-xs font-medium text-emerald-600">
            {order.order_number}
          </span>
          <span className="text-xs text-slate-300" aria-hidden>|</span>
          <span className="text-xs text-slate-500">
            {formatPageCount(Number(order.page_count))}
          </span>
          <span className="text-xs text-slate-300" aria-hidden>|</span>
          <span className="text-xs text-slate-500 uppercase">
            {order.format_style}
          </span>
          <span className="text-xs text-slate-300" aria-hidden>|</span>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <OrderContextMenu order={order} />
    </div>
  );
}
