"use client";

import { useState, useMemo, useCallback, useEffect, useRef, useTransition } from "react";
import { fetchSamples } from "@/lib/services/samples.service";
import { ALL_SERVICE } from "../_types/samples.types";
import type { 
  SampleService, 
  SamplesPageResponse, 
  SampleFilters, 
  SortField, 
  SortOrder 
} from "../_types/samples.types";
import type { UseSamplesReturnProps } from "../_props/samples.props";

export function useSamples(
  initialResponse: SamplesPageResponse,
  initialFilters:  SampleFilters
): UseSamplesReturnProps {
  const [response, setResponse] = useState<SamplesPageResponse>(initialResponse);
  const [filters,  setFilters]  = useState<SampleFilters>(initialFilters);
  const [,         setPageNum]  = useState(initialResponse.pagination.page);
  const [isPending, startTransition] = useTransition();
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const services = useMemo(() => {
    const map = new Map<string, SampleService>();
    response.data.forEach(item => {
      if (item.service) map.set(item.service.id, item.service);
    });
    return Array.from(map.values());
  }, [response.data]);

  const fetchAndUpdate = useCallback((newFilters: SampleFilters, newPage: number) => {
    startTransition(async () => {
      const result = await fetchSamples({
        q: newFilters.search,
        service_id: newFilters.serviceId,
        sort: newFilters.sort,
        order: newFilters.order,
        page: newPage,
        per_page: 12,
      });

      if (result.ok) {
        setResponse(result.data);
      }
    });
  }, []);

  const setSearch = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPageNum(1);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      fetchAndUpdate({ ...filters, search: value }, 1);
    }, 300);
  }, [filters, fetchAndUpdate]);

  const setService = useCallback((id: string) => {
    const next = { ...filters, serviceId: id };
    setFilters(next);
    setPageNum(1);
    fetchAndUpdate(next, 1);
  }, [filters, fetchAndUpdate]);

  const setSort = useCallback((field: SortField) => {
    const next = { ...filters, sort: field };
    setFilters(next);
    setPageNum(1);
    fetchAndUpdate(next, 1);
  }, [filters, fetchAndUpdate]);

  const toggleOrder = useCallback(() => {
    const nextOrder: SortOrder = filters.order === "asc" ? "desc" : "asc";
    const next = { ...filters, order: nextOrder };
    setFilters(next);
    setPageNum(1);
    fetchAndUpdate(next, 1);
  }, [filters, fetchAndUpdate]);

  const setPage = useCallback((num: number) => {
    setPageNum(num);
    fetchAndUpdate(filters, num);
    // Scroll to grid top
    const grid = document.getElementById("samples-grid-top");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [filters, fetchAndUpdate]);

  const clearFilters = useCallback(() => {
    const reset = {
      search: "",
      serviceId: ALL_SERVICE,
      sort: "created_at" as const,
      order: "desc" as const,
    };
    setFilters(reset);
    setPageNum(1);
    fetchAndUpdate(reset, 1);
  }, [fetchAndUpdate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  return {
    filters,
    response,
    isLoading: isPending,
    services,
    setSearch,
    setService,
    setSort,
    toggleOrder,
    setPage,
    clearFilters,
  };
}
