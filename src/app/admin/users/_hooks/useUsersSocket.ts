"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { webSocketService } from "@/lib/services/websocket.service";

export function useUsersSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleUserRegistered = () => {
      // Invalidate queries to update live stats and client lists
      void queryClient.invalidateQueries({ queryKey: ["admin-users-stats"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-users-list"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-users-geography"] });
    };

    socket.on("admin.user.registered", handleUserRegistered);

    return () => {
      socket.off("admin.user.registered", handleUserRegistered);
    };
  }, [queryClient]);
}
