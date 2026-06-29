"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import { AdminUserRegisteredSchema } from "../_schemas";

export function useUsersSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleUserRegistered = (raw: unknown) => {
      const parsed = AdminUserRegisteredSchema.safeParse(raw);
      if (parsed.success) {
        toast.info(`New user registered: ${parsed.data.user_id}`);
        void queryClient.invalidateQueries({ queryKey: ["admin-users-stats"] });
        void queryClient.invalidateQueries({ queryKey: ["admin-users-list"] });
        void queryClient.invalidateQueries({ queryKey: ["admin-users-geography"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid admin:user:registered payload:", parsed.error.issues);
      }
    };

    socket.on(SOCKET_ON.ADMIN_USER_REGISTERED, handleUserRegistered);

    return () => {
      socket.off(SOCKET_ON.ADMIN_USER_REGISTERED, handleUserRegistered);
    };
  }, [queryClient]);
}
