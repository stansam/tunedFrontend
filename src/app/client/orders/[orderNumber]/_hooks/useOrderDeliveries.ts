"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOrderDeliveries } from "../_services/delivery.service";
import { ORDER_DETAIL_GC_TIME_MS } from "../_fallback";
import type { OrderDeliveryResponseDTO } from "../_types";

export const DELIVERIES_STALE_TIME_MS = 30_000;

export function deliveriesQueryKey(orderId: string) {
  return ["order-deliveries", orderId] as const;
}

export function useOrderDeliveries(orderId: string) {
  return useQuery<OrderDeliveryResponseDTO[], Error>({
    queryKey: deliveriesQueryKey(orderId),
    queryFn: async () => {
      const result = await fetchOrderDeliveries(orderId);
      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to fetch deliveries");
      }
      return result.data ?? [];
    },
    staleTime: DELIVERIES_STALE_TIME_MS,
    gcTime: ORDER_DETAIL_GC_TIME_MS,
    refetchOnWindowFocus: false,
    enabled: !!orderId,
  });
}
