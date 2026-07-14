"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchChatMessages } from "../_services/chats.service";
import type { ChatMessagePage } from "../_types/chats.type";

export function useChatMessages(chatId: string | null) {
  return useInfiniteQuery({
    queryKey: ["chat", "messages", chatId],
    queryFn: async ({ pageParam }) => {
      if (!chatId) {
        return { messages: [], has_more: false, next_cursor: null } as ChatMessagePage;
      }
      const res = await fetchChatMessages(chatId, pageParam as string | null, 50);
      if (!res.ok) {
        throw new Error(res.error?.message || "Failed to fetch messages");
      }
      return res.data;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage?.has_more ? lastPage.next_cursor : null,
    enabled: !!chatId,
    staleTime: Infinity, // messages are immutable, only updated/inserted via socket
  });
}
