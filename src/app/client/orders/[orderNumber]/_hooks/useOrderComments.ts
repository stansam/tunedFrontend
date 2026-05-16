"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchOrderComments,
  sendOrderComment,
  updateOrderComment,
  deleteOrderComment,
} from "../_services/comments.service";
import { COMMENTS_STALE_TIME_MS, ORDER_DETAIL_GC_TIME_MS } from "../_fallback";
import type { OrderCommentDTO, SendCommentDTO } from "../_types";

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

export function useSendComment() {
  return useMutation<OrderCommentDTO, Error, SendCommentDTO>({
    mutationFn: async (dto) => {
      const result = await sendOrderComment(dto);
      if (!result.ok) throw new Error(result.error?.message || "Send failed");
      return result.data as OrderCommentDTO;
    },
  });
}

export function useUpdateComment() {
  return useMutation<
    OrderCommentDTO,
    Error,
    { orderId: string; commentId: string; content: string }
  >({
    mutationFn: async ({ orderId, commentId, content }) => {
      const result = await updateOrderComment(orderId, commentId, content);
      if (!result.ok) throw new Error(result.error?.message || "Update failed");
      return result.data as OrderCommentDTO;
    },
  });
}

export function useDeleteComment() {
  return useMutation<void, Error, { orderId: string; commentId: string }>({
    mutationFn: async ({ orderId, commentId }) => {
      const result = await deleteOrderComment(orderId, commentId);
      if (!result.ok) throw new Error(result.error?.message || "Delete failed");
    },
  });
}
