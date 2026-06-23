import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import type { NotificationItem } from "@/lib/types/notification.type";

export function useNotificationSocket(
  isAuthenticated: boolean,
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>
) {
  const queryClient = useQueryClient();

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
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setUnreadCount((prev) => prev + 1);

      const msg = notification.message;
      if (notification.type === "success") toast.success(notification.title, { description: msg });
      else if (notification.type === "warning") toast.warning(notification.title, { description: msg });
      else if (notification.type === "error") toast.error(notification.title, { description: msg });
      else toast.info(notification.title, { description: msg });

      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch((e) => console.warn("Audio play blocked:", e));
    };

    const handleRead = (_data: { notification_id: string }) => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setUnreadCount((prev) => Math.max(0, prev - 1));
    };

    const handleError = (err: unknown) => {
      if (process.env.NODE_ENV !== "production") console.error("[WebSocket error]", err);
    };

    socket.on(SOCKET_ON.NOTIFICATION_COUNT, handleCount);
    socket.on(SOCKET_ON.NOTIFICATION_NEW, handleNew);
    socket.on(SOCKET_ON.NOTIFICATION_READ, handleRead);
    socket.on(SOCKET_ON.SOCKET_ERROR, handleError);

    return () => {
      socket.off(SOCKET_ON.NOTIFICATION_COUNT, handleCount);
      socket.off(SOCKET_ON.NOTIFICATION_NEW, handleNew);
      socket.off(SOCKET_ON.NOTIFICATION_READ, handleRead);
      socket.off(SOCKET_ON.SOCKET_ERROR, handleError);
    };
  }, [isAuthenticated, queryClient, setUnreadCount]);
}
