"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminUsers,
  fetchAdminUsersStats,
  fetchAdminUsersGeography,
} from "../_services/users.service";
import type { UserFiltersState } from "../_types";
import { DEFAULT_PER_PAGE } from "../_fallbacks";

export function useUsersStats() {
  return useQuery({
    queryKey: ["admin-users-stats"],
    queryFn: async () => {
      const res = await fetchAdminUsersStats();
      if (!res.ok) throw new Error(res.error?.message ?? "Failed to fetch stats");
      return res.data;
    },
    staleTime: 60_000,
  });
}

export function useUsersList(filters: UserFiltersState) {
  return useQuery({
    queryKey: ["admin-users-list", filters.q, filters.status, filters.sort, filters.sortOrder, filters.page],
    queryFn: async () => {
      const res = await fetchAdminUsers({
        q: filters.q || null,
        status: filters.status === "all" ? null : filters.status,
        sort: filters.sort,
        order: filters.sortOrder,
        page: filters.page,
        per_page: DEFAULT_PER_PAGE,
      });
      if (!res.ok) throw new Error(res.error?.message ?? "Failed to fetch clients");
      return res.data;
    },
    staleTime: 30_000,
  });
}

export function useUsersGeography() {
  return useQuery({
    queryKey: ["admin-users-geography"],
    queryFn: async () => {
      const res = await fetchAdminUsersGeography();
      if (!res.ok) throw new Error(res.error?.message ?? "Failed to fetch geography");
      return res.data;
    },
    staleTime: 60_000,
  });
}
