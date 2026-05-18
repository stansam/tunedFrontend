import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeliveryStatusBadgeProps } from "../_props";
import type { DeliveryStatus } from "../_types";

const CONFIG: Record<
  DeliveryStatus,
  { label: string; className: string; icon?: boolean }
> = {
  delivered: {
    label: "Delivered",
    className: "bg-slate-100 text-slate-700 border border-slate-200",
    icon: true,
  },
  revised: {
    label: "Revised",
    className: "bg-blue-500 text-white",
    icon: true,
  },
  redelivered: {
    label: "Redelivered",
    className: "bg-amber-500 text-white",
    icon: true,
  },
};

export function DeliveryStatusBadge({ status, statusColor }: DeliveryStatusBadgeProps) {
  const { label, icon } = CONFIG[status] || { label: status, icon: false };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold text-white",
      )}
      style={{ backgroundColor: statusColor || "#64748b" }}
    >
      {icon && <CheckCircle2 className="h-4 w-4" />}
      {label}
    </span>
  );
}
