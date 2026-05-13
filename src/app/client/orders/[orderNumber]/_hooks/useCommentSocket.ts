"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { commentsQueryKey } from "./useOrderComments";
import type { OrderCommentDTO } from "../_types";

const JOIN_EVENT = "join:order";
const LEAVE_EVENT = "leave:order";
const MESSAGE_EVENT = "order:comment";

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
        (prev) => (prev ? [...prev, comment] : [comment]),
      );
    };

    socket.on(MESSAGE_EVENT, handleComment);

    return () => {
      socket.off(MESSAGE_EVENT, handleComment);
      socket.emit(LEAVE_EVENT, { orderId });
      if (process.env.NODE_ENV !== "production") {
        console.debug(`[CommentSocket] Left room for order: ${orderId}`);
      }
    };
  }, [orderId, queryClient]);
}
