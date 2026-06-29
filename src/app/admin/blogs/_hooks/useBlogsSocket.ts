import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";

export function useBlogsSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
    };

    socket.on(SOCKET_ON.ADMIN_BLOG_POST_CREATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_BLOG_POST_UPDATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_BLOG_POST_DELETED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_BLOG_POST_PUBLISHED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_BLOG_CATEGORY_CREATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_BLOG_CATEGORY_UPDATED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_BLOG_CATEGORY_DELETED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_BLOG_COMMENT_UPDATED, handleUpdate);

    return () => {
      socket.off(SOCKET_ON.ADMIN_BLOG_POST_CREATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_BLOG_POST_UPDATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_BLOG_POST_DELETED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_BLOG_POST_PUBLISHED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_BLOG_CATEGORY_CREATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_BLOG_CATEGORY_UPDATED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_BLOG_CATEGORY_DELETED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_BLOG_COMMENT_UPDATED, handleUpdate);
    };
  }, [queryClient]);
}
