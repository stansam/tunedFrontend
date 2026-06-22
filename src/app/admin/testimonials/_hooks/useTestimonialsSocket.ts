import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";

export function useTestimonialsSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["admin-nav-stats"] });
    };

    socket.on(SOCKET_ON.ADMIN_TESTIMONIAL_CREATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_TESTIMONIAL_UPDATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_TESTIMONIAL_DELETED, handleUpdate);

    return () => {
      socket.off(SOCKET_ON.ADMIN_TESTIMONIAL_CREATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_TESTIMONIAL_UPDATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_TESTIMONIAL_DELETED, handleUpdate);
    };
  }, [queryClient]);
}
