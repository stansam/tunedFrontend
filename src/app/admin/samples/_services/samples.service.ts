import { apiGet, apiPost, apiPut, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import * as S from "../_schemas/samples.schema";
import type * as T from "../_types/samples.type";

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

export const fetchSamples = async (p: {
  page: number;
  per_page: number;
  service_id?: string;
  featured?: boolean;
  q?: string;
}): Promise<ApiResult<T.AdminSampleListResponse>> => {
  const query = new URLSearchParams();
  query.append("page", String(p.page));
  query.append("per_page", String(p.per_page));
  if (p.service_id) query.append("service_id", p.service_id);
  if (p.featured !== undefined) query.append("featured", String(p.featured));
  if (p.q) query.append("q", p.q);

  return validate(
    await apiGet(`/admin/samples?${query.toString()}`),
    S.AdminSampleListResponseSchema
  );
};

export const fetchSampleServices = async (): Promise<ApiResult<readonly T.AdminSampleService[]>> =>
  validate(await apiGet("/samples/services"), S.AdminSampleServiceSchema.array());

export const createSample = async (
  d: T.AdminSampleMutation
): Promise<ApiResult<T.AdminSampleResponse>> =>
  validate(await apiPost("/admin/samples", d), S.AdminSampleResponseSchema);

export const updateSample = async (
  id: string,
  d: T.AdminSampleMutation
): Promise<ApiResult<T.AdminSampleResponse>> =>
  validate(await apiPut(`/admin/samples/${id}`, d), S.AdminSampleResponseSchema);

export const deleteSample = async (id: string): Promise<ApiResult<void>> =>
  apiDelete(`/admin/samples/${id}`);
