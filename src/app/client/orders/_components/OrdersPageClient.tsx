"use client";

import { Suspense } from "react";
import { useOrderFilters } from "../_hooks/useOrderFilters";
import { OrdersHeader } from "./OrdersHeader";
import { OrderStatusTabs } from "./OrderStatusTabs";
import { OrdersToolbar } from "./OrdersToolbar";
import { OrderList } from "./OrderList";
import { OrderListSkeleton } from "./OrderListSkeleton";

function OrdersContent() {
  const {
    filters,
    setStatus,
    setSearch,
    setSort,
    setPage,
    clearFilters,
    isPending,
  } = useOrderFilters();

  return (
    <div className="flex w-full flex-col gap-5 px-4 lg:px-6">
      <OrdersHeader filters={filters} />

      <OrderStatusTabs
        activeTab={filters.status}
        onTabChange={setStatus}
        isPending={isPending}
      />

      <OrdersToolbar
        searchValue={filters.q}
        onSearchChange={setSearch}
        sortValue={filters.sort}
        sortOrder={filters.sortOrder}
        onSortChange={setSort}
        isPending={isPending}
      />

      <Suspense fallback={<OrderListSkeleton />}>
        <OrderList
          filters={filters}
          onPageChange={setPage}
          onClearFilters={clearFilters}
        />
      </Suspense>
    </div>
  );
}

export function OrdersPageClient() {
  return <OrdersContent />;
}
