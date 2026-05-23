"use client";

import { useEffect } from "react";
import { webSocketService } from "@/lib/services/websocket.service";
import { MilestoneOrderSchema, ActionableAlertSchema } from "../_schemas/dashboard.schema";
import type { MilestoneOrder, ActionableAlert } from "../_types/dashboard.types";

export function useDashboardSocket(
  isAuthenticated: boolean,
  onOrderUpdate: (data: MilestoneOrder) => void,
  onAlertNew: (data: ActionableAlert) => void,
): void {
  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = webSocketService.connect();

    socket.on("order.updated", (raw: unknown) => {
      const parsed = MilestoneOrderSchema.safeParse(raw);
      if (parsed.success) {
        onOrderUpdate(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid order payload:", parsed.error.issues);
      }
    });

    socket.on("actionable_alert.new", (raw: unknown) => {
      const parsed = ActionableAlertSchema.safeParse(raw);
      if (parsed.success) {
        onAlertNew(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid alert payload:", parsed.error.issues);
      }
    });

    return () => {
      socket.off("order.updated");
      socket.off("actionable_alert.new");
      webSocketService.disconnect();
    };
  }, [isAuthenticated, onOrderUpdate, onAlertNew]);
}
