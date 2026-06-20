"use client";

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { commentsQueryKey } from "./useOrderComments";
import {
  sendOrderComment, updateOrderComment, deleteOrderComment,
} from "../_services/comments.service";
import type { OrderCommentDTO, CommentEditState } from "../_types";

export function useCommentActions(orderId: string) {
  const queryClient = useQueryClient();
  const [isSending, setIsSending] = useState(false);
  const [editState, setEditState] = useState<CommentEditState>(null);

  const handleSend = useCallback(
    async (content: string, attachmentIds: string[] = []) => {
      setIsSending(true);
      try {
        const r = await sendOrderComment({ order_id: orderId, content, attachment_ids: attachmentIds });
        if (r.ok && r.data) {
          const newComment = r.data;
          queryClient.setQueryData<OrderCommentDTO[]>(
            commentsQueryKey(orderId),
            (prev) => (prev ? [...prev, newComment] : [newComment]),
          );
        }
      } finally {
        setIsSending(false);
      }
    },
    [orderId, queryClient],
  );

  const handleEdit = useCallback(
    async (commentId: string, content: string) => {
      const r = await updateOrderComment(orderId, commentId, content);
      if (r.ok && r.data) {
        const updated = r.data;
        queryClient.setQueryData<OrderCommentDTO[]>(
          commentsQueryKey(orderId),
          (prev) => prev?.map((c) => (c.id === commentId ? updated : c)) ?? [],
        );
        setEditState(null);
      }
    },
    [orderId, queryClient],
  );

  const handleDelete = useCallback(
    async (commentId: string) => {
      await deleteOrderComment(orderId, commentId);
      queryClient.setQueryData<OrderCommentDTO[]>(
        commentsQueryKey(orderId),
        (prev) => prev?.filter((c) => c.id !== commentId) ?? [],
      );
    },
    [orderId, queryClient],
  );

  const startEdit = useCallback(
    (commentId: string, content: string) => setEditState({ commentId, content }),
    [],
  );

  const cancelEdit = useCallback(() => setEditState(null), []);

  return {
    isSending, editState, handleSend, handleEdit,
    handleDelete, startEdit, cancelEdit,
  };
}
