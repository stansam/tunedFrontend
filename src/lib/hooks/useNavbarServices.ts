"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchServiceCategories } from "@/lib/services/service.service";
import type { ServiceCategory } from "@/lib/types/service.type";

export interface UseNavbarServicesReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  categories: readonly ServiceCategory[];
  isLoading: boolean;
  activeCategoryId: string | null;
  setActiveCategoryId: (id: string | null) => void;
  dropdownRef: React.RefObject<HTMLLIElement | null>;
}

export function useNavbarServices(): UseNavbarServicesReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<readonly ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
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

  return {
    isOpen,
    setIsOpen,
    toggleDropdown,
    closeDropdown,
    categories,
    isLoading,
    activeCategoryId,
    setActiveCategoryId,
    dropdownRef,
  };
}
