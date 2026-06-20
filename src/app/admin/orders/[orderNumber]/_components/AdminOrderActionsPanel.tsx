"use client";

import type { AdminOrderActionsPanelProps } from "../_props";
import { AdminRevisionRequestPanel } from "./AdminRevisionRequestPanel";
import { AdminDeadlineExtensionPanel } from "./AdminDeadlineExtensionPanel";

export function AdminOrderActionsPanel({ order }: AdminOrderActionsPanelProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminDeadlineExtensionPanel orderId={order.id} orderNumber={order.order_number} />
        <AdminRevisionRequestPanel orderId={order.id} />
      </div>
    </div>
  );
}
