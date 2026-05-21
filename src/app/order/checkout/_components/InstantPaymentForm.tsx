"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SslBadge } from "./SecurityBadges";
import { InstantPaymentSchema, type InstantPaymentFormValues } from "../_schemas/checkout.schema";
import type { InstantPaymentFormProps } from "../_props/payment.props";

export function InstantPaymentForm({
  onSubmit,
  isSubmitting,
  cardholderName,
  onCardholderNameChange,
}: InstantPaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<InstantPaymentFormValues>({
    resolver: zodResolver(InstantPaymentSchema),
    defaultValues: { cardholderName },
  });

  return (
    <form
      id="instant-payment-form"
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5"
      noValidate
      aria-label="Card payment details"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Card Details</h2>
        <SslBadge />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="cardholderName" className="text-xs font-medium">
          Cardholder Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            id="cardholderName"
            {...register("cardholderName", {
              onChange: (e) => onCardholderNameChange(e.target.value),
            })}
            placeholder="John Doe"
            className="pl-9 h-11 rounded-lg text-sm"
            autoComplete="cc-name"
            disabled={isSubmitting}
            aria-describedby={errors.cardholderName ? "name-error" : undefined}
          />
        </div>
        {errors.cardholderName && (
          <p id="name-error" role="alert" className="text-xs text-destructive">
            {errors.cardholderName.message}
          </p>
        )}
      </div>

      <div className="rounded-xl bg-sky-50 border border-sky-200 px-4 py-3 text-xs text-sky-800 leading-relaxed flex items-start gap-2">
        <Lock className="h-4 w-4 mt-0.5 shrink-0 text-sky-600" aria-hidden />
        <span>
          Your card details are entered securely on the Pesapal payment page.
          Clicking <strong>Complete Payment</strong> will redirect you there.
        </span>
      </div>
    </form>
  );
}
