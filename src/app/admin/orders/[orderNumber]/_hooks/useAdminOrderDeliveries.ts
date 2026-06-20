"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchAdminDeliveries } from "../_services/admin-delivery.service";
import { ADMIN_DELIVERIES_STALE_MS, ADMIN_ORDER_DETAIL_GC_MS } from "../_fallbacks";
import { webSocketService } from "@/lib/services/websocket.service";
import type { AdminDeliveryDTO } from "../_types";

export function adminDeliveriesQueryKey(orderId: string) {
  return ["admin-order-deliveries", orderId] as const;
}

export function useAdminOrderDeliveries(orderId: string) {
  const queryClient = useQueryClient();
  const query = useQuery<AdminDeliveryDTO[], Error>({
    queryKey: adminDeliveriesQueryKey(orderId),
    queryFn: async () => {
      const result = await fetchAdminDeliveries(orderId);
      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to fetch deliveries");
      }
      return result.data ?? [];
    },
    staleTime: ADMIN_DELIVERIES_STALE_MS,
    gcTime: ADMIN_ORDER_DETAIL_GC_MS,
    enabled: !!orderId,
  });

  useEffect(() => {
    if (!orderId) return;
    const socket = webSocketService.connect();

    const handleCreated = (delivery: AdminDeliveryDTO) => {
      queryClient.setQueryData<AdminDeliveryDTO[]>(
        adminDeliveriesQueryKey(orderId),
        (prev) => {
          if (!prev) return [delivery];
          if (prev.some((d) => d.id === delivery.id)) return prev;
          return [...prev, delivery];
        },
      );
    };

    const handleUpdated = (updated: AdminDeliveryDTO) => {
      queryClient.setQueryData<AdminDeliveryDTO[]>(
        adminDeliveriesQueryKey(orderId),
        (prev) => prev?.map((d) => (d.id === updated.id ? updated : d)) ?? [],
      );
    };

    const handleDeleted = (payload: { id: string }) => {
      queryClient.setQueryData<AdminDeliveryDTO[]>(
        adminDeliveriesQueryKey(orderId),
        (prev) => prev?.filter((d) => d.id !== payload.id) ?? [],
      );
    };

    socket.on("order:delivery:created", handleCreated);
    socket.on("order:delivery:updated", handleUpdated);
    socket.on("order:delivery:deleted", handleDeleted);

    return () => {
      socket.off("order:delivery:created", handleCreated);
      socket.off("order:delivery:updated", handleUpdated);
      socket.off("order:delivery:deleted", handleDeleted);
    };
  }, [orderId, queryClient]);

  return query;
}
