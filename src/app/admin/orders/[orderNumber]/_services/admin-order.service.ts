import { apiGet } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { AdminOrderDetailSchema } from "../_schemas";
import type { AdminOrderDetailDTO } from "../_types";

export async function fetchAdminOrderDetail(
  orderNumber: string,
): Promise<ApiResult<AdminOrderDetailDTO>> {
  const result = await apiGet<AdminOrderDetailDTO>(
    `/admin/orders/detail/${encodeURIComponent(orderNumber)}`,
  );

  if (!result.ok) return result;

  const parsed = AdminOrderDetailSchema.safeParse(result.data);
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[AdminOrderDetailService] Schema error:", parsed.error.format());
    }
    return {
      ok: false,
      error: {
        message: "Malformed order detail data received from server.",
        errors: { "": [] },
        status: "PARSE_ERROR",
      },
    };
  }

  return { ...result, data: parsed.data as AdminOrderDetailDTO };
}
