"use client";

import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeliveryActions } from "../_hooks/useDeliveryActions";
import type { DeliveryActionsProps } from "../_props";

const COMPLETED_STATUSES = new Set(["completed", "revision"]);

function ActionedMessage({ orderStatus }: { orderStatus: string }) {
  const isApproved = orderStatus === "completed";
  return (
    <p className="text-sm font-medium text-slate-500">
      {isApproved
        ? "✓ You have approved this delivery."
        : "↩ You have requested a revision for this delivery."}
    </p>
  );
}

export function DeliveryActions({ delivery, orderId, orderStatus }: DeliveryActionsProps) {
  const { approve, requestRevision, isLoading } = useDeliveryActions(
    orderId,
    delivery.id,
  );

  if (COMPLETED_STATUSES.has(orderStatus)) {
    return <ActionedMessage orderStatus={orderStatus} />;
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        onClick={() => void approve()}
        disabled={isLoading}
        className="gap-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60"
      >
        <Check className="h-4 w-4" />
        Approve Delivery
      </Button>

      <Button
        variant="outline"
        onClick={() => void requestRevision()}
        disabled={isLoading}
        className="gap-2 rounded-full border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 disabled:opacity-60"
      >
        <RotateCcw className="h-4 w-4" />
        Request Revision
      </Button>
    </div>
  );
}
