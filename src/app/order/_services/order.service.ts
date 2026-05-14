import { apiPost } from "@/api-client";
import type { ApiResult, CalculatePriceRequest } from "@/lib/types";
import {
  CalculatePriceResponseSchema,
  CreateOrderResponseSchema,
  DiscountValidationSchema
} from "../_schemas/order.schema";
import type { 
  CreateOrderResponse, 
  DiscountValidationResult, 
  OrderFormState
} from "../_types/order.types";

export async function calculateOrderPrice(payload: CalculatePriceRequest, signal?: AbortSignal) {
  const res = await apiPost<unknown>("/calculate-price", payload, { signal });
  if (!res.ok) return res;
  const parsed = CalculatePriceResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    return { ok: false, error: { message: "Invalid price response", status: 422, errors: {} } } as ApiResult<never>;
  }
  return { ...res, data: parsed.data };
}

export async function validateDiscount(code: string, subtotal: number): Promise<ApiResult<DiscountValidationResult>> {
  const res = await apiPost<unknown>("/orders/validate-discount", { code, subtotal });
  if (!res.ok) return res;
  const parsed = DiscountValidationSchema.safeParse(res.data);
  if (!parsed.success) {
    return { ok: false, error: { message: "Invalid discount response", status: 422, errors: {} } } as ApiResult<never>;
  }
  return { ...res, data: parsed.data };
}

export async function submitOrder(payload: Record<string, unknown>): Promise<ApiResult<CreateOrderResponse>> {
  const res = await apiPost<unknown>("/orders", payload);
  if (!res.ok) return res;
  const parsed = CreateOrderResponseSchema.safeParse(res.data);
  if (!parsed.success) {
    return { ok: false, error: { message: "Invalid order response", status: 422, errors: {} } } as ApiResult<never>;
  }
  return { ...res, data: parsed.data };
}

export async function uploadOrderFiles(orderId: string, files: File[]) {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));
  return apiPost(`/orders/${orderId}/upload-files`, formData);
}

export async function saveDraft(state: OrderFormState): Promise<ApiResult<{ id: string; updated_at: string }>> {
  const { computeDeadlineISO } = await import("../_utils/order.utils");
  const payload: Record<string, unknown> = {
    service_id: state.step1.serviceId,
    level_id: state.step1.levelId,
    deadline: state.step1.deadlineDate
      ? computeDeadlineISO(state.step1.deadlineDate, state.step1.deadlineTime)
      : undefined,
    report_type: state.step1.reportType,
    title: state.step2.title || undefined,
    word_count: state.step2.wordCount || undefined,
    page_count: state.step2.wordCount
      ? Math.ceil(state.step2.wordCount / 275)
      : undefined,
    line_spacing: state.step2.lineSpacing,
    format_style: state.step2.formatStyle,
    sources: state.step2.sources,
    instructions: state.step2.instructions || undefined,
    discount_code: state.step3.discountCode || undefined,
    points_to_redeem: state.step3.pointsToRedeem || undefined,
  };
  const res = await apiPost<unknown>("/orders/draft", payload);
  if (!res.ok) return res;
  const { OrderDraftSchema } = await import("../_schemas/order.schema");
  const parsed = OrderDraftSchema.safeParse(res.data);
  if (!parsed.success) {
    return { ok: false, error: { message: "Invalid draft response", status: 422, errors: {} } } as ApiResult<never>;
  }
  return { ...res, data: parsed.data };
}
