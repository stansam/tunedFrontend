import { z } from "zod";
import { DeadlineSchema } from "@/lib/schemas/common.schema";

export const CalculatePriceResponseSchema = z.object({
  price_per_page: z.number().nonnegative(),
  page_count: z.number().min(1),
  pages_price: z.number().nonnegative(),
  total_price: z.number().nonnegative(),
  deadline_hours: z.number().positive(),
  selected_deadline: DeadlineSchema,
});

export const Step1Schema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  levelId: z.string().min(1, "Please select a project level"),
  deadlineDate: z.date(),
  deadlineTime: z.string().min(1, "Please select a deadline time"),
  reportType: z.enum(["turnitin", "standard"]).nullable().optional(),
});

export const Step2Schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  wordCount: z.number().int().min(275, "Word count must be at least 275 (1 page)"),
  lineSpacing: z.enum(["double", "single"]),
  formatStyle: z.enum(["APA", "MLA", "Chicago", "Harvard", "Other"]),
  sources: z.number().int().min(0),
  instructions: z.string().min(10, "Please provide some instructions (min 10 characters)"),
  submitLater: z.boolean(),
});

export const CreateOrderResponseSchema = z.object({
  // success: z.boolean(),
  order_id: z.string().uuid(),
  order_number: z.string(),
  // message: z.string().optional(),
});

export const DiscountValidationSchema = z.object({
  valid: z.boolean(),
  discount_amount: z.number().nonnegative(),
  description: z.string().optional(),
});

export const OrderDraftSchema = z.object({
  id: z.string().uuid(),
  updated_at: z.string(),
});
