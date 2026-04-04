"use client";

import { useState, useCallback, useEffect, useRef, useTransition } from "react";
import { fetchBlogs } from "@/lib/services/blog.service";
import { ALL_CATEGORY } from "../_types/blog.types";
import type { 
  BlogCategory, 
  BlogsPageResponse, 
  BlogFilters, 
  BlogSortField, 
  BlogSortOrder 
} from "../_types/blog.types";
import type { UseBlogsReturnProps } from "../_props/blog.props";

export function useBlogs(
  initialResponse: BlogsPageResponse,
  initialFilters:  BlogFilters,
  initialCategories: readonly BlogCategory[]
): UseBlogsReturnProps {
  const [response, setResponse] = useState<BlogsPageResponse>(initialResponse);
  const [filters,  setFilters]  = useState<BlogFilters>(initialFilters);
  const [,        setPageNum]  = useState(initialResponse.pagination.page);
  const [isPending, startTransition] = useTransition();
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAndUpdate = useCallback((newFilters: BlogFilters, newPage: number) => {
    startTransition(async () => {
      const result = await fetchBlogs({
        q:           newFilters.search,
        category_id: newFilters.categoryId,
        sort:        newFilters.sort,
        order:       newFilters.order,
        page:        newPage,
        per_page:    12,
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

  const setCategory = useCallback((id: string) => {
    const next = { ...filters, categoryId: id };
    setFilters(next);
    setPageNum(1);
    fetchAndUpdate(next, 1);
  }, [filters, fetchAndUpdate]);

  const setSort = useCallback((field: BlogSortField) => {
    const next = { ...filters, sort: field };
    setFilters(next);
    setPageNum(1);
    fetchAndUpdate(next, 1);
  }, [filters, fetchAndUpdate]);

  const toggleOrder = useCallback(() => {
    const nextOrder: BlogSortOrder = filters.order === "asc" ? "desc" : "asc";
    const next = { ...filters, order: nextOrder };
    setFilters(next);
    setPageNum(1);
    fetchAndUpdate(next, 1);
  }, [filters, fetchAndUpdate]);

  const setPage = useCallback((num: number) => {
    setPageNum(num);
    fetchAndUpdate(filters, num);
    // Scroll to grid top
    const grid = document.getElementById("blogs-grid-top");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [filters, fetchAndUpdate]);

  const clearFilters = useCallback(() => {
    const reset = {
      search: "",
      categoryId: ALL_CATEGORY,
      sort: "published_at" as const,
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
    categories: initialCategories,
    setSearch,
    setCategory,
    setSort,
    toggleOrder,
    setPage,
    clearFilters,
  };
}
