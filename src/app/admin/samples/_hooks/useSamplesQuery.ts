import { useQuery } from "@tanstack/react-query";
import { fetchSamples, fetchSampleServices } from "../_services/samples.service";
import { FALLBACK_SAMPLES, FALLBACK_SAMPLE_SERVICES } from "../_fallbacks/samples.fallback";

export function useSamplesQuery(filters: {
  page: number;
  per_page: number;
  service_id?: string;
  featured?: boolean;
  q?: string;
}) {
  return useQuery({
    queryKey: ["admin", "samples", "list", filters],
    queryFn: async () => {
      const res = await fetchSamples(filters);
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") {
          let filtered = [...FALLBACK_SAMPLES];
          if (filters.service_id) {
            filtered = filtered.filter((s) => s.service_id === filters.service_id);
          }
          if (filters.featured !== undefined) {
            filtered = filtered.filter((s) => s.featured === filters.featured);
          }
          if (filters.q) {
            const query = filters.q.toLowerCase();
            filtered = filtered.filter(
              (s) =>
                s.title.toLowerCase().includes(query) ||
                s.excerpt.toLowerCase().includes(query)
            );
          }
          const total = filtered.length;
          const start = (filters.page - 1) * filters.per_page;
          const paginated = filtered.slice(start, start + filters.per_page);

          return {
            samples: paginated,
            total,
            page: filters.page,
            per_page: filters.per_page,
          };
        }
        throw new Error(res.error?.message || "Failed to load samples");
      }
      return res.data;
    },
    staleTime: 15_000,
  });
}

export function useSampleServicesQuery() {
  return useQuery({
    queryKey: ["admin", "samples", "services"],
    queryFn: async () => {
      const res = await fetchSampleServices();
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") return FALLBACK_SAMPLE_SERVICES;
        throw new Error(res.error?.message || "Failed to load sample services");
      }
      return res.data;
    },
    staleTime: 30_000,
  });
}
