import { apiGet } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { PaymentMethodsResponseSchema } from "../_schemas/payment-method.schema";
import type { PaymentMethod } from "../_types/checkout.types";

const LOG_PREFIX = "[PaymentMethodsService]";

export async function fetchPaymentMethods(): Promise<ApiResult<PaymentMethod[]>> {
  const result = await apiGet<unknown>("/payments/methods");

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`${LOG_PREFIX} Failed to fetch payment methods:`, result.error);
    }
    return result as ApiResult<never>;
  }

  const parsed = PaymentMethodsResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`${LOG_PREFIX} Schema violation:`, parsed.error.format());
    }
    return {
      ok: false,
      error: {
        message: "Invalid payment methods response",
        errors: { "": ["Schema validation failed"] },
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data as PaymentMethod[],
    message: result.message,
    status: result.status,
  };
}
