"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendAdminComment,
  updateAdminComment,
  deleteAdminComment,
} from "../_services/admin-comments.service";
import { adminCommentsQueryKey } from "./useAdminOrderComments";
import type { AdminOrderCommentDTO } from "../_types";

export function useAdminCommentActions(orderId: string) {
  const queryClient = useQueryClient();

  const sendMutation = useMutation<AdminOrderCommentDTO, Error, string>({
    mutationFn: async (content) => {
      const result = await sendAdminComment(orderId, content);
      if (!result.ok) throw new Error(result.error?.message || "Send failed");
      return result.data as AdminOrderCommentDTO;
    },
    onSuccess: (comment) => {
      queryClient.setQueryData<AdminOrderCommentDTO[]>(
        adminCommentsQueryKey(orderId),
        (prev) => {
          if (!prev) return [comment];
          if (prev.some((c) => c.id === comment.id)) return prev;
          return [...prev, comment];
        },
      );
    },
  });

  const updateMutation = useMutation<
    AdminOrderCommentDTO,
    Error,
    { commentId: string; content: string }
  >({
    mutationFn: async ({ commentId, content }) => {
      const result = await updateAdminComment(orderId, commentId, content);
      if (!result.ok) throw new Error(result.error?.message || "Update failed");
      return result.data as AdminOrderCommentDTO;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<AdminOrderCommentDTO[]>(
        adminCommentsQueryKey(orderId),
        (prev) => prev?.map((c) => (c.id === updated.id ? updated : c)) ?? [],
      );
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (commentId) => {
      const result = await deleteAdminComment(orderId, commentId);
      if (!result.ok) throw new Error(result.error?.message || "Delete failed");
    },
    onSuccess: (_, commentId) => {
      queryClient.setQueryData<AdminOrderCommentDTO[]>(
        adminCommentsQueryKey(orderId),
        (prev) => prev?.filter((c) => c.id !== commentId) ?? [],
      );
    },
  });

  return {
    sendComment: sendMutation.mutateAsync,
    isSending: sendMutation.isPending,
    updateComment: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteComment: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
