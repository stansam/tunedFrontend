"use client";

import { useState, useCallback } from "react";
import { fetchServicesByCategoryId } from "@/lib/services/service.service";

export interface UseMobileServicesReturn {
  openCategoryId: string | null;
  setOpenCategoryId: (id: string | null) => void;
  toggleCategory: (id: string, hasServices?: boolean) => Promise<void>;
  closeAll: () => void;
  loadingCategories: Set<string>;
  isCategoryLoading: (id: string) => boolean;
}

export function useMobileServices(): UseMobileServicesReturn {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState<Set<string>>(new Set());

  const isCategoryLoading = useCallback((id: string) => loadingCategories.has(id), [loadingCategories]);

  const toggleCategory = useCallback(async (id: string, hasServices: boolean = false) => {
    const isOpening = openCategoryId !== id;
    setOpenCategoryId((prev) => (prev === id ? null : id));

    if (isOpening && !hasServices) {
      setLoadingCategories((prev) => new Set(prev).add(id));
      try {
        await fetchServicesByCategoryId(id);
      } finally {
        setLoadingCategories((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    }
  }, [openCategoryId]);

  const closeAll = useCallback(() => {
    setOpenCategoryId(null);
  }, []);

  return {
    openCategoryId,
    setOpenCategoryId,
    toggleCategory,
    closeAll,
    loadingCategories,
    isCategoryLoading,
  };
}
