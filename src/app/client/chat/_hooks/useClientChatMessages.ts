"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchClientChatMessages } from "../_services/client-chat-details.service";
import type { ChatMessagePage } from "@/app/admin/chats/_types/chats.type";

export function useClientChatMessages(chatId: string | null) {
  return useInfiniteQuery({
    queryKey: ["client", "chat", "messages", chatId],
    queryFn: async ({ pageParam }) => {
      if (!chatId) {
        return { messages: [], has_more: false, next_cursor: null } as ChatMessagePage;
      }
      const res = await fetchClientChatMessages(chatId, pageParam as string | null, 50);
      if (!res.ok) {
        throw new Error(res.error?.message || "Failed to fetch messages");
      }
      return res.data;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage?.has_more ? lastPage.next_cursor : null,
    enabled: !!chatId,
    staleTime: Infinity,
  });
}
