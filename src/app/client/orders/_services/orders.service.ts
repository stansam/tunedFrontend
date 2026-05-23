import { apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { OrderListResponseSchema } from "../_schemas";
import type { OrderListRequestDTO, OrderListResponseDTO } from "../_types";

const ORDERS_LIST_PATH = "/orders/list";

export async function fetchClientOrders(
  req: OrderListRequestDTO,
): Promise<ApiResult<OrderListResponseDTO>> {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[OrdersService] fetchClientOrders →", req);
  }

  const result = await apiPost<OrderListResponseDTO>(ORDERS_LIST_PATH, req);

  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[OrdersService] fetchClientOrders ✗", result.error);
    }
    return result;
  }

  const parsed = OrderListResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[OrdersService] Response schema violation:",
        parsed.error.format(),
      );
    }
    return {
      ok: false,
      error: {
        message: "Received malformed orders data from server.",
        errors: { "": [] },
        status: "PARSE_ERROR",
      },
    };
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug(
      `[OrdersService] fetchClientOrders ✓ total=${parsed.data.total}`,
    );
  }

  return { ...result, data: parsed.data as OrderListResponseDTO };
}

export async function requestReorder(orderId: string): Promise<ApiResult<{ redirect_url: string }>> {
  return apiPost<{ redirect_url: string }>(`/orders/${orderId}/reorder`, {});
}
