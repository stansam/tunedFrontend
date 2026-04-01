"use client";

import { useState, useEffect, useCallback } from "react";

export interface UseNavbarReturn {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  scrolled: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export function useNavbar(activeRoute: string): UseNavbarReturn {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevRoute, setPrevRoute] = useState(activeRoute);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (activeRoute !== prevRoute) {
    setPrevRoute(activeRoute);
    setMobileOpen(false);
  }

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((o) => !o);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return {
    mobileOpen,
    setMobileOpen,
    scrolled,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
