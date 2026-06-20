"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { AdminOrderFiltersState, AdminOrderStatus } from "../_types/orders.types";
import { useDebounce } from "@/lib/hooks/index.hook";

export function parseFiltersFromParams(params: URLSearchParams): AdminOrderFiltersState {
  return {
    status: (params.get("status") as AdminOrderStatus | "all") || "all",
    q: params.get("q") || "",
    sort: (params.get("sort") as "created_at" | "due_date" | "title") || "created_at",
    sortOrder: (params.get("sortOrder") as "asc" | "desc") || "desc",
    page: Math.max(1, Number(params.get("page")) || 1),
    service_id: params.get("service_id") || "all",
  };
}

export function useOrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const filters = parseFiltersFromParams(searchParams);

  const pushParams = useCallback(
    (updates: Partial<AdminOrderFiltersState>) => {
      const merged = { ...filters, ...updates };
      const params = new URLSearchParams();
      if (merged.status !== "all") params.set("status", merged.status);
      if (merged.q) params.set("q", merged.q);
      if (merged.sort !== "created_at") params.set("sort", merged.sort);
      if (merged.sortOrder !== "desc") params.set("sortOrder", merged.sortOrder);
      if (merged.page > 1) params.set("page", String(merged.page));
      if (merged.service_id !== "all") params.set("service_id", merged.service_id);
      
      const qs = params.toString();
      if (qs === searchParams.toString()) return;
      startTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ""}` as never, { scroll: false });
      });
    },
    [filters, pathname, router, searchParams]
  );

  const debouncedPushParams = useDebounce(pushParams, 400);

  return {
    filters,
    isPending,
    setStatus: useCallback((status: AdminOrderStatus | "all") => pushParams({ status, page: 1 }), [pushParams]),
    setSearch: useCallback((q: string) => debouncedPushParams({ q, page: 1 }), [debouncedPushParams]),
    setSort: useCallback((sort: "created_at" | "due_date" | "title", sortOrder: "asc" | "desc") => pushParams({ sort, sortOrder, page: 1 }), [pushParams]),
    setPage: useCallback((page: number) => pushParams({ page }), [pushParams]),
    setService: useCallback((service_id: string) => pushParams({ service_id, page: 1 }), [pushParams]),
    clearFilters: useCallback(() => pushParams({ status: "all", q: "", service_id: "all", page: 1 }), [pushParams]),
  };
}
