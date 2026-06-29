import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials, fetchTestimonialServices } from "../_services/testimonials.service";
import { FALLBACK_TESTIMONIALS, FALLBACK_TESTIMONIAL_SERVICES } from "../_fallbacks/testimonials.fallback";

export function useTestimonialsQuery(filters: {
  page: number;
  per_page: number;
  service_id?: string;
  rating?: number;
  status?: string;
  q?: string;
}) {
  return useQuery({
    queryKey: ["admin", "testimonials", "list", filters],
    queryFn: async () => {
      const res = await fetchTestimonials(filters);
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") {
          let filtered = [...FALLBACK_TESTIMONIALS];
          if (filters.service_id) {
            filtered = filtered.filter((t) => t.service_id === filters.service_id);
          }
          if (filters.rating) {
            filtered = filtered.filter((t) => t.rating === filters.rating);
          }
          if (filters.status && filters.status !== "all") {
            const isApproved = filters.status === "approved";
            filtered = filtered.filter((t) => t.is_approved === isApproved);
          }
          if (filters.q) {
            const q = filters.q.toLowerCase();
            filtered = filtered.filter(
              (t) =>
                t.content.toLowerCase().includes(q) ||
                (t.user && t.user.name.toLowerCase().includes(q)) ||
                (t.user && t.user.email.toLowerCase().includes(q))
            );
          }
          const total = filtered.length;
          const start = (filters.page - 1) * filters.per_page;
          return {
            testimonials: filtered.slice(start, start + filters.per_page),
            total,
            page: filters.page,
            per_page: filters.per_page,
          };
        }
        throw new Error(res.error?.message || "Failed to load testimonials");
      }
      return res.data;
    },
    staleTime: 15_000,
  });
}

export function useTestimonialServicesQuery() {
  return useQuery({
    queryKey: ["admin", "testimonials", "services"],
    queryFn: async () => {
      const res = await fetchTestimonialServices();
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") return FALLBACK_TESTIMONIAL_SERVICES;
        throw new Error(res.error?.message || "Failed to load services");
      }
      return res.data;
    },
    staleTime: 30_000,
  });
}
