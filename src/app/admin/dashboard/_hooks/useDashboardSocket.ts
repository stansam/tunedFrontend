"use client";

import { useEffect } from "react";
import { webSocketService } from "@/lib/services/websocket.service";
import { UpcomingDeadlineSchema, ActionableAlertSchema } from "../_schemas/dashboard.schema";
import type { UpcomingDeadline, ActionableAlert } from "../_types/dashboard.types";

export function useDashboardSocket(
  isAuthenticated: boolean,
  onOrderUpdate: (data: UpcomingDeadline) => void,
  onAlertNew: (data: ActionableAlert) => void,
): void {
  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = webSocketService.connect();

    socket.on("admin.order.updated", (raw: unknown) => {
      const parsed = UpcomingDeadlineSchema.safeParse(raw);
      if (parsed.success) {
        onOrderUpdate(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid order payload:", parsed.error.issues);
      }
    });

    socket.on("admin.alert.new", (raw: unknown) => {
      const parsed = ActionableAlertSchema.safeParse(raw);
      if (parsed.success) {
        onAlertNew(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid alert payload:", parsed.error.issues);
      }
    });

    return () => {
      socket.off("admin.order.updated");
      socket.off("admin.alert.new");
      webSocketService.disconnect();
    };
  }, [isAuthenticated, onOrderUpdate, onAlertNew]);
}
