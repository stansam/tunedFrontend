"use client";

import { useOrderDeliveries } from "../_hooks/useOrderDeliveries";
import { DeliveryCard } from "./DeliveryCard";
import { DeliveryTabSkeleton } from "./DeliveryTabSkeleton";
import { DeliveryEmptyState } from "./DeliveryEmptyState";
import { CreateSimilarOrderCard } from "./CreateSimilarOrderCard";
import type { DeliveryTabContentProps } from "../_props";

export function DeliveryTabContent({ order }: DeliveryTabContentProps) {
  const {
    data: deliveries = [],
    isLoading,
    isError,
  } = useOrderDeliveries(order.id);

  if (isLoading) return <DeliveryTabSkeleton />;

  if (isError) {
    return (
      <div className="rounded-xl bg-white px-6 py-10 text-center shadow-sm">
        <p className="font-semibold text-slate-700">
          Unable to load deliveries
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Please refresh the page or try again shortly.
        </p>
      </div>
    );
  }

  if (!deliveries.length) {
    return (
      <div className="flex flex-col gap-4">
        <DeliveryEmptyState />
        <CreateSimilarOrderCard orderNumber={order.order_number} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {deliveries.map((delivery) => (
        <div
          key={delivery.id}
          className="rounded-xl bg-white p-5 shadow-sm sm:p-6"
        >
          <DeliveryCard delivery={delivery} orderId={order.id} orderStatus={order.status} />
        </div>
      ))}
      <CreateSimilarOrderCard orderNumber={order.order_number} />
    </div>
  );
}
