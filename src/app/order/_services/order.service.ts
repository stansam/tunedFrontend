import { apiPost } from "@/api-client";
import type { ApiResult, CalculatePriceRequest } from "@/lib/types";
import {
  CalculatePriceResponseSchema,
  CreateOrderResponseSchema,
  DiscountValidationSchema
} from "../_schemas/order.schema";
import type { 
  CreateOrderResponse, 
  DiscountValidationResult 
} from "../_types/order.types";

export async function calculateOrderPrice(payload: CalculatePriceRequest) {
  const res = await apiPost<unknown>("/calculate-price", payload);
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
  return apiPost(`/orders/${orderId}/upload-files`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
}
