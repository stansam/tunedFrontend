import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminCategories,
  fetchAdminServices,
  fetchPricingCategories,
} from "../_services/services.service";
import {
  FALLBACK_ADMIN_CATEGORIES,
  FALLBACK_ADMIN_SERVICES,
  FALLBACK_PRICING_CATEGORIES,
} from "../_fallbacks/services.fallback";
import type { ServiceFiltersState } from "../_types/services.types";

export function useServicesQuery(filters: ServiceFiltersState) {
  const categoriesQ = useQuery({
    queryKey: ["admin", "services", "categories"],
    queryFn: async () => {
      const res = await fetchAdminCategories();
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") return FALLBACK_ADMIN_CATEGORIES;
        throw new Error(res.error?.message || "Failed to load categories");
      }
      return res.data;
    },
    staleTime: 30_000,
  });

  const servicesQ = useQuery({
    queryKey: ["admin", "services", "list", filters],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filters.q) params.q = filters.q;
      if (filters.is_active !== "all") params.is_active = filters.is_active;
      if (filters.featured !== "all") params.featured = filters.featured;
      if (filters.category_id !== "all") params.category_id = filters.category_id;

      const res = await fetchAdminServices(params);
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") return FALLBACK_ADMIN_SERVICES;
        throw new Error(res.error?.message || "Failed to load services");
      }
      return res.data;
    },
    staleTime: 15_000,
  });

  const pricingQ = useQuery({
    queryKey: ["admin", "pricing-categories"],
    queryFn: async () => {
      const res = await fetchPricingCategories();
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") return FALLBACK_PRICING_CATEGORIES;
        throw new Error(res.error?.message || "Failed to load pricing tiers");
      }
      return res.data;
    },
    staleTime: 60_000,
  });

  return {
    categories: categoriesQ.data ?? [],
    services: servicesQ.data ?? [],
    pricingCategories: pricingQ.data ?? [],
    isLoading: categoriesQ.isLoading || servicesQ.isLoading || pricingQ.isLoading,
    isError: categoriesQ.isError || servicesQ.isError || pricingQ.isError,
    error: categoriesQ.error || servicesQ.error || pricingQ.error,
  };
}
