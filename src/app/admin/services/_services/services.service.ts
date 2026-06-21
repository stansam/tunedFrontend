import { apiGet, apiPost, apiPut, apiDelete } from "@/api-client";
import type { ApiResult, CalculatePriceResponse } from "@/lib/types";
import type {
  AdminService,
  AdminServiceCategory,
  PricingCategory,
  CategoryMutationPayload,
  ServiceMutationPayload,
} from "../_types/services.types";

export const fetchAdminCategories = (): Promise<ApiResult<readonly AdminServiceCategory[]>> =>
  apiGet<readonly AdminServiceCategory[]>("/admin/services/categories");

export const createAdminCategory = (
  data: CategoryMutationPayload
): Promise<ApiResult<AdminServiceCategory>> =>
  apiPost<AdminServiceCategory>("/admin/services/categories", data);

export const updateAdminCategory = (
  id: string,
  data: CategoryMutationPayload
): Promise<ApiResult<AdminServiceCategory>> =>
  apiPut<AdminServiceCategory>(`/admin/services/categories/${id}`, data);

export const deleteAdminCategory = (id: string): Promise<ApiResult<void>> =>
  apiDelete<void>(`/admin/services/categories/${id}`);

export const fetchAdminServices = (
  params?: Record<string, string>
): Promise<ApiResult<readonly AdminService[]>> => {
  const query = new URLSearchParams(params).toString();
  return apiGet<readonly AdminService[]>(`/admin/services?${query}`);
};

export const createAdminService = (
  data: ServiceMutationPayload
): Promise<ApiResult<AdminService>> =>
  apiPost<AdminService>("/admin/services", data);

export const updateAdminService = (
  id: string,
  data: ServiceMutationPayload
): Promise<ApiResult<AdminService>> =>
  apiPut<AdminService>(`/admin/services/${id}`, data);

export const deleteAdminService = (id: string): Promise<ApiResult<void>> =>
  apiDelete<void>(`/admin/services/${id}`);

export const fetchPricingCategories = (): Promise<ApiResult<readonly PricingCategory[]>> =>
  apiGet<readonly PricingCategory[]>("/admin/pricing-categories");

export const fetchBasePrice = (
  serviceId: string,
  levelId: string,
  deadlineIso: string
): Promise<ApiResult<CalculatePriceResponse>> =>
  apiPost<CalculatePriceResponse>("/calculate-price", {
    service_id: serviceId,
    level_id: levelId,
    deadline: deadlineIso,
    word_count: 275,
    page_count: 1,
  });
