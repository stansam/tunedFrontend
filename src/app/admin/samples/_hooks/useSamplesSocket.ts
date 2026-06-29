import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";

export function useSamplesSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "samples"] });
    };

    socket.on(SOCKET_ON.ADMIN_SAMPLE_CREATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_SAMPLE_UPDATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_SAMPLE_DELETED, handleUpdate);

    return () => {
      socket.off(SOCKET_ON.ADMIN_SAMPLE_CREATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_SAMPLE_UPDATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_SAMPLE_DELETED, handleUpdate);
    };
  }, [queryClient]);
}
