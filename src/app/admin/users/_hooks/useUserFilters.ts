"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { UserFiltersState, StatusFilter, SortField, SortOrder } from "../_types";
import { useDebounce } from "@/lib/hooks/index.hook";

const DEFAULT_SORT: SortField = "total_spent";
const DEFAULT_ORDER: SortOrder = "desc";

export function parseFiltersFromParams(params: URLSearchParams): UserFiltersState {
  return {
    status: (params.get("status") as StatusFilter) || "all",
    q: params.get("q") || "",
    sort: (params.get("sort") as SortField) || DEFAULT_SORT,
    sortOrder: (params.get("sortOrder") as SortOrder) || DEFAULT_ORDER,
    page: Math.max(1, Number(params.get("page")) || 1),
  };
}

export function useUserFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters = parseFiltersFromParams(searchParams);

  const pushParams = useCallback(
    (updates: Partial<UserFiltersState>) => {
      const merged = { ...filters, ...updates };
      const params = new URLSearchParams();
      if (merged.status !== "all") params.set("status", merged.status);
      if (merged.q) params.set("q", merged.q);
      if (merged.sort !== DEFAULT_SORT) params.set("sort", merged.sort);
      if (merged.sortOrder !== DEFAULT_ORDER) params.set("sortOrder", merged.sortOrder);
      if (merged.page > 1) params.set("page", String(merged.page));
      const qs = params.toString();
      if (qs === searchParams.toString()) return;
      startTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ""}` as never, { scroll: false });
      });
    },
    [filters, pathname, router, searchParams]
  );

  const debouncedPushParams = useDebounce(pushParams, 350);

  const setStatus = useCallback(
    (status: StatusFilter) => pushParams({ status, page: 1 }),
    [pushParams]
  );
  const setSearch = useCallback(
    (q: string) => debouncedPushParams({ q, page: 1 }),
    [debouncedPushParams]
  );
  const setSort = useCallback(
    (sort: SortField, sortOrder: SortOrder) => pushParams({ sort, sortOrder, page: 1 }),
    [pushParams]
  );
  const setPage = useCallback(
    (page: number) => pushParams({ page }),
    [pushParams]
  );
  const clearFilters = useCallback(
    () => pushParams({ status: "all", q: "", page: 1 }),
    [pushParams]
  );

  return { filters, setStatus, setSearch, setSort, setPage, clearFilters, isPending };
}
