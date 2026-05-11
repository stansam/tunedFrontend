"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetail } from "../_services/order-detail.service";
import {
  ORDER_DETAIL_STALE_TIME_MS,
  ORDER_DETAIL_GC_TIME_MS,
} from "../_fallback";
import type { OrderDetailResponseDTO } from "../_types";

export function orderDetailQueryKey(orderNumber: string) {
  return ["client-order-detail", orderNumber] as const;
}

export function useOrderDetail(orderNumber: string) {
  return useQuery<OrderDetailResponseDTO, Error>({
    queryKey: orderDetailQueryKey(orderNumber),
    queryFn: async () => {
      const result = await fetchOrderDetail(orderNumber);
      if (!result.ok) {
        throw new Error(
          result.error?.message ?? "Failed to load order details",
        );
      }
      return result.data;
    },
    staleTime: ORDER_DETAIL_STALE_TIME_MS,
    gcTime: ORDER_DETAIL_GC_TIME_MS,
  });
}
