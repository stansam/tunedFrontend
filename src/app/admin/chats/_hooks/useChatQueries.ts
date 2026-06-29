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
import { FALLBACK_CHATS, FALLBACK_AGENTS } from "../_fallbacks/chats.fallback";
import { useChatSocket } from "./useChatSocket";

export function useChatQueries(activeChatId: string | null) {
  const queryClient = useQueryClient();

  const wrap = <T>(fn: () => Promise<{ ok: boolean; data?: T }>, fb: T) =>
    fn().then((r) => (r.ok ? (r.data as T) : fb));

  const chatsQ = useQuery({
    queryKey: ["admin", "chats"],
    queryFn: () => wrap(fetchAdminChats, FALLBACK_CHATS),
    staleTime: 10000,
  });

  const agentsQ = useQuery({
    queryKey: ["admin", "agents"],
    queryFn: () => wrap(fetchSupportAgents, FALLBACK_AGENTS),
    staleTime: 60000,
  });

  useChatSocket();

  const sendMsgMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => sendChatMessage(id, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "chats"] }),
  });

  const assignMutation = useMutation({
    mutationFn: ({ id, adminId }: { id: string; adminId: string }) => assignSupportAgent(id, adminId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "chats"] }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "active" | "closed" }) => changeChatStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "chats"] }),
  });

  const readMutation = useMutation({
    mutationFn: (id: string) => markChatAsRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "chats"] }),
  });

  const activeChat = chatsQ.data?.find((c) => c.id === activeChatId) || null;

  return {
    chats: chatsQ.data,
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
