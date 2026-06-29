"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { getSearchResults } from "../_services";
import { SearchParamsSchema } from "../_schemas";
import { ResultType } from "../_types";
import { useSearchTracking } from "@/lib/hooks/useSearchTracking";
import { Route } from "next";

export function useSearchQueryState(slug: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = decodeURIComponent(slug).replace(/-/g, " ");

  const typeParam = searchParams.get("type") || "all";
  const pageParam = searchParams.get("page") || "1";
  const perPageParam = searchParams.get("per_page") || "20";

  const validated = SearchParamsSchema.safeParse({
    type: typeParam,
    page: pageParam,
    per_page: perPageParam,
  });

  const state = validated.success
    ? validated.data
    : { type: "all" as ResultType, page: 1, per_page: 20 };

  const updateState = useCallback(
    (updates: { type?: ResultType; page?: number }) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (updates.type !== undefined) {
        current.set("type", updates.type);
        current.set("page", "1"); // reset page on tab switch
      }
      if (updates.page !== undefined) {
        current.set("page", updates.page.toString());
      }
      router.push(`${pathname}?${current.toString()}` as Route);
    },
    [searchParams, router, pathname]
  );

  return {
    query,
    type: state.type as ResultType,
    page: state.page,
    perPage: state.per_page,
    updateState,
  };
}

export function useSearchResults(query: string, type: ResultType, page: number, perPage: number) {
  const { trackEvent } = useSearchTracking();
  const lastTrackedRef = useRef<string>("");

  const queryResult = useQuery({
    queryKey: ["globalSearch", query, type, page, perPage],
    queryFn: async () => {
      const res = await getSearchResults(query, type, page, perPage);
      if (!res.ok) {
        throw new Error(res.error.message || "Failed to load search results");
      }
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (queryResult.data) {
      const currentTrackKey = `${query}-${type}-${page}-${perPage}`;
      if (lastTrackedRef.current !== currentTrackKey) {
        lastTrackedRef.current = currentTrackKey;
        const total = queryResult.data.counts.total;
        trackEvent(query, total, type, "search_page");
      }
    }
  }, [queryResult.data, trackEvent, query, type, page, perPage]);

  return queryResult;
}
