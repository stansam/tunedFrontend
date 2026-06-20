"use client";

import type { AdminOrderDetailSidebarProps } from "../_props";
import { AdminOrderInfoCard } from "./AdminOrderInfoCard";
import { AdminOrderTrackingStepper } from "./AdminOrderTrackingStepper";

export function AdminOrderDetailSidebar({ order }: AdminOrderDetailSidebarProps) {
  return (
    <div className="space-y-6">
      <AdminOrderInfoCard order={order} />
      <AdminOrderTrackingStepper status={order.status} />
    </div>
  );
}
