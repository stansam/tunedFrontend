import { apiGet, apiPut, apiPatch, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import * as S from "../_schemas/testimonials.schema";
import type * as T from "../_types/testimonials.type";

function validate<Out, In>(
  res: ApiResult<In>,
  schema: { safeParse: (d: In) => { success: boolean; data?: Out } }
): ApiResult<Out> {
  if (!res.ok) return res as unknown as ApiResult<Out>;
  const p = schema.safeParse(res.data);
  if (!p.success) {
    return {
      ok: false,
      error: { message: "Response validation failed", errors: {}, status: 422 },
    };
  }
  return { ...res, data: p.data } as ApiResult<Out>;
}

export const fetchTestimonials = async (p: {
  page: number;
  per_page: number;
  service_id?: string;
  rating?: number;
  status?: string;
  q?: string;
}): Promise<ApiResult<T.AdminTestimonialListResponse>> => {
  const query = new URLSearchParams();
  query.append("page", String(p.page));
  query.append("per_page", String(p.per_page));
  if (p.service_id) query.append("service_id", p.service_id);
  if (p.rating) query.append("rating", String(p.rating));
  if (p.status) query.append("status", p.status);
  if (p.q) query.append("q", p.q);

  return validate(
    await apiGet(`/admin/testimonials?${query.toString()}`),
    S.AdminTestimonialListResponseSchema
  );
};

// TODO: confirm and implement correct endpoint for testimonial services
export const fetchTestimonialServices = async (): Promise<ApiResult<readonly T.AdminTestimonialService[]>> =>
  validate(await apiGet("/samples/services"), S.AdminTestimonialServiceSchema.array());

export const approveTestimonial = async (
  id: string
): Promise<ApiResult<T.AdminTestimonialResponse>> =>
  validate(await apiPatch(`/admin/testimonials/${id}/approve`, {}), S.AdminTestimonialResponseSchema);

export const updateTestimonial = async (
  id: string,
  d: T.AdminTestimonialMutation
): Promise<ApiResult<T.AdminTestimonialResponse>> =>
  validate(await apiPut(`/admin/testimonials/${id}`, d), S.AdminTestimonialResponseSchema);

export const deleteTestimonial = async (id: string): Promise<ApiResult<void>> =>
  apiDelete(`/admin/testimonials/${id}`);
