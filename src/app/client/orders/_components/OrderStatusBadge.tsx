import { cn } from "@/lib/utils";
import { STATUS_LABELS, STATUS_BADGE_CLASSES } from "../_utils";
import type { OrderStatusBadgeProps } from "../_props";

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase",
        STATUS_BADGE_CLASSES[status] ?? "bg-slate-200 text-slate-600",
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
