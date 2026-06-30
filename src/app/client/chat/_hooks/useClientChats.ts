"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClientChats, createClientChat } from "../_services/client-chats.service";
import type { ClientChatSummary } from "../_types/client-chat.type";

export function useClientChats() {
  const queryClient = useQueryClient();

  const chatsQ = useQuery({
    queryKey: ["client", "chats"],
    queryFn: async () => {
      const res = await fetchClientChats();
      if (!res.ok) {
        throw new Error(res.error?.message || "Failed to fetch conversations");
      }
      return res.data || [];
    },
    staleTime: 30000,
  });

  const createChatMutation = useMutation({
    mutationFn: ({ subject, orderId }: { subject?: string; orderId?: string }) =>
      createClientChat(subject, orderId),
    onSuccess: (res) => {
      if (res.ok && res.data) {
        const newChat: ClientChatSummary = res.data;
        queryClient.setQueryData(["client", "chats"], (old: ClientChatSummary[] | undefined) => {
          return old ? [newChat, ...old] : [newChat];
        });
      }
    },
  });

  return {
    chats: chatsQ.data || [],
    isLoading: chatsQ.isLoading,
    error: chatsQ.error,
    createChat: async (subject?: string, orderId?: string) => {
      const res = await createChatMutation.mutateAsync({ subject, orderId });
      if (!res.ok) {
        throw new Error(res.error?.message || "Failed to create conversation");
      }
      return res.data;
    },
    isCreating: createChatMutation.isPending,
  };
}
