"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendClientChatMessage,
  editClientChatMessage,
  deleteClientChatMessage,
  markClientChatAsRead,
} from "../_services/client-chat-details.service";
import type { ChatMessage, ChatMessagePage, ChatAttachment } from "@/app/admin/chats/_types/chats.type";
import { apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { ChatAttachmentSchema } from "@/app/admin/chats/_schemas/chats.schema";

export function useClientChatActions(chatId: string | null) {
  const queryClient = useQueryClient();

  const sendMsg = useMutation({
    mutationFn: (content: string) => {
      if (!chatId) throw new Error("No active chat ID");
      return sendClientChatMessage(chatId, content);
    },
    onSuccess: (res) => {
      if (res.ok && res.data) {
        const newMsg: ChatMessage = res.data;
        queryClient.setQueryData(
          ["client", "chat", "messages", chatId],
          (old: { pages: ChatMessagePage[]; pageParams: unknown[] } | undefined) => {
            if (!old) return old;
            const newPages = [...old.pages];
            const lastIdx = newPages.length - 1;
            const lastPage = newPages[lastIdx];
            if (lastPage) {
              newPages[lastIdx] = {
                messages: [...lastPage.messages, newMsg],
                has_more: lastPage.has_more,
                next_cursor: lastPage.next_cursor,
              };
            }
            return { ...old, pages: newPages };
          }
        );
      }
    },
  });

  const editMsg = useMutation({
    mutationFn: ({ messageId, content }: { messageId: string; content: string }) => {
      if (!chatId) throw new Error("No active chat ID");
      return editClientChatMessage(chatId, messageId, content);
    },
  });

  const deleteMsg = useMutation({
    mutationFn: (messageId: string) => {
      if (!chatId) throw new Error("No active chat ID");
      return deleteClientChatMessage(chatId, messageId);
    },
  });

  const markRead = useMutation({
    mutationFn: () => {
      if (!chatId) throw new Error("No active chat ID");
      return markClientChatAsRead(chatId);
    },
  });

  const uploadAttachment = async (file: File): Promise<ApiResult<ChatAttachment>> => {
    if (!chatId) throw new Error("No active chat ID");
    const fd = new FormData();
    fd.append("file", file);
    const res = await apiPost<unknown>(`/chats/${chatId}/attachments`, fd);
    if (!res.ok) return { ok: false, error: res.error };
    const p = ChatAttachmentSchema.safeParse(res.data);
    if (!p.success) return { ok: false, error: { message: "Parsing failed", status: 422 } };
    return { ok: true, data: p.data, message: res.message, status: res.status };
  };

  return {
    sendMessage: (content: string) => sendMsg.mutateAsync(content),
    editMessage: (messageId: string, content: string) => editMsg.mutateAsync({ messageId, content }),
    deleteMessage: (messageId: string) => deleteMsg.mutateAsync(messageId),
    markAsRead: () => markRead.mutateAsync(),
    uploadAttachment,
  };
}
