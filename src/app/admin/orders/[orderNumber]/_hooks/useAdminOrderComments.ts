"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminOrderComments } from "../_services/admin-comments.service";
import { ADMIN_COMMENTS_STALE_MS, ADMIN_ORDER_DETAIL_GC_MS } from "../_fallbacks";
import type { AdminOrderCommentDTO } from "../_types";

export function adminCommentsQueryKey(orderId: string) {
  return ["admin-order-comments", orderId] as const;
}

export function useAdminOrderComments(orderId: string) {
  return useQuery<AdminOrderCommentDTO[], Error>({
    queryKey: adminCommentsQueryKey(orderId),
    queryFn: async () => {
      const result = await fetchAdminOrderComments(orderId);
      if (!result.ok) {
        throw new Error(result.error?.message ?? "Failed to fetch comments");
      }
      return result.data ?? [];
    },
    staleTime: ADMIN_COMMENTS_STALE_MS,
    gcTime: ADMIN_ORDER_DETAIL_GC_MS,
    refetchOnWindowFocus: false,
    enabled: !!orderId,
  });
}
