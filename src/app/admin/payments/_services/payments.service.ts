import { apiPut, apiPost } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { AdminPaymentsListResponseSchema } from "../_schemas/payments.schema";
import type { AdminPaymentsListResponse, PaymentStatus } from "../_types/payments.types";

export async function fetchAdminPayments(
  status: PaymentStatus | "all",
  page: number,
  q?: string
): Promise<ApiResult<AdminPaymentsListResponse>> {
  const reqPayload = {
    status: status === "all" ? null : status,
    q: q || null,
    page: page,
    per_page: 10,
  };

  const res = await apiPost<AdminPaymentsListResponse>(
    "/admin/payments/list",
    reqPayload
  );
  if (!res.ok) return { ok: false, error: res.error };

  const parsed = AdminPaymentsListResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[PaymentsService] Schema violation:", parsed.error.format());
    }
    return { ok: false, error: { message: "Response validation failed", status: 422, errors: {} } };
  }

  return { ok: true, data: parsed.data, message: res.message, status: res.status };
}


export async function verifyPayment(
  paymentId: string
): Promise<ApiResult<{ readonly success: boolean }>> {
  const res = await apiPut<{ readonly success: boolean }>(
    `/payments/verify/${paymentId}`,
    {}
  );
  return res;
}

export async function rejectPayment(
  paymentId: string,
  reason: string
): Promise<ApiResult<{ readonly success: boolean }>> {
  const res = await apiPut<{ readonly success: boolean }>(
    `/payments/reject/${paymentId}`,
    { rejection_reason: reason }
  );
  return res;
}
