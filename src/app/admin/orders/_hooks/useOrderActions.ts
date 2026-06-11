"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { assignWriter, escalateOrder } from "../_services/orders.service";

export function useOrderActions() {
  const queryClient = useQueryClient();

  const assignMutation = useMutation({
    mutationFn: async ({ orderId, writerId }: { readonly orderId: string; readonly writerId: string }) => {
      const res = await assignWriter(orderId, writerId);
      if (!res.ok) throw new Error(res.error?.message ?? "Failed to assign writer");
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Writer assigned successfully");
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
    assignWriter: assignMutation.mutate,
    isAssigning: assignMutation.isPending,
    escalateOrder: escalateMutation.mutate,
    isEscalating: escalateMutation.isPending,
  };
}
