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
  dropdownRef: React.RefObject<HTMLLIElement | null>;
  fetchServicesForCategory: (id: string) => Promise<void>;
}

export function useNavbarServices(): UseNavbarServicesReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<readonly ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [fetchedServices, setFetchedServices] = useState<Record<string, readonly Service[]>>({});
  const [isServicesLoading, setIsServicesLoading] = useState(false);
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

  const fetchServicesForCategory = useCallback(async (id: string) => {
    if (fetchedServices[id] || !id) return;

    setIsServicesLoading(true);
    try {
      const res = await fetchServicesByCategoryId(id);
      if (res.ok) {
        setFetchedServices(prev => ({ ...prev, [id]: res.data }));
        // Also update the categories state to ensure MobileServicesMenu (which receives categories prop) has the data
        setCategories(prev => prev.map(cat => 
          cat.id === id ? { ...cat, services: res.data } : cat
        ));
      }
    } finally {
      setIsServicesLoading(false);
    }
  }, [fetchedServices]);

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

  const activeServices = useMemo(() => 
    activeCategoryId ? (fetchedServices[activeCategoryId] || []) : [], 
  [activeCategoryId, fetchedServices]);

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
    dropdownRef,
    fetchServicesForCategory,
  };
}
