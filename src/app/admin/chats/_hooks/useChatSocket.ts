"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import type { ChatRoom, ChatMessage } from "../_types/chats.type";
import { toast } from "sonner";

interface MsgPayload {
  chat_id: string;
  message_id: string;
  sender_id: string;
  content: string | null;
  is_admin: boolean;
  created_at: string;
}

export function useChatSocket(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const updateChats = (chatId: string, fn: (chat: ChatRoom) => ChatRoom) => {
      queryClient.setQueryData(["admin", "chats"], (old: ChatRoom[] | undefined) =>
        old?.map((chat) => (chat.id === chatId ? fn(chat) : chat))
      );
    };

    const handleNewMessage = (p: MsgPayload) => {
      updateChats(p.chat_id, (chat) => {
        if (chat.messages.some((m) => m.id === p.message_id)) return chat;
        const newMsg: ChatMessage = {
          id: p.message_id,
          chat_id: p.chat_id,
          user_id: p.sender_id,
          content: p.content,
          is_read: false,
          sender_name: p.is_admin ? "Support" : chat.user_name,
          is_admin: p.is_admin,
          created_at: p.created_at,
        };
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          unread_count: p.is_admin ? chat.unread_count : chat.unread_count + 1,
          updated_at: p.created_at,
        };
      });
    };

    const handleMsgUpdated = (p: { chat_id: string; message_id: string; content: string }) => {
      updateChats(p.chat_id, (chat) => ({
        ...chat,
        messages: chat.messages.map((m) =>
          m.id === p.message_id ? { ...m, content: p.content, is_edited: true } : m
        ),
      }));
    };

    const handleMsgDeleted = (p: { chat_id: string; message_id: string }) => {
      updateChats(p.chat_id, (chat) => ({
        ...chat,
        messages: chat.messages.map((m) =>
          m.id === p.message_id ? { ...m, content: null, is_deleted: true, attachments: [] } : m
        ),
      }));
    };

    const handleChatCreated = (p: { subject: string | null }) => {
      toast.info(`New support chat created: ${p.subject || "No Subject"}`);
      queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });
    };

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });

    socket.on(SOCKET_ON.CHAT_MESSAGE, handleNewMessage);
    socket.on(SOCKET_ON.CHAT_MESSAGE_UPDATED, handleMsgUpdated);
    socket.on(SOCKET_ON.CHAT_MESSAGE_DELETED, handleMsgDeleted);
    socket.on(SOCKET_ON.ADMIN_CHAT_CREATED, handleChatCreated);
    socket.on(SOCKET_ON.CHAT_STATUS_CHANGED, invalidate);
    socket.on(SOCKET_ON.CHAT_ASSIGNED, invalidate);

    return () => {
      socket.off(SOCKET_ON.CHAT_MESSAGE, handleNewMessage);
      socket.off(SOCKET_ON.CHAT_MESSAGE_UPDATED, handleMsgUpdated);
      socket.off(SOCKET_ON.CHAT_MESSAGE_DELETED, handleMsgDeleted);
      socket.off(SOCKET_ON.ADMIN_CHAT_CREATED, handleChatCreated);
      socket.off(SOCKET_ON.CHAT_STATUS_CHANGED, invalidate);
      socket.off(SOCKET_ON.CHAT_ASSIGNED, invalidate);
    };
  }, [queryClient]);
}
