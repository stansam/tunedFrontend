"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { useAuthContext } from "@/lib/auth/Context";
import {
  useNotificationsQuery,
  useMarkReadMutation,
  useMarkAllReadMutation,
} from "@/lib/hooks/useNotificationsQuery";
import { useNotificationSocket } from "@/lib/hooks/useNotificationSocket";
import type { NotificationContextValue } from "@/lib/types/notification.type";

const NotificationContext = createContext<NotificationContextValue | null>(null);
NotificationContext.displayName = "NotificationContext";

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const query = useNotificationsQuery(50);
  const markReadMut = useMarkReadMutation();
  const markAllReadMut = useMarkAllReadMutation();

  useNotificationSocket(isAuthenticated, setUnreadCount);

  const value = useMemo<NotificationContextValue>(() => ({
    unreadCount,
    notifications: query.data || [],
    isLoading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    markAsRead: async (id: string) => {
      await markReadMut.mutateAsync(id);
    },
    markAllAsRead: async () => {
      await markAllReadMut.mutateAsync();
    },
    fetchNotifications: async () => {
      await query.refetch();
    },
  }), [unreadCount, query, markReadMut, markAllReadMut]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return ctx;
}
