"use client";

import { Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ordersQueryKey } from "../_hooks/useOrders";
import type { OrdersHeaderProps } from "../_props";

export function OrdersHeader({ filters }: OrdersHeaderProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    void queryClient.invalidateQueries({ queryKey: ordersQueryKey(filters) });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
        My Orders
      </h1>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="gap-1.5 bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800"
          onClick={() => router.push("/order" as never)}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Order</span>
          <span className="sm:hidden">New</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 text-slate-500 hover:text-emerald-600"
          onClick={handleRefresh}
          aria-label="Refresh orders list"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
