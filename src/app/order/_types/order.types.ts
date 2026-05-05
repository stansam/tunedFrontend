import { z } from "zod";
import * as schemas from "../_schemas/order.schema";
import type { ServiceWithPricingCategory, Level } from "@/lib/types";

export type CategoryTab = "writing" | "technical" | "proofreading";

export interface OrderFormStep1 {
  serviceId: string | null;
  levelId: string | null;
  deadlineDate: Date | null;
  deadlineTime: string; // HH:mm format
  reportType: "turnitin" | "standard" | null;
}

export interface OrderFormStep2 {
  title: string;
  wordCount: number;
  lineSpacing: "double" | "single";
  formatStyle: "APA" | "MLA" | "Chicago" | "Harvard" | "Other";
  sources: number;
  instructions: string;
  files: File[];
  submitLater: boolean;
}

export interface OrderFormStep3 {
  discountCode: string;
  pointsToRedeem: number;
}

export interface OrderFormState {
  step: 1 | 2 | 3;
  step1: OrderFormStep1;
  step2: OrderFormStep2;
  step3: OrderFormStep3;
}

export interface OrderPriceState {
  subtotal: number;
  total: number;
  discountAmount: number;
  pointsDiscount: number;
  isPriceLoading: boolean;
  priceError: string | null;
  priceDetails: z.infer<typeof schemas.CalculatePriceResponseSchema> | null;
}

export interface OrderOptions {
  services: ServiceWithPricingCategory[];
  levels: Level[];
}

export type CreateOrderResponse = z.infer<typeof schemas.CreateOrderResponseSchema>;
export type DiscountValidationResult = z.infer<typeof schemas.DiscountValidationSchema>;
