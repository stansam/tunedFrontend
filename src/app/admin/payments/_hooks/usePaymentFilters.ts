"use client";

import { useState, useCallback, useTransition } from "react";
import type { AdminPaymentFiltersState, PaymentStatus } from "../_types/payments.types";

export function usePaymentFilters() {
  const [, startTransition] = useTransition();
  const [filters, setFilters] = useState<AdminPaymentFiltersState>({
    status: "all",
    q: "",
    page: 1,
  });

  const setStatus = useCallback((status: PaymentStatus | "all") => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, status, page: 1 }));
    });
  }, []);

  const setSearch = useCallback((q: string) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, q, page: 1 }));
    });
  }, []);

  const setPage = useCallback((page: number) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, page }));
    });
  }, []);

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setFilters({ status: "all", q: "", page: 1 });
    });
  }, []);

  return {
    filters,
    setStatus,
    setSearch,
    setPage,
    resetFilters,
  };
}
