import type { OrderOptions } from "../_types/order.types";
import type { CalculatePriceResponse } from "@/lib/types";

export const FALLBACK_ORDER_OPTIONS: OrderOptions = {
  services: [
    { id: "s1", name: "Academic Writing", category: "Writing", pricing_category: "writing" },
    { id: "s2", name: "Technical Report", category: "Technical", pricing_category: "technical" },
    { id: "s3", name: "Proofreading", category: "Editing", pricing_category: "proofreading" },
  ],
  levels: [
    { id: "l1", name: "Undergraduate", order: 1 },
    { id: "l2", name: "Bachelor", order: 2 },
    { id: "l3", name: "Professional", order: 3 },
  ],
};

export const FALLBACK_ORDER_PRICE: CalculatePriceResponse = {
  price_per_page: 12.99,
  page_count: 1,
  pages_price: 12.99,
  total_price: 12.99,
  deadline_hours: 24,
  selected_deadline: { id: "d1", name: "24 Hours", hours: 24, order: 1 },
};

export const FALLBACK_DISCOUNT_RESULT = {
  valid: true,
  discount_amount: 5.0,
  description: "Dev Fallback Discount",
};
