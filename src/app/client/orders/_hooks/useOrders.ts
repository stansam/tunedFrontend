"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchClientOrders } from "../_services/orders.service";
import { DEFAULT_PER_PAGE } from "../_fallback";
import type { OrderFiltersState, OrderListResponseDTO, StatusTab } from "../_types";

function tabToStatus(tab: StatusTab): string | null {
  return tab === "all" ? null : tab;
}

export function ordersQueryKey(filters: OrderFiltersState) {
  return [
    "client-orders",
    filters.status,
    filters.q,
    filters.sort,
    filters.sortOrder,
    filters.page,
  ] as const;
}

export function useOrders(filters: OrderFiltersState) {
  return useQuery<OrderListResponseDTO, Error>({
    queryKey: ordersQueryKey(filters),
    queryFn: async () => {
      const result = await fetchClientOrders({
        status: tabToStatus(filters.status),
        q: filters.q || null,
        sort: filters.sort,
        order: filters.sortOrder,
        page: filters.page,
        per_page: DEFAULT_PER_PAGE,
      });

      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to fetch orders");
      }

      return result.data;
    },
    // staleTime: 0,
    // gcTime: 0,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
