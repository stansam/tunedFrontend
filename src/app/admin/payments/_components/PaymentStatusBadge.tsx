"use client";

import { Badge } from "@/components/ui/badge";
import type { PaymentStatusBadgeProps } from "../_props/payments.props";
import type { PaymentStatus } from "../_types/payments.types";

const statusConfig: Record<
  PaymentStatus,
  { readonly label: string; readonly className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
  },
  pending_verification: {
    label: "Under Verification",
    className: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  },
  failed: {
    label: "Failed",
    className: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
  },
  refunded: {
    label: "Refunded",
    className: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide shadow-2xs ${config.className}`}
    >
      {config.label}
    </Badge>
  );
}
