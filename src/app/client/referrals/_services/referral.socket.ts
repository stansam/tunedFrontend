"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import { PointsUpdatedSchema } from "../_schemas/referral.schema";

export function useReferralSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handlePointsUpdated = (raw: unknown) => {
      const parsed = PointsUpdatedSchema.safeParse(raw);
      if (parsed.success) {
        toast.success(`You earned ${parsed.data.points_earned} referral points!`);
        queryClient.invalidateQueries({ queryKey: ["referrals", "stats"] });
        queryClient.invalidateQueries({ queryKey: ["referrals", "history"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid dashboard:points_updated payload:", parsed.error.issues);
      }
    };

    socket.on(SOCKET_ON.DASHBOARD_POINTS_UPDATED, handlePointsUpdated);

    return () => {
      socket.off(SOCKET_ON.DASHBOARD_POINTS_UPDATED, handlePointsUpdated);
    };
  }, [queryClient]);
}
