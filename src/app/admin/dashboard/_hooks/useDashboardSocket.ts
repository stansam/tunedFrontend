"use client";

import { useEffect } from "react";
import { webSocketService } from "@/lib/services/websocket.service";
import { UpcomingDeadlineSchema, ActionableAlertSchema } from "../_schemas/dashboard.schema";
import type { UpcomingDeadline, ActionableAlert } from "../_types/dashboard.types";

export function useDashboardSocket(
  onOrderUpdate: (data: UpcomingDeadline) => void,
  onAlertNew: (data: ActionableAlert) => void,
): void {
  useEffect(() => {
    const socket = webSocketService.connect();

    const handleOrderUpdate = (raw: unknown) => {
      const parsed = UpcomingDeadlineSchema.safeParse(raw);
      if (parsed.success) {
        onOrderUpdate(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid order payload:", parsed.error.issues);
      }
    };

    const handleAlertNew = (raw: unknown) => {
      const parsed = ActionableAlertSchema.safeParse(raw);
      if (parsed.success) {
        onAlertNew(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid alert payload:", parsed.error.issues);
      }
    };

    socket.on("admin.order.status_changed", handleOrderUpdate);
    socket.on("admin.alert.new", handleAlertNew);

    return () => {
      socket.off("admin.order.status_changed", handleOrderUpdate);
      socket.off("admin.alert.new", handleAlertNew);
    };
  }, [onOrderUpdate, onAlertNew]);
}
