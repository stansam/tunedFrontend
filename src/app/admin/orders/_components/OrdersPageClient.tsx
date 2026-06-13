"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useOrderFilters } from "../_hooks/useOrderFilters";
import { useOrders, useOrdersStats } from "../_hooks/useOrders";
import { useOrderActions } from "../_hooks/useOrderActions";
import type { Route } from "next";
import { OrdersStats } from "./OrdersStats";
import { BottleneckSection } from "./BottleneckSection";
import { ServiceLoadSection } from "./ServiceLoadSection";
import { OrdersToolbar } from "./OrdersToolbar";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";
import { ActivateOrderModal } from "./ActivateOrderModal";
import { OrdersPageSkeleton } from "./OrdersPageSkeleton";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export function OrdersPageClient() {
  const router = useRouter();
  const { filters, setStatus, setSearch, setSort, setPage, setService } = useOrderFilters();
  const { data: listData, isLoading: isListLoading } = useOrders(filters);
  const { data: statsData, isLoading: isStatsLoading } = useOrdersStats();
  const { activateOrder, isActivating, escalateOrder } = useOrderActions();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleExport = () => {
    if (!listData?.orders || listData.orders.length === 0) {
      toast.error("No orders to export");
      return;
    }
    const headers = ["Order ID", "Client", "Service", "Deadline", "Value", "Status"];
    const csvContent = [
      headers.join(","),
      ...listData.orders.map((o) =>
        [
          o.order_number,
          o.client_name,
          o.service_name,
          o.due_date ? new Date(o.due_date).toLocaleDateString() : "No deadline",
          `$${o.total_price}`,
          o.status
        ].map(val => `"${val}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `orders_export_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Orders exported successfully");
  };

  const handleCreateOrder = () => {
    router.push("/admin/orders/create" as Route);
  };

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
          <Button
            size="sm"
            variant="outline"
            onClick={handleExport}
            className="h-9 gap-1 rounded-xl bg-white/40 border-white/50 hover:bg-white/60"
          >
            <Download className="size-4" /> Export
          </Button>
          <Button
            size="sm"
            onClick={handleCreateOrder}
            className="h-9 gap-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="size-4" /> Create Order
          </Button>
        </div>
      </div>

      <OrdersStats stats={statsData.stats} activeTab={filters.status} onTabChange={setStatus} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <BottleneckSection bottlenecks={statsData.bottlenecks} />
        <ServiceLoadSection serviceLoad={statsData.service_load} />
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

      <OrdersTable
        orders={listData.orders}
        onActivate={setSelectedOrderId}
        onEscalate={escalateOrder}
        isActivating={isActivating}
      />
      <OrdersPagination total={listData.total} page={filters.page} perPage={10} onPageChange={setPage} />

      <ActivateOrderModal
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        onActivateConfirm={() => activateOrder(selectedOrderId!)}
      />
    </div>
  );
}
