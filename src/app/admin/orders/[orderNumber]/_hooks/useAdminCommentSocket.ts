"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { adminCommentsQueryKey } from "./useAdminOrderComments";
import type { AdminOrderCommentDTO } from "../_types";

const JOIN_EVENT = "join:order";
const LEAVE_EVENT = "leave:order";
const MESSAGE_EVENT = "order:comment";
const MESSAGE_UPDATED_EVENT = "order:comment:updated";
const MESSAGE_DELETED_EVENT = "order:comment:deleted";

export function useAdminCommentSocket(orderId: string): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!orderId) return;

    const socket = webSocketService.connect();
    socket.emit(JOIN_EVENT, { orderId });

    if (process.env.NODE_ENV !== "production") {
      console.debug(`[AdminCommentSocket] Joined room for order: ${orderId}`);
    }

    const handleComment = (comment: AdminOrderCommentDTO) => {
      queryClient.setQueryData<AdminOrderCommentDTO[]>(
        adminCommentsQueryKey(orderId),
        (prev) => {
          if (!prev) return [comment];
          if (prev.some((c) => c.id === comment.id)) return prev;
          return [...prev, comment];
        },
      );
    };

    const handleUpdated = (updated: AdminOrderCommentDTO) => {
      queryClient.setQueryData<AdminOrderCommentDTO[]>(
        adminCommentsQueryKey(orderId),
        (prev) => prev?.map((c) => (c.id === updated.id ? updated : c)) ?? [],
      );
    };

    const handleDeleted = (payload: { comment_id: string }) => {
      queryClient.setQueryData<AdminOrderCommentDTO[]>(
        adminCommentsQueryKey(orderId),
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
    };
  }, [orderId, queryClient]);
}
