"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useAuthContext } from "@/lib/auth/Context";
import { webSocketService } from "@/lib/services/websocket.service";
import { apiGet, apiPost } from "@/api-client";
import { SOCKET_EMIT, SOCKET_ON } from "@/lib/constants/socket-events";
import type { NotificationItem, NotificationContextValue } from "@/lib/types/notification.type";

const NotificationContext = createContext<NotificationContextValue | null>(null);
NotificationContext.displayName = "NotificationContext";

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(isAuthenticated);
  const [error] = useState<string | null>(null);

  const [prevIsAuthenticated, setPrevIsAuthenticated] = useState(isAuthenticated);

  if (isAuthenticated !== prevIsAuthenticated) {
    setPrevIsAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await apiGet<NotificationItem[]>("/notifications");
      if (res.ok && res.data) {
        setNotifications(res.data);
      }
    } catch (err: unknown) {
      console.warn("Could not fetch initial notifications via REST:", err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const refreshNotifications = useCallback(async () => {
    setIsLoading(true);
    await fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!isAuthenticated) {
      webSocketService.disconnect();
      return;
    }

    const socket = webSocketService.connect();

    const handleCount = (data: { unread_count: number }) => {
      setUnreadCount(data.unread_count);
    };

    const handleNew = (notification: NotificationItem) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      const message = notification.message;
      if (notification.type === 'success') toast.success(notification.title, { description: message });
      else if (notification.type === 'warning') toast.warning(notification.title, { description: message });
      else if (notification.type === 'error') toast.error(notification.title, { description: message });
      else toast.info(notification.title, { description: message });
    };

    const handleRead = (data: { notification_id: string }) => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === data.notification_id ? { ...n, is_read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    const handleError = (err: unknown) => {
      const errorObj = err as { code?: number; message?: string } | null;
      if (errorObj?.code === 429) {
        toast.error("Too many notification requests. Please slow down.");
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.error("[WebSocket error]", err);
        }
      }
    };

    socket.on(SOCKET_ON.NOTIFICATION_COUNT, handleCount);
    socket.on(SOCKET_ON.NOTIFICATION_NEW, handleNew);
    socket.on(SOCKET_ON.NOTIFICATION_READ, handleRead);
    socket.on(SOCKET_ON.SOCKET_ERROR, handleError);

    Promise.resolve().then(() => {
      void fetchNotifications();
    });

    return () => {
      socket.off(SOCKET_ON.NOTIFICATION_COUNT, handleCount);
      socket.off(SOCKET_ON.NOTIFICATION_NEW, handleNew);
      socket.off(SOCKET_ON.NOTIFICATION_READ, handleRead);
      socket.off(SOCKET_ON.SOCKET_ERROR, handleError);
    };
  }, [isAuthenticated, fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    const socket = webSocketService.getSocket();
    if (socket?.connected) {
      socket.emit(SOCKET_EMIT.NOTIFICATION_MARK_READ, { notification_id: id });
    } else {
      await apiPost(`/notifications/${id}/read`, {});
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    await apiPost(`/notifications/read-all`, {});
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  }, []);

  const value = useMemo<NotificationContextValue>(
    () => ({
      unreadCount,
      notifications,
      isLoading,
      error,
      markAsRead,
      markAllAsRead,
      fetchNotifications: refreshNotifications,
    }),
    [unreadCount, notifications, isLoading, error, markAsRead, markAllAsRead, refreshNotifications]
  );

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
