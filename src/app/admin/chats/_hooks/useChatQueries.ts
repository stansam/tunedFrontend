"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminChats,
  fetchSupportAgents,
  sendChatMessage,
  assignSupportAgent,
  changeChatStatus,
  markChatAsRead,
} from "../_services/chats.service";
import { FALLBACK_AGENTS } from "../_fallbacks/chats.fallback";
import type { ChatRoom, ChatMessage, ChatMessagePage } from "../_types/chats.type";

export function useChatQueries(activeChatId: string | null) {
  const queryClient = useQueryClient();

  const chatsQ = useQuery({
    queryKey: ["admin", "chats"],
    queryFn: async () => {
      const res = await fetchAdminChats();
      if (!res.ok) {
        throw new Error(res.error?.message || "Failed to fetch chats");
      }
      return res.data;
    },
    staleTime: 60000, // rely on sockets for real-time updates
  });

  const agentsQ = useQuery({
    queryKey: ["admin", "agents"],
    queryFn: async () => {
      const res = await fetchSupportAgents();
      if (!res.ok) {
        throw new Error(res.error?.message || "Failed to fetch support agents");
      }
      return res.data;
    },
    staleTime: 120000,
  });

  const sendMsgMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => sendChatMessage(id, content),
    onSuccess: (res, variables) => {
      if (res.ok && res.data) {
        const newMsg: ChatMessage = res.data;
        // Append sent message to paginated messages cache
        queryClient.setQueryData(["chat", "messages", variables.id], (old: { pages: ChatMessagePage[]; pageParams: unknown[] } | undefined) => {
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
        });
      }
    },
  });

  const assignMutation = useMutation({
    mutationFn: ({ id, adminId }: { id: string; adminId: string }) => assignSupportAgent(id, adminId),
    onSuccess: (res, variables) => {
      if (res.ok && res.data) {
        const updatedChat: ChatRoom = res.data;
        queryClient.setQueryData(["admin", "chats"], (old: ChatRoom[] | undefined) =>
          old?.map((chat) => (chat.id === variables.id ? { ...chat, ...updatedChat } : chat))
        );
      }
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "closed" }) => changeChatStatus(id, status),
    onSuccess: (res, variables) => {
      if (res.ok && res.data) {
        const updatedChat: ChatRoom = res.data;
        queryClient.setQueryData(["admin", "chats"], (old: ChatRoom[] | undefined) =>
          old?.map((chat) => (chat.id === variables.id ? { ...chat, ...updatedChat } : chat))
        );
      }
    },
  });

  const readMutation = useMutation({
    mutationFn: (id: string) => markChatAsRead(id),
    onSuccess: (_, chatId) => {
      // Reset unread count for this chat in list
      queryClient.setQueryData(["admin", "chats"], (old: ChatRoom[] | undefined) =>
        old?.map((chat) => (chat.id === chatId ? { ...chat, unread_count: 0 } : chat))
      );
    },
  });

  const activeChat = chatsQ.data?.find((c) => c.id === activeChatId) || null;

  return {
    chats: chatsQ.data || [],
    agents: agentsQ.data || FALLBACK_AGENTS,
    isLoadingChats: chatsQ.isLoading,
    isLoadingAgents: agentsQ.isLoading,
    activeChat,
    sendMessage: (content: string) =>
      activeChatId ? sendMsgMutation.mutateAsync({ id: activeChatId, content }) : Promise.resolve(),
    assignAgent: (adminId: string) =>
      activeChatId ? assignMutation.mutateAsync({ id: activeChatId, adminId }) : Promise.resolve(),
    changeStatus: (status: "active" | "closed") =>
      activeChatId ? statusMutation.mutateAsync({ id: activeChatId, status }) : Promise.resolve(),
    markAsRead: () =>
      activeChatId ? readMutation.mutateAsync(activeChatId) : Promise.resolve(),
    refresh: () => queryClient.invalidateQueries({ queryKey: ["admin"] }),
  };
}
