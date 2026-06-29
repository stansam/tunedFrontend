"use client";

import { useState, useMemo } from "react";
import { useNotifications } from "@/lib/contexts/NotificationContext";
import { useDeleteMutation } from "@/lib/hooks/useNotificationsQuery";
import type { NotificationFilters } from "../_types";

export function useClientNotifications() {
  const { notifications, isLoading, error, markAsRead, markAllAsRead } = useNotifications();
  const deleteMutation = useDeleteMutation();
  
  const [filters, setFilters] = useState<NotificationFilters>({
    search: "",
    type: "all",
    readStatus: "all",
  });

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

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return {
    notifications: filteredNotifications,
    isLoading,
    error,
    filters,
    setFilters,
    markAsRead,
    markAllAsRead,
    handleDelete,
  };
}
