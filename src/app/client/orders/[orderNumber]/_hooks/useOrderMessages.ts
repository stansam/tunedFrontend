"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOrderMessages } from "../_services/messages.service";
import { MESSAGES_STALE_TIME_MS, ORDER_DETAIL_GC_TIME_MS } from "../_fallback";
import type { OrderMessageDTO } from "../_types";

export function messagesQueryKey(orderId: string) {
  return ["order-messages", orderId] as const;
}

export function useOrderMessages(orderId: string) {
  return useQuery<OrderMessageDTO[], Error>({
    queryKey: messagesQueryKey(orderId),
    queryFn: async () => {
      const result = await fetchOrderMessages(orderId);
      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to fetch messages");
      }
      return result.data ?? [];
    },
    staleTime: MESSAGES_STALE_TIME_MS,
    gcTime: ORDER_DETAIL_GC_TIME_MS,
    refetchOnWindowFocus: false,
    enabled: !!orderId,
  });
}
