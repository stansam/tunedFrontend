"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { messagesQueryKey } from "./useOrderMessages";
import type { OrderMessageDTO } from "../_types";

const JOIN_EVENT = "join:order";
const LEAVE_EVENT = "leave:order";
const MESSAGE_EVENT = "order:message";

export function useMessageSocket(orderId: string): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!orderId) return;

    const socket = webSocketService.connect();
    socket.emit(JOIN_EVENT, { orderId });

    if (process.env.NODE_ENV !== "production") {
      console.debug(`[MessageSocket] Joined room for order: ${orderId}`);
    }

    const handleMessage = (message: OrderMessageDTO) => {
      if (process.env.NODE_ENV !== "production") {
        console.debug("[MessageSocket] New message received:", message.id);
      }
      queryClient.setQueryData<OrderMessageDTO[]>(
        messagesQueryKey(orderId),
        (prev) => (prev ? [...prev, message] : [message]),
      );
    };

    socket.on(MESSAGE_EVENT, handleMessage);

    return () => {
      socket.off(MESSAGE_EVENT, handleMessage);
      socket.emit(LEAVE_EVENT, { orderId });
      if (process.env.NODE_ENV !== "production") {
        console.debug(`[MessageSocket] Left room for order: ${orderId}`);
      }
    };
  }, [orderId, queryClient]);
}
