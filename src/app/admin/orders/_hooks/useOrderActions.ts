"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { activateOrder, escalateOrder } from "../_services/orders.service";

export function useOrderActions() {
  const queryClient = useQueryClient();

  const activateMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const res = await activateOrder(orderId);
      if (!res.ok) throw new Error(res.error?.message ?? "Failed to activate order");
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Order activated successfully");
      void queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-orders-stats"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const escalateMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const res = await escalateOrder(orderId);
      if (!res.ok) throw new Error(res.error?.message ?? "Failed to escalate order");
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Order escalated successfully");
      void queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      void queryClient.invalidateQueries({ queryKey: ["admin-orders-stats"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    activateOrder: activateMutation.mutate,
    isActivating: activateMutation.isPending,
    escalateOrder: escalateMutation.mutate,
    isEscalating: escalateMutation.isPending,
  };
}
