"use client";

import type { AdminDeliveryTabContentProps } from "../_props";
import { useAdminOrderDeliveries } from "../_hooks/useAdminOrderDeliveries";
import { AdminSubmitDeliveryPanel } from "./AdminSubmitDeliveryPanel";
import { AdminDeliveryCard } from "./AdminDeliveryCard";
import { AdminDeliveryTabSkeleton } from "./AdminDeliveryTabSkeleton";

export function AdminDeliveryTabContent({ order }: AdminDeliveryTabContentProps) {
  const { data: deliveries = [], isLoading, refetch } = useAdminOrderDeliveries(order.id);

  if (isLoading) return <AdminDeliveryTabSkeleton />;

  return (
    <div className="space-y-6">
      <AdminSubmitDeliveryPanel orderId={order.id} onSuccess={refetch} />

      <div className="space-y-4">
        {deliveries.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-slate-400">
            <p className="text-sm">No deliveries submitted yet.</p>
          </div>
        ) : (
          deliveries.map((delivery) => (
            <AdminDeliveryCard
              key={delivery.id}
              delivery={delivery}
              orderId={order.id}
              orderStatus={order.status}
            />
          ))
        )}
      </div>
    </div>
  );
}
