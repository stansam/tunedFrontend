"use client";

import { useState } from "react";
import { useOrderFilters } from "../_hooks/useOrderFilters";
import { useOrders, useOrdersStats } from "../_hooks/useOrders";
import { useOrderActions } from "../_hooks/useOrderActions";
import { OrdersStats } from "./OrdersStats";
import { BottleneckSection } from "./BottleneckSection";
import { WriterLoadSection } from "./WriterLoadSection";
import { OrdersToolbar } from "./OrdersToolbar";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";
import { AssignWriterModal } from "./AssignWriterModal";
import { OrdersPageSkeleton } from "./OrdersPageSkeleton";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export function OrdersPageClient() {
  const { filters, setStatus, setSearch, setSort, setPage, setService } = useOrderFilters();
  const { data: listData, isLoading: isListLoading } = useOrders(filters);
  const { data: statsData, isLoading: isStatsLoading } = useOrdersStats();
  const { assignWriter, escalateOrder } = useOrderActions();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  if (isListLoading || isStatsLoading || !listData || !statsData) {
    return <OrdersPageSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Orders Intelligence</h2>
          <p className="text-xs text-slate-500">All orders across your platform with deep insights</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="h-9 gap-1 rounded-xl bg-white/40 border-white/50 hover:bg-white/60"><Download className="size-4" /> Export</Button>
          <Button size="sm" className="h-9 gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"><Plus className="size-4" /> Create Order</Button>
        </div>
      </div>

      <OrdersStats stats={statsData.stats} activeTab={filters.status} onTabChange={setStatus} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <BottleneckSection bottlenecks={statsData.bottlenecks} />
        <WriterLoadSection writerLoad={statsData.writer_load} />
      </div>

      <OrdersToolbar
        searchValue={filters.q}
        onSearchChange={setSearch}
        serviceValue={filters.service_id}
        onServiceChange={setService}
        sortValue={filters.sort}
        sortOrder={filters.sortOrder}
        onSortChange={setSort}
      />

      <OrdersTable orders={listData.orders} onAssign={setSelectedOrderId} onEscalate={escalateOrder} />
      <OrdersPagination total={listData.total} page={filters.page} perPage={10} onPageChange={setPage} />

      <AssignWriterModal
        orderId={selectedOrderId}
        writers={statsData.writer_load}
        onClose={() => setSelectedOrderId(null)}
        onAssignConfirm={(writerId) => assignWriter({ orderId: selectedOrderId!, writerId })}
      />
    </div>
  );
}
