"use client";

import { useOrders } from "../_hooks/useOrders";
import { OrderCard } from "./OrderCard";
import { EmptyOrders } from "./EmptyOrders";
import { OrdersPagination } from "./OrdersPagination";
import OrdersError from "../error";
import type { OrderListProps } from "../_props";

export function OrderList({ filters, onPageChange, onClearFilters }: OrderListProps) {
  const { data, error } = useOrders(filters);

  if (error) {
    return <OrdersError
      error={error}
      reset={() => { }}
    />;
  }

  const orders = data?.orders || [];
  const hasFilters = !!filters.q || filters.status !== "all";

  if (!orders.length) {
    return (
      <EmptyOrders
        hasFilters={hasFilters}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Order cards */}
      <div
        className="flex flex-col gap-3"
        role="list"
        aria-label={`Orders list — ${data?.total ?? 0} total`}
      >
        {orders.map((order) => (
          <div key={order.id} role="listitem">
            <OrderCard order={order} />
          </div>
        ))}
      </div>

      <OrdersPagination
        page={data?.page ?? 1}
        total={data?.total ?? 0}
        perPage={data?.per_page ?? 10}
        onPageChange={onPageChange}
      />
    </div>
  );
}
