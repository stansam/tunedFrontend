import { apiGet, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { OrderDetailsSchema } from "../_schemas/payment-method.schema";
import type { CheckoutRequestPayload, CheckoutResult } from "../_types/payment.types";
import type { OrderDetails, ResolvedPayment } from "../_types/checkout.types";

const LOG_PREFIX = "[CheckoutService]";

function parseAndValidateOrder(
  result: Extract<ApiResult<unknown>, { ok: true }>,
  context: string
): ApiResult<OrderDetails> {
  const parsed = OrderDetailsSchema.safeParse(result.data);
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`${LOG_PREFIX} Order schema violation for ${context}:`, parsed.error.format(), result.data);
    }
    return {
      ok: false,
      error: { message: "Invalid order response", errors: { "": ["Schema validation failed"] }, status: "PARSE_ERROR" }
    };
  }
  return { ok: true, data: parsed.data, message: result.message, status: result.status };
}

export async function fetchOrderDetails(orderNumber: string): Promise<ApiResult<OrderDetails>> {
  const result = await apiGet<unknown>(`/orders/detail/${orderNumber}`);
  if (!result.ok) return result as ApiResult<never>;
  return parseAndValidateOrder(result, orderNumber);
}

export async function fetchOrderDetailsById(orderId: string): Promise<ApiResult<OrderDetails>> {
  const result = await apiGet<unknown>(`/orders/${orderId}`);
  if (!result.ok) return result as ApiResult<never>;
  return parseAndValidateOrder(result, orderId);
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

export async function resolvePaymentReference(paymentRef: string): Promise<ApiResult<ResolvedPayment>> {
  return apiGet<ResolvedPayment>(`/payments/resolve/${paymentRef}`);
}

