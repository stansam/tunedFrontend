"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminOrderDetail } from "../_services/admin-order.service";
import {
  ADMIN_ORDER_DETAIL_STALE_MS,
  ADMIN_ORDER_DETAIL_GC_MS,
} from "../_fallbacks";
import type { AdminOrderDetailDTO } from "../_types";

export function adminOrderDetailQueryKey(orderNumber: string) {
  return ["admin-order-detail", orderNumber] as const;
}

export function useAdminOrderDetail(orderNumber: string) {
  return useQuery<AdminOrderDetailDTO, Error>({
    queryKey: adminOrderDetailQueryKey(orderNumber),
    queryFn: async () => {
      const result = await fetchAdminOrderDetail(orderNumber);
      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to load order details");
      }
      return result.data;
    },
    staleTime: ADMIN_ORDER_DETAIL_STALE_MS,
    gcTime: ADMIN_ORDER_DETAIL_GC_MS,
  });
}
