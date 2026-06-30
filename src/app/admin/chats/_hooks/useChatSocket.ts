"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON, SOCKET_EMIT } from "@/lib/constants/socket-events";
import type { ChatRoom, ChatMessage, ChatMessagePage } from "../_types/chats.type";
import { toast } from "sonner";

interface MsgPayload {
  chat_id: string;
  message_id: string;
  sender_id: string;
  content: string | null;
  is_admin: boolean;
  created_at: string;
}

export function useChatSocket(activeChatId: string | null): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    // 1. Join chat room on mount/activeChatId change
    if (activeChatId) {
      socket.emit(SOCKET_EMIT.JOIN_CHAT, { chatId: activeChatId });
    }

    // 2. Rejoin on reconnect
    const unsubscribeReconnect = webSocketService.onReconnect(() => {
      if (activeChatId) {
        socket.emit(SOCKET_EMIT.JOIN_CHAT, { chatId: activeChatId });
      }
    });

    // 3. Cache update helpers
    const updateMessagesCache = (chatId: string, fn: (pages: ChatMessagePage[]) => ChatMessagePage[]) => {
      queryClient.setQueryData(["chat", "messages", chatId], (old: { pages: ChatMessagePage[]; pageParams: unknown[] } | undefined) => {
        if (!old) return old;
        return {
          ...old,
          pages: fn(old.pages),
        };
      });
    };

    const updateMessageInCache = (chatId: string, messageId: string, fn: (m: ChatMessage) => ChatMessage) => {
      updateMessagesCache(chatId, (pages) =>
        pages.map((page) => ({
          ...page,
          messages: page.messages.map((m) => (m.id === messageId ? fn(m) : m)),
        }))
      );
    };

    const handleNewMessage = (p: MsgPayload) => {
      // Append message to paginated cache
      updateMessagesCache(p.chat_id, (pages) => {
        const exists = pages.some((page) => page.messages.some((m) => m.id === p.message_id));
        if (exists) return pages;

        const newMsg: ChatMessage = {
          id: p.message_id,
          chat_id: p.chat_id,
          user_id: p.sender_id,
          content: p.content,
          is_read: false,
          sender_name: p.is_admin ? "Support" : "Client",
          is_admin: p.is_admin,
          created_at: p.created_at,
        };

        const newPages = [...pages];
        const lastIdx = newPages.length - 1;
        const lastPage = newPages[lastIdx];
        if (lastPage) {
          newPages[lastIdx] = {
            messages: [...lastPage.messages, newMsg],
            has_more: lastPage.has_more,
            next_cursor: lastPage.next_cursor,
          };
        } else {
          newPages.push({
            messages: [newMsg],
            has_more: false,
            next_cursor: null,
          });
        }
        return newPages;
      });

      // Increment unread count in chat list
      queryClient.setQueryData(["admin", "chats"], (old: ChatRoom[] | undefined) =>
        old?.map((chat) => {
          if (chat.id === p.chat_id) {
            return {
              ...chat,
              unread_count: p.is_admin ? chat.unread_count : chat.unread_count + 1,
            };
          }
          return chat;
        })
      );
    };

    const handleMsgUpdated = (p: { chat_id: string; message_id: string; content: string }) => {
      updateMessageInCache(p.chat_id, p.message_id, (m) => ({
        ...m,
        content: p.content,
        is_edited: true,
      }));
    };

    const handleMsgDeleted = (p: { chat_id: string; message_id: string }) => {
      updateMessageInCache(p.chat_id, p.message_id, (m) => ({
        ...m,
        content: null,
        is_deleted: true,
        attachments: [],
      }));
    };

    const handleChatRead = (p: { chat_id: string; reader_id: string; message_ids: string[] }) => {
      const idsSet = new Set(p.message_ids);
      updateMessagesCache(p.chat_id, (pages) =>
        pages.map((page) => ({
          ...page,
          messages: page.messages.map((m) => (idsSet.has(m.id) ? { ...m, is_read: true } : m)),
        }))
      );

      // Reset unread count for this chat
      queryClient.setQueryData(["admin", "chats"], (old: ChatRoom[] | undefined) =>
        old?.map((chat) => {
          if (chat.id === p.chat_id) {
            return {
              ...chat,
              unread_count: 0,
            };
          }
          return chat;
        })
      );
    };

    const handleChatCreated = (p: { subject: string | null }) => {
      toast.info(`New support chat created: ${p.subject || "No Subject"}`);
      queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });
    };

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "chats"] });

    socket.on(SOCKET_ON.CHAT_MESSAGE, handleNewMessage);
    socket.on(SOCKET_ON.CHAT_MESSAGE_UPDATED, handleMsgUpdated);
    socket.on(SOCKET_ON.CHAT_MESSAGE_DELETED, handleMsgDeleted);
    socket.on(SOCKET_ON.CHAT_READ, handleChatRead);
    socket.on(SOCKET_ON.ADMIN_CHAT_CREATED, handleChatCreated);
    socket.on(SOCKET_ON.CHAT_STATUS_CHANGED, invalidate);
    socket.on(SOCKET_ON.CHAT_ASSIGNED, invalidate);

    return () => {
      if (activeChatId) {
        socket.emit(SOCKET_EMIT.LEAVE_CHAT, { chatId: activeChatId });
      }
      unsubscribeReconnect();

      socket.off(SOCKET_ON.CHAT_MESSAGE, handleNewMessage);
      socket.off(SOCKET_ON.CHAT_MESSAGE_UPDATED, handleMsgUpdated);
      socket.off(SOCKET_ON.CHAT_MESSAGE_DELETED, handleMsgDeleted);
      socket.off(SOCKET_ON.CHAT_READ, handleChatRead);
      socket.off(SOCKET_ON.ADMIN_CHAT_CREATED, handleChatCreated);
      socket.off(SOCKET_ON.CHAT_STATUS_CHANGED, invalidate);
      socket.off(SOCKET_ON.CHAT_ASSIGNED, invalidate);
    };
  }, [queryClient, activeChatId]);
}
