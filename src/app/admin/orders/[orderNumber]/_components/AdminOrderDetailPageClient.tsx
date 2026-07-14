"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminOrderDetail, adminOrderDetailQueryKey } from "../_hooks/useAdminOrderDetail";
import { activateOrder, escalateOrder } from "../_services/admin-actions.service";
import { AdminOrderDetailHeader } from "./AdminOrderDetailHeader";
import { AdminOrderSummaryCard } from "./AdminOrderSummaryCard";
import { AdminOrderDetailTabs } from "./AdminOrderDetailTabs";
import { AdminDetailsTabContent } from "./AdminDetailsTabContent";
import { AdminActivityTabContent } from "./AdminActivityTabContent";
import { AdminDeliveryTabContent } from "./AdminDeliveryTabContent";
import { AdminOrderActionsPanel } from "./AdminOrderActionsPanel";
import { AdminOrderDetailSidebar } from "./AdminOrderDetailSidebar";
import type { AdminOrderTab } from "../_types";

export function AdminOrderDetailPageClient({ orderNumber }: { orderNumber: string }) {
  const queryClient = useQueryClient();
  const { data: order, error } = useAdminOrderDetail(orderNumber);
  const [activeTab, setActiveTab] = useState<AdminOrderTab>("details");

  const activateMutation = useMutation({
    mutationFn: activateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminOrderDetailQueryKey(orderNumber) });
    },
  });

  const escalateMutation = useMutation({
    mutationFn: escalateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminOrderDetailQueryKey(orderNumber) });
    },
  });

  if (error) throw error;
  if (!order) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <AdminOrderDetailHeader
        order={order}
        onActivate={() => activateMutation.mutate(order.id)}
        onEscalate={() => escalateMutation.mutate(order.id)}
        isActivating={activateMutation.isPending}
        isEscalating={escalateMutation.isPending}
      />

      <AdminOrderSummaryCard order={order} />

      <AdminOrderDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8">
        <div className="space-y-6 min-w-0">
          {activeTab === "details" && <AdminDetailsTabContent order={order} />}
          {activeTab === "activity" && <AdminActivityTabContent orderId={order.id} />}
          {activeTab === "delivery" && <AdminDeliveryTabContent order={order} />}
          {activeTab === "actions" && <AdminOrderActionsPanel order={order} onSuccess={() => {}} />}
        </div>
        <div className="self-start">
          <AdminOrderDetailSidebar order={order} />
        </div>
      </div>
    </div>
  );
}
