"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  MilestoneOrderSchema,
  ActionableAlertSchema,
  PaymentUpdatedSchema,
  RefundProcessedSchema,
  RevisionStatusSchema,
  DraftSavedSchema,
  OrderDeliverySchema,
} from "../_schemas/dashboard.schema";
import type { MilestoneOrder, ActionableAlert } from "../_types/dashboard.types";

export function useDashboardSocket(
  onOrderUpdate: (data: MilestoneOrder) => void,
  onAlertNew: (data: ActionableAlert) => void,
): void {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = webSocketService.connect();

    const handleOrderUpdate = (raw: unknown) => {
      const parsed = MilestoneOrderSchema.safeParse(raw);
      if (parsed.success) {
        onOrderUpdate(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid order:updated payload:", parsed.error.issues);
      }
    };

    const handleAlertNew = (raw: unknown) => {
      const parsed = ActionableAlertSchema.safeParse(raw);
      if (parsed.success) {
        onAlertNew(parsed.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid actionable_alert.new payload:", parsed.error.issues);
      }
    };

    const handleRevisionStatusChanged = (raw: unknown) => {
      const parsed = RevisionStatusSchema.safeParse(raw);
      if (parsed.success) {
        toast.info("Revision status updated");
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard", "tracking"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid order:revision:status_changed payload:", parsed.error.issues);
      }
    };

    const handleDraftSaved = (raw: unknown) => {
      const parsed = DraftSavedSchema.safeParse(raw);
      if (parsed.success) {
        toast.info("Draft saved");
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid order:draft_saved payload:", parsed.error.issues);
      }
    };

    const handlePaymentUpdated = (raw: unknown) => {
      const parsed = PaymentUpdatedSchema.safeParse(raw);
      if (parsed.success) {
        toast.info(`Payment status updated to: ${parsed.data.status}`);
        queryClient.invalidateQueries({ queryKey: ["dashboard", "kpis"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid dashboard:payment_updated payload:", parsed.error.issues);
      }
    };

    const handlePaymentVerified = (raw: unknown) => {
      const parsed = PaymentUpdatedSchema.safeParse(raw); // Verified payload matches payment updated
      if (parsed.success) {
        toast.success("Payment verified!");
        queryClient.invalidateQueries({ queryKey: ["dashboard", "kpis"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid dashboard:payment_verified payload:", parsed.error.issues);
      }
    };

    const handleRefundProcessed = (raw: unknown) => {
      const parsed = RefundProcessedSchema.safeParse(raw);
      if (parsed.success) {
        toast.info(`Refund of $${parsed.data.amount} processed`);
        queryClient.invalidateQueries({ queryKey: ["dashboard", "kpis"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid dashboard:refund_processed payload:", parsed.error.issues);
      }
    };

    const handleDeliveryCreated = (raw: unknown) => {
      const parsed = OrderDeliverySchema.safeParse(raw);
      if (parsed.success) {
        toast.success("New delivery ready!");
        queryClient.invalidateQueries({ queryKey: ["dashboard", "tracking"] });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[WebSocket] Invalid order:delivery:created payload:", parsed.error.issues);
      }
    };

    socket.on(SOCKET_ON.ORDER_UPDATED, handleOrderUpdate);
    socket.on(SOCKET_ON.ACTIONABLE_ALERT_NEW, handleAlertNew);
    socket.on(SOCKET_ON.ORDER_REVISION_STATUS, handleRevisionStatusChanged);
    socket.on(SOCKET_ON.ORDER_DRAFT_SAVED, handleDraftSaved);
    socket.on(SOCKET_ON.DASHBOARD_PAYMENT_UPDATED, handlePaymentUpdated);
    socket.on(SOCKET_ON.DASHBOARD_PAYMENT_VERIFIED, handlePaymentVerified);
    socket.on(SOCKET_ON.DASHBOARD_REFUND_PROCESSED, handleRefundProcessed);
    socket.on(SOCKET_ON.DELIVERY_CREATED, handleDeliveryCreated);

    return () => {
      socket.off(SOCKET_ON.ORDER_UPDATED, handleOrderUpdate);
      socket.off(SOCKET_ON.ACTIONABLE_ALERT_NEW, handleAlertNew);
      socket.off(SOCKET_ON.ORDER_REVISION_STATUS, handleRevisionStatusChanged);
      socket.off(SOCKET_ON.ORDER_DRAFT_SAVED, handleDraftSaved);
      socket.off(SOCKET_ON.DASHBOARD_PAYMENT_UPDATED, handlePaymentUpdated);
      socket.off(SOCKET_ON.DASHBOARD_PAYMENT_VERIFIED, handlePaymentVerified);
      socket.off(SOCKET_ON.DASHBOARD_REFUND_PROCESSED, handleRefundProcessed);
      socket.off(SOCKET_ON.DELIVERY_CREATED, handleDeliveryCreated);
      // NOTE: DO NOT call webSocketService.disconnect() here to avoid disconnecting the global socket.
    };
  }, [isAuthenticated, onOrderUpdate, onAlertNew, queryClient]);
}
