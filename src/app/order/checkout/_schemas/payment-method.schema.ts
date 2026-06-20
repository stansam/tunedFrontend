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

export const OrderDetailsSchema = z.preprocess((val: unknown) => {
  if (!val || typeof val !== "object") return val;
  const obj = val as Record<string, unknown>;

  const total_price = Number(obj.total_price ?? 0);
  const discount_amount = Number(obj.discount_amount ?? 0);
  const tax = Number(obj.tax ?? 0);
  
  // Calculate subtotal if not provided
  const subtotal = obj.subtotal !== undefined ? Number(obj.subtotal) : (total_price + discount_amount);
  
  // Map page_count to pages if pages is undefined
  const pages = obj.pages !== undefined ? Number(obj.pages) : (obj.page_count !== undefined ? Number(obj.page_count) : undefined);

  return {
    ...obj,
    total_price,
    subtotal,
    discount_amount,
    tax,
    pages,
    service_type: obj.service_type ?? obj.service_name,
    academic_level: obj.academic_level ?? obj.academic_level_name,
  };
}, z.object({
  id: z.string(),
  order_number: z.string(),
  total_price: z.number(),
  subtotal: z.number(),
  discount_amount: z.number(),
  tax: z.number().optional(),
  status: z.string(),
  paid: z.boolean(),
  service_type: z.string().optional(),
  pages: z.number().optional(),
  academic_level: z.string().optional(),
}));

export type ValidatedPaymentMethod = z.infer<typeof PaymentMethodSchema>;
export type ValidatedOrderDetails = z.infer<typeof OrderDetailsSchema>;
