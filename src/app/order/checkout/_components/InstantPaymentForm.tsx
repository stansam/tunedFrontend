"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, CreditCard } from "lucide-react";
import { SslBadge } from "./SecurityBadges";
import { PesapalIframe } from "./PesapalIframe";
import { InstantPaymentSchema, type InstantPaymentFormValues } from "../_schemas/checkout.schema";
import type { ExtendedInstantPaymentFormProps } from "../_props/payment.props";

export function InstantPaymentForm({
  onSubmit,
  pesapalIframe,
}: ExtendedInstantPaymentFormProps): ReactNode {
  const { handleSubmit } = useForm<InstantPaymentFormValues>({
    resolver: zodResolver(InstantPaymentSchema),
    defaultValues: {},
  });

  const { checkoutState, redirectUrl, onBridgeComplete, onCancel } = pesapalIframe;

  if (checkoutState === "iframe_ready" || checkoutState === "iframe_complete") {
    if (!redirectUrl) return null;
    return (
      <PesapalIframe
        redirectUrl={redirectUrl}
        onComplete={onBridgeComplete}
        onCancel={onCancel}
      />
    );
  }

  if (checkoutState === "done") return null;

  return (
    <form
      id="instant-payment-form"
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5"
      noValidate
      aria-label="Card payment intent confirmation"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-foreground">Card Payment</h2>
        </div>
        <SslBadge />
      </div>

      <div className="rounded-xl bg-sky-50 border border-sky-200 px-4 py-3 text-xs text-sky-800 leading-relaxed flex items-start gap-2">
        <Lock className="h-4 w-4 mt-0.5 shrink-0 text-sky-600" aria-hidden="true" />
        <span>
          Clicking <strong>Complete Payment</strong> will open the secure Pesapal payment form
          directly on this page. Your card details are handled exclusively by Pesapal —
          we never see or store them.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Accepted:</span>
        <span className="text-xs font-medium text-foreground">Visa · Mastercard · M-Pesa</span>
      </div>

      <button type="submit" className="sr-only" aria-hidden="true" tabIndex={-1}>
        Submit
      </button>
    </form>
  );
}
