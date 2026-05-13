import { cn } from "@/lib/utils";
import { OrderCountdownTimer } from "./OrderCountdownTimer";
import { STATUS_BADGE_CLASSES, STATUS_LABELS, STATUS_DOT_CLASSES } from "../_utils";
import type { OrderSummaryCardProps } from "../_props";

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span
              aria-hidden
              className={cn(
                "h-2.5 w-2.5 shrink-0 rounded-full",
                STATUS_DOT_CLASSES[order.status] ?? "bg-slate-300",
              )}
            />
            <h2 className="truncate text-sm font-bold text-slate-900 md:text-base">
              {order.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pl-[18px]">
            <span
              className={cn(
                "inline-flex rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                STATUS_BADGE_CLASSES[order.status] ?? "bg-slate-200 text-slate-600",
              )}
            >
              {STATUS_LABELS[order.status]}
            </span>
            <span className="text-xs text-slate-300">|</span>
            <span className="text-xs text-slate-500">
              {Math.round(order.page_count as unknown as number)} Pages
            </span>
            <span className="text-xs text-slate-300">|</span>
            <span className="text-xs text-slate-500">
              {order.service_name ?? order.format_style.toUpperCase()}
            </span>
            <span className="text-xs text-slate-300">|</span>
            <span className="text-xs font-medium text-slate-600">Due Date</span>
          </div>
        </div>

        <div className="shrink-0">
          <OrderCountdownTimer dueDate={order.due_date} />
        </div>
      </div>
    </div>
  );
}
