"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_EMIT, SOCKET_ON } from "@/lib/constants/socket-events";
import { commentsQueryKey } from "./useOrderComments";
import { OrderCommentSchema, OrderDeliverySchema } from "../_schemas";
import type { OrderCommentDTO, OrderDeliveryResponseDTO } from "../_types";

export function useCommentSocket(orderId: string): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!orderId) return;

    const socket = webSocketService.connect();
    socket.emit(SOCKET_EMIT.JOIN_ORDER, { orderId });

    if (process.env.NODE_ENV !== "production") {
      console.debug(`[CommentSocket] Joined room for order: ${orderId}`);
    }

    const cleanupReconnect = webSocketService.onReconnect(() => {
      socket.emit(SOCKET_EMIT.JOIN_ORDER, { orderId });
      if (process.env.NODE_ENV !== "production") {
        console.debug(`[CommentSocket] Rejoined room for order after reconnect: ${orderId}`);
      }
    });

    const handleComment = (raw: unknown) => {
      const parsed = OrderCommentSchema.safeParse(raw);
      if (parsed.success) {
        const comment = parsed.data as OrderCommentDTO;
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
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[CommentSocket] Invalid order:comment payload:", parsed.error.issues);
      }
    };

    const handleUpdated = (raw: unknown) => {
      const parsed = OrderCommentSchema.safeParse(raw);
      if (parsed.success) {
        const updated = parsed.data as OrderCommentDTO;
        queryClient.setQueryData<OrderCommentDTO[]>(
          commentsQueryKey(orderId),
          (prev) => prev?.map((c) => (c.id === updated.id ? updated : c)) ?? [],
        );
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[CommentSocket] Invalid order:comment:updated payload:", parsed.error.issues);
      }
    };

    const handleDeleted = (payload: { comment_id?: string }) => {
      const commentId = payload?.comment_id;
      if (commentId) {
        queryClient.setQueryData<OrderCommentDTO[]>(
          commentsQueryKey(orderId),
          (prev) => prev?.filter((c) => c.id !== commentId) ?? [],
        );
      }
    };

    const handleRevisionStatusChanged = () => {
      toast.info("Revision status updated");
      queryClient.invalidateQueries({ queryKey: ["client-order-detail"] });
    };

    const handleDeliveryCreated = (raw: unknown) => {
      const parsed = OrderDeliverySchema.safeParse(raw);
      if (parsed.success) {
        toast.success("New delivery uploaded");
        queryClient.invalidateQueries({ queryKey: ["order-deliveries", orderId] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[CommentSocket] Invalid order:delivery:created payload:", parsed.error.issues);
      }
    };

    const handleDeliveryUpdated = (raw: unknown) => {
      const parsed = OrderDeliverySchema.safeParse(raw);
      if (parsed.success) {
        const updatedDelivery = parsed.data as unknown as OrderDeliveryResponseDTO;
        queryClient.setQueryData<OrderDeliveryResponseDTO[]>(
          ["order-deliveries", orderId],
          (prev) => prev?.map((d) => (d.id === updatedDelivery.id ? updatedDelivery : d)) ?? [],
        );
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[CommentSocket] Invalid order:delivery:updated payload:", parsed.error.issues);
      }
    };

    socket.on(SOCKET_ON.ORDER_COMMENT, handleComment);
    socket.on(SOCKET_ON.ORDER_COMMENT_UPDATED, handleUpdated);
    socket.on(SOCKET_ON.ORDER_COMMENT_DELETED, handleDeleted);
    socket.on(SOCKET_ON.ORDER_REVISION_STATUS, handleRevisionStatusChanged);
    socket.on(SOCKET_ON.DELIVERY_CREATED, handleDeliveryCreated);
    socket.on(SOCKET_ON.DELIVERY_UPDATED, handleDeliveryUpdated);

    return () => {
      socket.off(SOCKET_ON.ORDER_COMMENT, handleComment);
      socket.off(SOCKET_ON.ORDER_COMMENT_UPDATED, handleUpdated);
      socket.off(SOCKET_ON.ORDER_COMMENT_DELETED, handleDeleted);
      socket.off(SOCKET_ON.ORDER_REVISION_STATUS, handleRevisionStatusChanged);
      socket.off(SOCKET_ON.DELIVERY_CREATED, handleDeliveryCreated);
      socket.off(SOCKET_ON.DELIVERY_UPDATED, handleDeliveryUpdated);
      socket.emit(SOCKET_EMIT.LEAVE_ORDER, { orderId });
      cleanupReconnect();
      if (process.env.NODE_ENV !== "production") {
        console.debug(`[CommentSocket] Left room for order: ${orderId}`);
      }
    };
  }, [orderId, queryClient]);
}
