import { z } from "zod";

export const MethodCategorySchema = z.enum([
  "credit_card",
  "bank_transfer",
  "digital_wallet",
  "crypto",
  "other",
]);

export const PaymentMethodSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: MethodCategorySchema,
  details: z.string().nullable(),
  is_active: z.boolean(),
});

export const PaymentMethodsResponseSchema = z.array(PaymentMethodSchema);

export const OrderItemSchema = z.object({
  service_type: z.string().optional(),
  pages: z.number().optional(),
  academic_level: z.string().optional(),
});

export const OrderDetailsSchema = z.object({
  id: z.string(),
  order_number: z.string(),
  total_price: z.union([z.string(), z.number()]).transform(Number),
  subtotal: z.union([z.string(), z.number()]).transform(Number),
  discount_amount: z.union([z.string(), z.number()]).transform(Number),
  tax: z.union([z.string(), z.number()]).transform(Number).optional(),
  status: z.string(),
  paid: z.boolean(),
  service_type: z.string().optional(),
  pages: z.number().optional(),
  academic_level: z.string().optional(),
});

export type ValidatedPaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type ValidatedOrderDetails = z.infer<typeof OrderDetailsSchema>;
