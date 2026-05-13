"use client";

import { useOrders } from "../_hooks/useOrders";
import { OrderCard } from "./OrderCard";
import { EmptyOrders } from "./EmptyOrders";
import { OrdersPagination } from "./OrdersPagination";
import type { OrderListProps } from "../_props";
import OrdersLoading from "../loading";
import OrdersError from "../error";

export function OrderList({ filters, onPageChange, onClearFilters }: OrderListProps) {
  const { data, error, isLoading, isError, refetch } = useOrders(filters);

  if (isLoading) {
    return <OrdersLoading />;
  }

  if (isError) {
    return <OrdersError error={error} reset={refetch} />;
  }

  
  if (!data) {
    return null;
  }
  
  const orders = data.orders;
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
      <div
        className="flex flex-col gap-3"
        role="list"
        aria-label={`Orders list — ${data.total} total`}
      >
        {orders.map((order) => (
          <div key={order.id} role="listitem">
            <OrderCard order={order} />
          </div>
        ))}
      </div>

      <OrdersPagination
        page={data.page}
        total={data.total}
        perPage={data.per_page}
        onPageChange={onPageChange}
      />
    </div>
  );
}
