import { useState, useMemo } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "@/lib/services/notification.service";
import type { NotificationType } from "@/lib/types/notification.type";

export interface NotificationFilters {
  search: string;
  type: "all" | NotificationType;
  readStatus: "all" | "unread" | "read";
}

export function useNotificationsPage() {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<NotificationFilters>({
    search: "",
    type: "all",
    readStatus: "all",
  });

  const [pendingActionIds, setPendingActionIds] = useState<Set<string>>(new Set());

  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["notifications", "infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetchNotifications(20, pageParam);
      if (!res.ok) throw new Error("Failed to fetch notifications from the server.");
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.has_more ? lastPage.offset + lastPage.limit : undefined;
    },
    staleTime: 15_000,
    enabled: isAuthenticated,
  });

  const notifications = useMemo(() => {
    return data?.pages.flatMap((page) => page.notifications) || [];
  }, [data]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notif) => {
      const matchesSearch =
        notif.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        notif.message.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType = filters.type === "all" || notif.type === filters.type;

      const matchesRead =
        filters.readStatus === "all" ||
        (filters.readStatus === "unread" && !notif.is_read) ||
        (filters.readStatus === "read" && notif.is_read);

      return matchesSearch && matchesType && matchesRead;
    });
  }, [notifications, filters]);

  // Mutations
  const markReadMut = useMutation({
    mutationFn: async (id: string) => {
      setPendingActionIds((prev) => new Set(prev).add(id));
      const res = await markNotificationRead(id);
      if (!res.ok) throw new Error("Failed to mark notification as read.");
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onSettled: (_, __, id) => {
      setPendingActionIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
  });

  const markAllReadMut = useMutation({
    mutationFn: async () => {
      const res = await markAllNotificationsRead();
      if (!res.ok) throw new Error("Failed to mark all notifications as read.");
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      setPendingActionIds((prev) => new Set(prev).add(id));
      const res = await deleteNotification(id);
      if (!res.ok) throw new Error("Failed to delete notification.");
      return res.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onSettled: (_, __, id) => {
      setPendingActionIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
  });

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  };

  const cleanError = error ? "Failed to load notifications. Please try again." : null;

  return {
    notifications: filteredNotifications,
    isLoading,
    error: cleanError,
    filters,
    setFilters,
    markAsRead: async (id: string) => {
      await markReadMut.mutateAsync(id);
    },
    markAllAsRead: async () => {
      await markAllReadMut.mutateAsync();
    },
    handleDelete: async (id: string) => {
      await deleteMut.mutateAsync(id);
    },
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    pendingActionIds,
  };
}
