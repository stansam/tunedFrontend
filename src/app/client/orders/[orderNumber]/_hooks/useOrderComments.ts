"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOrderComments } from "../_services/comments.service";
import { COMMENTS_STALE_TIME_MS, ORDER_DETAIL_GC_TIME_MS } from "../_fallback";
import type { OrderCommentDTO } from "../_types";

export function commentsQueryKey(orderId: string) {
  return ["order-comments", orderId] as const;
}

export function useOrderComments(orderId: string) {
  return useQuery<OrderCommentDTO[], Error>({
    queryKey: commentsQueryKey(orderId),
    queryFn: async () => {
      const result = await fetchOrderComments(orderId);
      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to fetch comments");
      }
      return result.data ?? [];
    },
    staleTime: COMMENTS_STALE_TIME_MS,
    gcTime: ORDER_DETAIL_GC_TIME_MS,
    refetchOnWindowFocus: false,
    enabled: !!orderId,
  });
}
