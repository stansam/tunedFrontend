"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import type { ChatRoom, ChatMessage } from "../_types/chats.type";
import { toast } from "sonner";

interface ChatMessagePayload {
  chat_id: string;
  message_id: string;
  sender_id: string;
  content: string;
  is_admin: boolean;
  created_at: string;
}

interface ChatCreatedPayload {
  chat_id: string;
  user_id: string;
  subject: string | null;
  order_id: string | null;
  created_at: string;
}

export function useChatSocket(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleNewMessage = (payload: ChatMessagePayload) => {
      queryClient.setQueryData(["admin", "chats"], (old: ChatRoom[] | undefined) => {
        if (!old) return old;
        return old.map((chat) => {
          if (chat.id === payload.chat_id) {
            const msgExists = chat.messages.some((m) => m.id === payload.message_id);
            if (msgExists) return chat;

            const newMsg: ChatMessage = {
              id: payload.message_id,
              chat_id: payload.chat_id,
              user_id: payload.sender_id,
              content: payload.content,
              is_read: false,
              sender_name: payload.is_admin ? "Support" : chat.user_name,
              is_admin: payload.is_admin,
              created_at: payload.created_at,
            };

            return {
              ...chat,
              messages: [...chat.messages, newMsg],
              unread_count: payload.is_admin ? chat.unread_count : chat.unread_count + 1,
              updated_at: payload.created_at,
            };
          }
          return chat;
        });
      });
    };

    const handleChatCreated = (payload: ChatCreatedPayload) => {
      toast.info(`New support chat created: ${payload.subject || "No Subject"}`);
      queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });
    };

    const handleStatusChanged = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });
    };

    const handleAssigned = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });
    };

    socket.on(SOCKET_ON.CHAT_MESSAGE, handleNewMessage);
    socket.on(SOCKET_ON.ADMIN_CHAT_CREATED, handleChatCreated);
    socket.on(SOCKET_ON.CHAT_STATUS_CHANGED, handleStatusChanged);
    socket.on(SOCKET_ON.CHAT_ASSIGNED, handleAssigned);

    return () => {
      socket.off(SOCKET_ON.CHAT_MESSAGE, handleNewMessage);
      socket.off(SOCKET_ON.ADMIN_CHAT_CREATED, handleChatCreated);
      socket.off(SOCKET_ON.CHAT_STATUS_CHANGED, handleStatusChanged);
      socket.off(SOCKET_ON.CHAT_ASSIGNED, handleAssigned);
    };
  }, [queryClient]);
}
