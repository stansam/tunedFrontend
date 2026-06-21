import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";

export function useServiceSockets() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "services"] });
    };

    socket.on(SOCKET_ON.ADMIN_CATEGORY_CREATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_CATEGORY_UPDATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_CATEGORY_DELETED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_SERVICE_CREATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_SERVICE_UPDATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_SERVICE_DELETED, handleUpdate);

    return () => {
      socket.off(SOCKET_ON.ADMIN_CATEGORY_CREATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_CATEGORY_UPDATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_CATEGORY_DELETED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_SERVICE_CREATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_SERVICE_UPDATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_SERVICE_DELETED, handleUpdate);
    };
  }, [queryClient]);
}
