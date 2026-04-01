"use client";

import { useState, useCallback } from "react";

export interface UseMobileServicesReturn {
  openCategoryId: string | null;
  setOpenCategoryId: (id: string | null) => void;
  toggleCategory: (id: string) => void;
  closeAll: () => void;
}

/**
 * Hook for managing mobile service accordion state.
 * Encapsulates the logic for opening and closing categories.
 */
export function useMobileServices(): UseMobileServicesReturn {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const toggleCategory = useCallback((id: string) => {
    setOpenCategoryId((prev) => (prev === id ? null : id));
  }, []);

  const closeAll = useCallback(() => {
    setOpenCategoryId(null);
  }, []);

  return {
    openCategoryId,
    setOpenCategoryId,
    toggleCategory,
    closeAll,
  };
}
