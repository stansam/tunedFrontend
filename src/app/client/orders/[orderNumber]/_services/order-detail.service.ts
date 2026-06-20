import { apiGet } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { OrderDetailResponseSchema } from "../_schemas";
import type { OrderDetailResponseDTO } from "../_types";

export async function fetchOrderDetail(
  orderNumber: string,
): Promise<ApiResult<OrderDetailResponseDTO>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[OrderDetailService] Fetching: ${orderNumber}`);
  }

  const result = await apiGet<OrderDetailResponseDTO>(
    `/orders/detail/${encodeURIComponent(orderNumber)}`,
  );

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[OrderDetailService] Error:", result.error);
    }
    return result;
  }

  const parsed = OrderDetailResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[OrderDetailService] Schema violation:",
        parsed.error.format(),
      );
    }
    return {
      ok: false,
      error: {
        message: "Malformed order data received from server.",
        errors: { "": [] },
        status: "PARSE_ERROR",
      },
    };
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[OrderDetailService] OK: ${parsed.data.order_number}`);
  }

  return { ...result, data: parsed.data as OrderDetailResponseDTO };
}
