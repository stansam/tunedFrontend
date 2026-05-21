"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BankDetailsDisplay } from "./BankDetailsDisplay";
import { DirectTransferSuccess } from "./DirectTransferSuccess";
import { DirectTransferSchema, type DirectTransferFormValues } from "../_schemas/checkout.schema";
import type { DirectTransferPanelProps } from "../_props/payment.props";

export function DirectTransferPanel({
  method,
  onSubmit,
  isSuccess,
  paymentId,
}: DirectTransferPanelProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<DirectTransferFormValues>({
    resolver: zodResolver(DirectTransferSchema),
    defaultValues: { proofReference: "" },
  });

  if (isSuccess) {
    return <DirectTransferSuccess paymentId={paymentId} />;
  }

  return (
    <form
      id="direct-transfer-form"
      onSubmit={handleSubmit((v) => onSubmit(v.proofReference))}
      className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5"
      noValidate
      aria-label="Direct transfer payment details"
    >
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Transfer Details</h2>
      </div>

      {method?.details && <BankDetailsDisplay details={method.details} />}

      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
        After completing the transfer, enter your bank transaction reference below.
        Manual verification takes 1–4 business hours.
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="proofReference" className="text-xs font-medium">
          Transaction Reference
        </Label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            id="proofReference"
            {...register("proofReference")}
            placeholder="e.g. TXN-ABC123456"
            className="pl-9 h-11 rounded-lg text-sm font-mono"
            autoComplete="off"
            aria-describedby={errors.proofReference ? "ref-error" : undefined}
          />
        </div>
        {errors.proofReference && (
          <p id="ref-error" role="alert" className="text-xs text-destructive">
            {errors.proofReference.message}
          </p>
        )}
      </div>

    </form>
  );
}
