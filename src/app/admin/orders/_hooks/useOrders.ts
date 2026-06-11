"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminOrders, fetchAdminOrdersStats } from "../_services/orders.service";
import { FALLBACK_ORDERS, FALLBACK_STATS } from "../_fallbacks/orders.fallback";
import type { AdminOrderFiltersState, AdminOrdersListResponse, AdminOrdersStatsResponse } from "../_types/orders.types";

export function useOrders(filters: AdminOrderFiltersState) {
  return useQuery<AdminOrdersListResponse, Error>({
    queryKey: ["admin-orders", filters],
    queryFn: async () => {
      const result = await fetchAdminOrders(filters);
      if (!result.ok) {
        console.warn("[useOrders] Backend error, utilizing fallback data:", result.error?.message);
        return FALLBACK_ORDERS;
      }
      return result.data;
    },
    staleTime: 10_000,
    gcTime: 5 * 60_000,
  });
}

export function useOrdersStats() {
  return useQuery<AdminOrdersStatsResponse, Error>({
    queryKey: ["admin-orders-stats"],
    queryFn: async () => {
      const result = await fetchAdminOrdersStats();
      if (!result.ok) {
        console.warn("[useOrdersStats] Backend error, utilizing fallback data:", result.error?.message);
        return FALLBACK_STATS;
      }
      return result.data;
    },
    staleTime: 15_000,
    gcTime: 5 * 60_000,
  });
}
