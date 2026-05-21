"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitCheckout } from "../_services/checkout.service";
import type { CheckoutRequestPayload } from "../_types/payment.types";
import type { CheckoutResult } from "../_types/payment.types";

const LOG_PREFIX = "[useCheckout]";

interface UseCheckoutOptions {
  onPesapalRedirect: (redirectUrl: string) => void;
  onManualSuccess: (paymentId: string) => void;
}

interface UseCheckoutReturn {
  submit: (payload: CheckoutRequestPayload) => void;
  isSubmitting: boolean;
}

export function useCheckout(options: UseCheckoutOptions): UseCheckoutReturn {
  const { onPesapalRedirect, onManualSuccess } = options;

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
        toast.success("Redirecting to secure payment page…");
        if (process.env.NODE_ENV !== "production") {
          console.info(`${LOG_PREFIX} Redirecting to Pesapal:`, data.redirect_url);
        }
        window.location.href = data.redirect_url;
        onPesapalRedirect(data.redirect_url);
      } else if (data.action === "manual" && data.status === "pending_verification") {
        toast.success("Payment proof submitted! Awaiting verification.");
        onManualSuccess(data.payment_id ?? "");
      }
    },
    onError: (err) => {
      if (process.env.NODE_ENV !== "production") {
        console.error(`${LOG_PREFIX} Checkout error:`, err);
      }
      toast.error(err.message || "Checkout failed. Please try again.");
    },
  });

  return { submit: mutate, isSubmitting: isPending };
}
