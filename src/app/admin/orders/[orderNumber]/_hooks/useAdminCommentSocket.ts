"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_EMIT, SOCKET_ON } from "@/lib/constants/socket-events";
import { adminCommentsQueryKey } from "./useAdminOrderComments";
import { AdminOrderCommentSchema } from "../_schemas";
import type { AdminOrderCommentDTO } from "../_types";

export function useAdminCommentSocket(orderId: string): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!orderId) return;

    const socket = webSocketService.connect();
    socket.emit(SOCKET_EMIT.JOIN_ORDER, { orderId });

    if (process.env.NODE_ENV !== "production") {
      console.debug(`[AdminCommentSocket] Joined room for order: ${orderId}`);
    }

    const cleanupReconnect = webSocketService.onReconnect(() => {
      socket.emit(SOCKET_EMIT.JOIN_ORDER, { orderId });
      if (process.env.NODE_ENV !== "production") {
        console.debug(`[AdminCommentSocket] Rejoined room for order after reconnect: ${orderId}`);
      }
    });

    const handleComment = (raw: unknown) => {
      const parsed = AdminOrderCommentSchema.safeParse(raw);
      if (parsed.success) {
        const comment = parsed.data as AdminOrderCommentDTO;
        queryClient.setQueryData<AdminOrderCommentDTO[]>(
          adminCommentsQueryKey(orderId),
          (prev) => {
            if (!prev) return [comment];
            if (prev.some((c) => c.id === comment.id)) return prev;
            return [...prev, comment];
          },
        );
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[AdminCommentSocket] Invalid order:comment payload:", parsed.error.issues);
      }
    };

    const handleUpdated = (raw: unknown) => {
      const parsed = AdminOrderCommentSchema.safeParse(raw);
      if (parsed.success) {
        const updated = parsed.data as AdminOrderCommentDTO;
        queryClient.setQueryData<AdminOrderCommentDTO[]>(
          adminCommentsQueryKey(orderId),
          (prev) => prev?.map((c) => (c.id === updated.id ? updated : c)) ?? [],
        );
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[AdminCommentSocket] Invalid order:comment:updated payload:", parsed.error.issues);
      }
    };

    const handleDeleted = (payload: { comment_id?: string }) => {
      const commentId = payload?.comment_id;
      if (commentId) {
        queryClient.setQueryData<AdminOrderCommentDTO[]>(
          adminCommentsQueryKey(orderId),
          (prev) => prev?.filter((c) => c.id !== commentId) ?? [],
        );
      }
    };

    const handleError = (err: unknown) => {
      const errorObj = err as { code?: number; message?: string } | null;
      if (errorObj?.code === 403) {
        toast.error("You do not have permission to access comments for this order.");
      } else if (process.env.NODE_ENV !== "production") {
        console.error("[AdminCommentSocket] Socket error:", err);
      }
    };

    socket.on(SOCKET_ON.ORDER_COMMENT, handleComment);
    socket.on(SOCKET_ON.ORDER_COMMENT_UPDATED, handleUpdated);
    socket.on(SOCKET_ON.ORDER_COMMENT_DELETED, handleDeleted);
    socket.on(SOCKET_ON.SOCKET_ERROR, handleError);

    return () => {
      socket.off(SOCKET_ON.ORDER_COMMENT, handleComment);
      socket.off(SOCKET_ON.ORDER_COMMENT_UPDATED, handleUpdated);
      socket.off(SOCKET_ON.ORDER_COMMENT_DELETED, handleDeleted);
      socket.off(SOCKET_ON.SOCKET_ERROR, handleError);
      socket.emit(SOCKET_EMIT.LEAVE_ORDER, { orderId });
      cleanupReconnect();
    };
  }, [orderId, queryClient]);
}
