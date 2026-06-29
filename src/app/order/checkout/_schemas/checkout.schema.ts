import { z } from "zod";

export const InstantPaymentSchema = z.object({});

export type InstantPaymentFormValues = z.infer<typeof InstantPaymentSchema>;

export const DirectTransferSchema = z.object({
  proofReference: z
    .string()
    .min(3, "Reference must be at least 3 characters")
    .max(255, "Reference is too long")
    .regex(
      /^[a-zA-Z0-9\-_/]+$/,
      "Reference can only contain letters, numbers, hyphens, underscores, and slashes"
    ),
});

export type DirectTransferFormValues = z.infer<typeof DirectTransferSchema>;

export const CheckoutRequestSchema = z.object({
  order_id: z.string().uuid("Invalid order ID"),
  payment_method_id: z.string().uuid("Invalid payment method ID"),
  client_proof_reference: z.string().optional(),
});

export type CheckoutRequestValues = z.infer<typeof CheckoutRequestSchema>;
