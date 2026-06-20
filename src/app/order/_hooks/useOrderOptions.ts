"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOptions } from "@/lib/services/quote.service";
import { FALLBACK_ORDER_OPTIONS } from "../_fallback/order.fallback";
import type { OrderOptions } from "../_types/order.types";

export function useOrderOptions() {
  const query = useQuery({
    queryKey: ["order", "options"],
    queryFn: async () => {
      const res = await fetchOptions();
      if (!res.ok) {
        if (process.env.NODE_ENV === "development") return FALLBACK_ORDER_OPTIONS;
        throw new Error(res.error.message);
      }
      return {
        services: res.data.services,
        levels: res.data.levels,
      } as OrderOptions;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    options: query.data ?? FALLBACK_ORDER_OPTIONS,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
