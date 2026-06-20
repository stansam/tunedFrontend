import type { OrderDetails } from "../_types/checkout.types";

export const FALLBACK_ORDER: OrderDetails = {
  id: "",
  order_number: "—",
  total_price: 0,
  subtotal: 0,
  discount_amount: 0,
  tax: 0,
  status: "pending",
  paid: false,
};
