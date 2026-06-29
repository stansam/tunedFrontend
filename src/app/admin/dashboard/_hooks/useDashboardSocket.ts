"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import {
  UpcomingDeadlineSchema,
  AdminOrderCreatedSchema,
  AdminPaymentVerificationSchema,
  AdminRevisionRequestedSchema,
  AdminOrderEscalatedSchema,
  AdminExtensionRespondedSchema,
} from "../_schemas/dashboard.schema";
import type { UpcomingDeadline } from "../_types/dashboard.types";

export function useDashboardSocket(
  onOrderStatusChanged: (data: UpcomingDeadline) => void,
): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleOrderStatusChanged = (raw: unknown) => {
      const parsed = UpcomingDeadlineSchema.safeParse(raw);
      if (parsed.success) {
        onOrderStatusChanged(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid admin:order:status_changed payload:", parsed.error.issues);
      }
    };

    const handleOrderCreated = (raw: unknown) => {
      const parsed = AdminOrderCreatedSchema.safeParse(raw);
      if (parsed.success) {
        toast.info(`New Order Placed: #${parsed.data.order_number}`);
        queryClient.invalidateQueries({ queryKey: ["admin", "kpis"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "tracking"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid admin:order:created payload:", parsed.error.issues);
      }
    };

    const handlePaymentVerification = (raw: unknown) => {
      const parsed = AdminPaymentVerificationSchema.safeParse(raw);
      if (parsed.success) {
        toast.info(`Payment verification required for Order #${parsed.data.order_number}`);
        queryClient.invalidateQueries({ queryKey: ["admin", "kpis"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid admin:payment_verification_required payload:", parsed.error.issues);
      }
    };

    const handleRevisionRequested = (raw: unknown) => {
      const parsed = AdminRevisionRequestedSchema.safeParse(raw);
      if (parsed.success) {
        toast.info(`Revision requested for Order #${parsed.data.order_number}`);
        queryClient.invalidateQueries({ queryKey: ["admin", "kpis"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid admin:revision:requested payload:", parsed.error.issues);
      }
    };

    const handleOrderEscalated = (raw: unknown) => {
      const parsed = AdminOrderEscalatedSchema.safeParse(raw);
      if (parsed.success) {
        toast.warning(`Order escalated: #${parsed.data.order_number}`);
        queryClient.invalidateQueries({ queryKey: ["admin", "tracking"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid admin:order:escalated payload:", parsed.error.issues);
      }
    };

    const handleExtensionResponded = (raw: unknown) => {
      const parsed = AdminExtensionRespondedSchema.safeParse(raw);
      if (parsed.success) {
        toast.info(`Extension response received for Order #${parsed.data.order_number}: ${parsed.data.response}`);
        queryClient.invalidateQueries({ queryKey: ["admin", "tracking"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid admin:order:extension_responded payload:", parsed.error.issues);
      }
    };

    socket.on(SOCKET_ON.ADMIN_ORDER_STATUS_CHANGED, handleOrderStatusChanged);
    socket.on(SOCKET_ON.ADMIN_ORDER_CREATED, handleOrderCreated);
    socket.on(SOCKET_ON.ADMIN_PAYMENT_VERIFICATION_REQUIRED, handlePaymentVerification);
    socket.on(SOCKET_ON.ADMIN_REVISION_REQUESTED, handleRevisionRequested);
    socket.on(SOCKET_ON.ADMIN_ORDER_ESCALATED, handleOrderEscalated);
    socket.on(SOCKET_ON.ADMIN_ORDER_EXTENSION_RESPONDED, handleExtensionResponded);

    return () => {
      socket.off(SOCKET_ON.ADMIN_ORDER_STATUS_CHANGED, handleOrderStatusChanged);
      socket.off(SOCKET_ON.ADMIN_ORDER_CREATED, handleOrderCreated);
      socket.off(SOCKET_ON.ADMIN_PAYMENT_VERIFICATION_REQUIRED, handlePaymentVerification);
      socket.off(SOCKET_ON.ADMIN_REVISION_REQUESTED, handleRevisionRequested);
      socket.off(SOCKET_ON.ADMIN_ORDER_ESCALATED, handleOrderEscalated);
      socket.off(SOCKET_ON.ADMIN_ORDER_EXTENSION_RESPONDED, handleExtensionResponded);
    };
  }, [onOrderStatusChanged, queryClient]);
}
