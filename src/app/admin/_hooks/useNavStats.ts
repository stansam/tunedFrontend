"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminNavStats } from "../_services/nav.service";
import type { AdminNavStats } from "../_types/nav.type";

const FALLBACK: AdminNavStats = {
  active_orders_count: 0,
  payments_count: 0,
  chat_count: 0,
  testimonials_count: 0,
};

export function useNavStats(): AdminNavStats {
  const { data } = useQuery<AdminNavStats>({
    queryKey: ["admin-nav-stats"],
    queryFn: async () => {
      const res = await fetchAdminNavStats();
      if (!res.ok) return FALLBACK;
      return res.data ?? FALLBACK;
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
  });
  return data ?? FALLBACK;
}
