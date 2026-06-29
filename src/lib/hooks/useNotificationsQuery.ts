import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "@/lib/services/notification.service";

export function useNotificationsQuery(limit = 50, offset = 0, enabled = true) {
  return useQuery({
    queryKey: ["notifications", limit, offset],
    queryFn: async () => {
      const res = await fetchNotifications(limit, offset);
      if (!res.ok) throw new Error(res.error?.message || "Failed to fetch");
      return res.data;
    },
    staleTime: 15_000,
    enabled,
  });
}

export function useMarkReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await markNotificationRead(id);
      if (!res.ok) throw new Error(res.error?.message || "Failed to mark read");
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await markAllNotificationsRead();
      if (!res.ok) throw new Error(res.error?.message || "Failed to mark all read");
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useDeleteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNotification(id);
      if (!res.ok) throw new Error(res.error?.message || "Failed to delete");
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
