"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchAdminDeliveries } from "../_services/admin-delivery.service";
import { ADMIN_DELIVERIES_STALE_MS, ADMIN_ORDER_DETAIL_GC_MS } from "../_fallbacks";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_EMIT, SOCKET_ON } from "@/lib/constants/socket-events";
import { AdminDeliverySchema } from "../_schemas";
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

    socket.emit(SOCKET_EMIT.JOIN_ORDER, { orderId });

    const cleanupReconnect = webSocketService.onReconnect(() => {
      socket.emit(SOCKET_EMIT.JOIN_ORDER, { orderId });
    });

    const handleCreated = (raw: unknown) => {
      const parsed = AdminDeliverySchema.safeParse(raw);
      if (parsed.success) {
        const delivery = parsed.data as unknown as AdminDeliveryDTO;
        queryClient.setQueryData<AdminDeliveryDTO[]>(
          adminDeliveriesQueryKey(orderId),
          (prev) => {
            if (!prev) return [delivery];
            if (prev.some((d) => d.id === delivery.id)) return prev;
            return [...prev, delivery];
          },
        );
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[AdminOrderDeliveries] Invalid order:delivery:created payload:", parsed.error.issues);
      }
    };

    const handleUpdated = (raw: unknown) => {
      const parsed = AdminDeliverySchema.safeParse(raw);
      if (parsed.success) {
        const updated = parsed.data as unknown as AdminDeliveryDTO;
        queryClient.setQueryData<AdminDeliveryDTO[]>(
          adminDeliveriesQueryKey(orderId),
          (prev) => prev?.map((d) => (d.id === updated.id ? updated : d)) ?? [],
        );
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[AdminOrderDeliveries] Invalid order:delivery:updated payload:", parsed.error.issues);
      }
    };

    const handleDeleted = (payload: { id?: string }) => {
      const deliveryId = payload?.id;
      if (deliveryId) {
        queryClient.setQueryData<AdminDeliveryDTO[]>(
          adminDeliveriesQueryKey(orderId),
          (prev) => prev?.filter((d) => d.id !== deliveryId) ?? [],
        );
      }
    };

    socket.on(SOCKET_ON.DELIVERY_CREATED, handleCreated);
    socket.on(SOCKET_ON.DELIVERY_UPDATED, handleUpdated);
    socket.on(SOCKET_ON.DELIVERY_DELETED, handleDeleted);

    return () => {
      socket.off(SOCKET_ON.DELIVERY_CREATED, handleCreated);
      socket.off(SOCKET_ON.DELIVERY_UPDATED, handleUpdated);
      socket.off(SOCKET_ON.DELIVERY_DELETED, handleDeleted);
      socket.emit(SOCKET_EMIT.LEAVE_ORDER, { orderId });
      cleanupReconnect();
    };
  }, [orderId, queryClient]);

  return query;
}
