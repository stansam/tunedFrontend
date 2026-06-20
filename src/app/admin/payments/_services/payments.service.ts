import { apiGet, apiPut } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { AdminPaymentsListResponseSchema } from "../_schemas/payments.schema";
import type { AdminPaymentsListResponse, PaymentStatus } from "../_types/payments.types";

interface RawPaginatedPayments {
  readonly success: boolean;
  readonly data: unknown;
  readonly pagination: {
    readonly page: number;
    readonly per_page: number;
    readonly total: number;
  };
}

export async function fetchAdminPayments(
  status: PaymentStatus | "all",
  page: number,
  q?: string
): Promise<ApiResult<AdminPaymentsListResponse>> {
  const params = new URLSearchParams();
  if (status !== "all") params.append("status", status);
  params.append("page", page.toString());
  params.append("per_page", "10");
  if (q) params.append("q", q);

  const res = await apiGet<RawPaginatedPayments>(`/payments?${params.toString()}`);
  if (!res.ok) return { ok: false, error: res.error };

  const raw = res.data;
  if (!raw || !raw.pagination || !Array.isArray(raw.data)) {
    return { ok: false, error: { message: "Invalid API response format", status: 500, errors: {} } };
  }

  const mapped = {
    payments: raw.data,
    total: raw.pagination.total,
    page: raw.pagination.page,
    per_page: raw.pagination.per_page,
  };

  const parsed = AdminPaymentsListResponseSchema.safeParse(mapped);
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
