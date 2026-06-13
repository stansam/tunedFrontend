"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminOrders, fetchAdminOrdersStats } from "../_services/orders.service";
import { FALLBACK_ORDERS, FALLBACK_STATS } from "../_fallbacks/orders.fallback";
import type { AdminOrderFiltersState, AdminOrdersListResponse, AdminOrdersStatsResponse } from "../_types/orders.types";

const isDev = process.env.NODE_ENV === "development";

export function useOrders(filters: AdminOrderFiltersState) {
  return useQuery<AdminOrdersListResponse, Error>({
    queryKey: ["admin-orders", filters],
    queryFn: async () => {
      const result = await fetchAdminOrders(filters);
      if (!result.ok) {
        if (isDev) {
          console.warn("[useOrders] Backend error, utilizing fallback data:", result.error?.message);
          return FALLBACK_ORDERS;
        }
        throw new Error(result.error?.message ?? "Failed to fetch orders");
      }
      return result.data;
    },
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}

export function useOrdersStats() {
  return useQuery<AdminOrdersStatsResponse, Error>({
    queryKey: ["admin-orders-stats"],
    queryFn: async () => {
      const result = await fetchAdminOrdersStats();
      if (!result.ok) {
        if (isDev) {
          console.warn("[useOrdersStats] Backend error, utilizing fallback data:", result.error?.message);
          return FALLBACK_STATS;
        }
        throw new Error(result.error?.message ?? "Failed to fetch stats");
      }
      return result.data;
    },
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}
