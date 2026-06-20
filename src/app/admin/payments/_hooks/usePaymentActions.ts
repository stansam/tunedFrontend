"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyPayment, rejectPayment } from "../_services/payments.service";

export function usePaymentActions() {
  const queryClient = useQueryClient();

  const verifyMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      const res = await verifyPayment(paymentId);
      if (!res.ok) throw new Error(res.error?.message || "Failed to verify payment");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Payment verified successfully, order activated");
      queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
      queryClient.invalidateQueries({ queryKey: ["admin-nav-stats"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ paymentId, reason }: { readonly paymentId: string; readonly reason: string }) => {
      const res = await rejectPayment(paymentId, reason);
      if (!res.ok) throw new Error(res.error?.message || "Failed to reject payment");
      return res.data;
    },
    onSuccess: () => {
      toast.success("Payment rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "payments"] });
      queryClient.invalidateQueries({ queryKey: ["admin-nav-stats"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    verifyPayment: verifyMutation.mutateAsync,
    isVerifying: verifyMutation.isPending,
    rejectPayment: rejectMutation.mutateAsync,
    isRejecting: rejectMutation.isPending,
  };
}
