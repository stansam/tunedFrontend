"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { commentsQueryKey } from "./useOrderComments";
import type { OrderCommentDTO } from "../_types";

const JOIN_EVENT = "join:order";
const LEAVE_EVENT = "leave:order";
const MESSAGE_EVENT = "order:comment";
const MESSAGE_UPDATED_EVENT = "order:comment:updated";
const MESSAGE_DELETED_EVENT = "order:comment:deleted";

export function useCommentSocket(orderId: string): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!orderId) return;

    const socket = webSocketService.connect();
    socket.emit(JOIN_EVENT, { orderId });

    if (process.env.NODE_ENV !== "production") {
      console.debug(`[CommentSocket] Joined room for order: ${orderId}`);
    }

    const handleComment = (comment: OrderCommentDTO) => {
      if (process.env.NODE_ENV !== "production") {
        console.debug("[CommentSocket] New comment received:", comment.id);
      }
      queryClient.setQueryData<OrderCommentDTO[]>(
        commentsQueryKey(orderId),
        (prev) => {
          if (!prev) return [comment];
          if (prev.some((c) => c.id === comment.id)) return prev;
          return [...prev, comment];
        },
      );
    };

    const handleUpdated = (updated: OrderCommentDTO) => {
      queryClient.setQueryData<OrderCommentDTO[]>(
        commentsQueryKey(orderId),
        (prev) => prev?.map((c) => (c.id === updated.id ? updated : c)) ?? [],
      );
    };

    const handleDeleted = (payload: { comment_id: string }) => {
      queryClient.setQueryData<OrderCommentDTO[]>(
        commentsQueryKey(orderId),
        (prev) => prev?.filter((c) => c.id !== payload.comment_id) ?? [],
      );
    };

    socket.on(MESSAGE_EVENT, handleComment);
    socket.on(MESSAGE_UPDATED_EVENT, handleUpdated);
    socket.on(MESSAGE_DELETED_EVENT, handleDeleted);

    return () => {
      socket.off(MESSAGE_EVENT, handleComment);
      socket.off(MESSAGE_UPDATED_EVENT, handleUpdated);
      socket.off(MESSAGE_DELETED_EVENT, handleDeleted);
      socket.emit(LEAVE_EVENT, { orderId });
      if (process.env.NODE_ENV !== "production") {
        console.debug(`[CommentSocket] Left room for order: ${orderId}`);
      }
    };
  }, [orderId, queryClient]);
}
