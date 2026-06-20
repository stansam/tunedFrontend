"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitCheckout } from "../_services/checkout.service";
import type { CheckoutRequestPayload, CheckoutResult } from "../_types/payment.types";

const LOG_PREFIX = "[useCheckout]";

interface UseCheckoutOptions {
  onManualSuccess: (paymentId: string) => void;
  onPesapalRedirect: (data: {
    redirect_url: string;
    order_tracking_id: string;
    payment_id: string;
    payment_ref: string;
  }) => void;
}

interface UseCheckoutReturn {
  submit: (payload: CheckoutRequestPayload) => void;
  isSubmitting: boolean;
}

export function useCheckout(options: UseCheckoutOptions): UseCheckoutReturn {
  const { onManualSuccess, onPesapalRedirect } = options;

  const { mutate, isPending } = useMutation<
    CheckoutResult,
    Error,
    CheckoutRequestPayload
  >({
    mutationFn: async (payload) => {
      const result = await submitCheckout(payload);
      if (!result.ok) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    onSuccess: (data) => {
      if (data.action === "redirect" && data.redirect_url) {
        if (process.env.NODE_ENV !== "production") {
          console.info(`${LOG_PREFIX} Pesapal redirect URL received:`, data.redirect_url);
        }
        onPesapalRedirect({
          redirect_url: data.redirect_url,
          order_tracking_id: data.order_tracking_id ?? "",
          payment_id: data.payment_id ?? "",
          payment_ref: data.payment_ref ?? "",
        });
      } else if (data.action === "manual" && data.status === "pending_verification") {
        toast.success("Payment proof submitted! Awaiting admin verification.");
        onManualSuccess(data.payment_id ?? "");
      } else {
        console.warn(`${LOG_PREFIX} Unexpected checkout response:`, data);
        toast.error("Unexpected response from server. Please check your payment status.");
      }
    },
    onError: (err) => {
      if (process.env.NODE_ENV !== "production") {
        console.error(`${LOG_PREFIX} Checkout error:`, err);
      }
      const userMessage = err.message.includes("gateway")
        ? "Payment gateway unavailable. Please try again in a moment."
        : "Checkout failed. Please try again or contact support.";
      toast.error(userMessage);
    },
  });

  return { submit: mutate, isSubmitting: isPending };
}
