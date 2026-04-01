"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { fetchServiceCategories, fetchServicesByCategoryId } from "@/lib/services/service.service";
import type { ServiceCategory, Service } from "@/lib/types/service.type";

export interface UseNavbarServicesReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  categories: readonly ServiceCategory[];
  isLoading: boolean;
  activeCategoryId: string | null;
  setActiveCategoryId: (id: string | null) => void;
  activeServices: readonly Service[];
  isServicesLoading: boolean;
  loadingCategoryIds: Set<string>;
  isCategoryLoading: (id: string) => boolean;
  dropdownRef: React.RefObject<HTMLLIElement | null>;
  fetchServicesForCategory: (id: string) => Promise<void>;
}

export function useNavbarServices(): UseNavbarServicesReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<readonly ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [loadingCategoryIds, setLoadingCategoryIds] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    let mounted = true;
    fetchServiceCategories().then((res) => {
      if (mounted && res.ok) {
        setCategories(res.data);
        if (res.data && res.data.length > 0 && res.data[0]) {
          setActiveCategoryId(res.data[0].id);
        }
        setIsLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const isCategoryLoading = useCallback((id: string) => loadingCategoryIds.has(id), [loadingCategoryIds]);

  const fetchServicesForCategory = useCallback(async (id: string) => {
    // Check if we already have services for this category
    const category = categories.find(c => c.id === id);
    if (!id || (category?.services && category.services.length > 0)) {
       return;
    }

    setLoadingCategoryIds(prev => new Set(prev).add(id));
    try {
      const res = await fetchServicesByCategoryId(id);
      if (res.ok) {
        setCategories(prev => prev.map(cat => 
          cat.id === id ? { ...cat, services: res.data } : cat
        ));
      }
    } finally {
      setLoadingCategoryIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, [categories]);

  useEffect(() => {
    if (isOpen && activeCategoryId) {
      fetchServicesForCategory(activeCategoryId);
    }
  }, [isOpen, activeCategoryId, fetchServicesForCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const activeServices = useMemo(() => {
    const activeCategory = categories.find(c => c.id === activeCategoryId);
    return activeCategory?.services || [];
  }, [activeCategoryId, categories]);

  const isServicesLoading = useMemo(() => 
    activeCategoryId ? loadingCategoryIds.has(activeCategoryId) : false,
  [activeCategoryId, loadingCategoryIds]);

  return {
    isOpen,
    setIsOpen,
    toggleDropdown,
    closeDropdown,
    categories,
    isLoading,
    activeCategoryId,
    setActiveCategoryId,
    activeServices,
    isServicesLoading,
    loadingCategoryIds,
    isCategoryLoading,
    dropdownRef,
    fetchServicesForCategory,
  };
}
