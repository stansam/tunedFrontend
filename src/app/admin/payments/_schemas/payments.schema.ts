import { z } from "zod";

export const PaymentStatusSchema = z.enum([
  "pending",
  "pending_verification",
  "completed",
  "failed",
  "refunded",
]);

export const AdminPaymentSchema = z.object({
  id: z.string().uuid(),
  payment_id: z.string(),
  order_id: z.string().uuid(),
  user_id: z.string().uuid(),
  amount: z.coerce.number().nonnegative(),
  status: PaymentStatusSchema,
  accepted_method_id: z.string().uuid(),
  currency: z.string(),
  client_proof_reference: z.string().nullable().optional(),
  pesapal_tracking_id: z.string().nullable().optional(),
  admin_notes: z.string().nullable().optional(),
  client_marked_paid_at: z.string().nullable().optional(),
  admin_verified_at: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  // Enriched relationship fields
  client_name: z.string().nullable().optional(),
  client_email: z.string().nullable().optional(),
  order_number: z.string().nullable().optional(),
  payment_method_name: z.string().nullable().optional(),
  payment_method_category: z.string().nullable().optional(),
});

export const AdminPaymentsListResponseSchema = z.object({
  payments: z.array(AdminPaymentSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  per_page: z.number().int().min(1),
});
