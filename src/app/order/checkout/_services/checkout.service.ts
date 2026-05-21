import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { OrderDetailsSchema } from "../_schemas/payment-method.schema";
import type { CheckoutRequestPayload, CheckoutResult } from "../_types/payment.types";
import type { OrderDetails } from "../_types/checkout.types";

const LOG_PREFIX = "[CheckoutService]";

export async function fetchOrderDetails(orderNumber: string): Promise<ApiResult<OrderDetails>> {
  const result = await apiGet<unknown>(`/orders/detail/${orderNumber}`);

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`${LOG_PREFIX} Failed to fetch order ${orderNumber}:`, result.error);
    }
    return result as ApiResult<never>;
  }

  const parsed = OrderDetailsSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`${LOG_PREFIX} Order schema violation:`, parsed.error.format());
      console.error(`${LOG_PREFIX} Raw data:`, result.data);
    }
    return {
      ok: false,
      error: {
        message: "Invalid order response",
        errors: { "": ["Schema validation failed"] },
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data,
    message: result.message,
    status: result.status,
  };
}

export async function fetchOrderDetailsById(orderId: string): Promise<ApiResult<OrderDetails>> {
  const result = await apiGet<unknown>(`/orders/${orderId}`);

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`${LOG_PREFIX} Failed to fetch order by ID ${orderId}:`, result.error);
    }
    return result as ApiResult<never>;
  }

  const parsed = OrderDetailsSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`${LOG_PREFIX} Order schema violation for ID ${orderId}:`, parsed.error.format());
      console.error(`${LOG_PREFIX} Raw data:`, result.data);
    }
    return {
      ok: false,
      error: {
        message: "Invalid order response",
        errors: { "": ["Schema validation failed"] },
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data,
    message: result.message,
    status: result.status,
  };
}

export async function submitCheckout(
  payload: CheckoutRequestPayload
): Promise<ApiResult<CheckoutResult>> {
  if (process.env.NODE_ENV !== "production") {
    console.info(`${LOG_PREFIX} Submitting checkout for order:`, payload.order_id);
  }

  const result = await apiPost<CheckoutResult>("/payments/checkout", payload);

  if (!result.ok && process.env.NODE_ENV !== "production") {
    console.error(`${LOG_PREFIX} Checkout failed:`, result.error);
  }

  return result;
}
