import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import type { NotificationItem } from "@/lib/types/notification.type";

export function useNotificationSocket(isAuthenticated: boolean) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) {
      webSocketService.disconnect();
      return;
    }

    const socket = webSocketService.connect();

    const handleConnect = () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    const handleCount = () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    const handleNew = (notification: NotificationItem) => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });

      const msg = notification.message;
      if (notification.type === "success") toast.success(notification.title, { description: msg });
      else if (notification.type === "warning") toast.warning(notification.title, { description: msg });
      else if (notification.type === "error") toast.error(notification.title, { description: msg });
      else toast.info(notification.title, { description: msg });

      // Audio notification with fallback check
      const soundEnabled = typeof window !== "undefined" && localStorage.getItem("notificationSound") !== "disabled";
      if (soundEnabled) {
        const audio = new Audio("/sounds/notification.wav");
        audio.play().catch((e) => console.warn("Audio play blocked:", e));
      }
    };

    const handleRead = () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    const handleError = (err: unknown) => {
      if (process.env.NODE_ENV !== "production") console.error("[WebSocket error]", err);
    };

    socket.on("connect", handleConnect);
    socket.on(SOCKET_ON.NOTIFICATION_COUNT, handleCount);
    socket.on(SOCKET_ON.NOTIFICATION_NEW, handleNew);
    socket.on(SOCKET_ON.NOTIFICATION_READ, handleRead);
    socket.on(SOCKET_ON.SOCKET_ERROR, handleError);

    // If socket is already connected when this mounts, trigger initial load/sync
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off(SOCKET_ON.NOTIFICATION_COUNT, handleCount);
      socket.off(SOCKET_ON.NOTIFICATION_NEW, handleNew);
      socket.off(SOCKET_ON.NOTIFICATION_READ, handleRead);
      socket.off(SOCKET_ON.SOCKET_ERROR, handleError);
    };
  }, [isAuthenticated, queryClient]);
}

