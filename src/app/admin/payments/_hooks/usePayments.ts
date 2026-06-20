"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchAdminPayments } from "../_services/payments.service";
import { FALLBACK_ADMIN_PAYMENTS } from "../_fallbacks/payments.fallback";
import { webSocketService } from "@/lib/services/websocket.service";
import { SOCKET_ON } from "@/lib/constants/socket-events";
import type { AdminPaymentFiltersState, AdminPaymentsListResponse } from "../_types/payments.types";

export function usePayments(filters: AdminPaymentFiltersState) {
  const queryClient = useQueryClient();

  const query = useQuery<AdminPaymentsListResponse>({
    queryKey: ["admin", "payments", filters.status, filters.page, filters.q],
    queryFn: async () => {
      const res = await fetchAdminPayments(filters.status, filters.page, filters.q);
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") {
          return {
            payments: FALLBACK_ADMIN_PAYMENTS,
            total: FALLBACK_ADMIN_PAYMENTS.length,
            page: 1,
            per_page: 10,
          };
        }
        throw new Error(res.error?.message || "Failed to load payments");
      }
      return res.data;
    },
    staleTime: 10_000,
    gcTime: 300_000,
  });

  useEffect(() => {
    const socket = webSocketService.connect();

    const handleUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
      queryClient.invalidateQueries({ queryKey: ["admin-nav-stats"] });
    };

    const handleVerificationRequired = (raw: unknown) => {
      handleUpdate();
      const payload = raw as { readonly order_number?: string } | null;
      toast.info(`Manual payment proof uploaded for Order #${payload?.order_number || ""}`);
    };

    socket.on(SOCKET_ON.DASHBOARD_PAYMENT_UPDATED, handleUpdate);
    socket.on(SOCKET_ON.DASHBOARD_PAYMENT_VERIFIED, handleUpdate);
    socket.on(SOCKET_ON.DASHBOARD_REFUND_PROCESSED, handleUpdate);
    socket.on(SOCKET_ON.ADMIN_PAYMENT_VERIFICATION_REQUIRED, handleVerificationRequired);

    return () => {
      socket.off(SOCKET_ON.DASHBOARD_PAYMENT_UPDATED, handleUpdate);
      socket.off(SOCKET_ON.DASHBOARD_PAYMENT_VERIFIED, handleUpdate);
      socket.off(SOCKET_ON.DASHBOARD_REFUND_PROCESSED, handleUpdate);
      socket.off(SOCKET_ON.ADMIN_PAYMENT_VERIFICATION_REQUIRED, handleVerificationRequired);
    };
  }, [queryClient]);

  return query;
}
