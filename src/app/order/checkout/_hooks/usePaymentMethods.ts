"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPaymentMethods } from "../_services/payment-methods.service";
import type { PaymentMethod } from "../_types/checkout.types";

export const PAYMENT_METHODS_QUERY_KEY = ["checkout", "payment-methods"] as const;

interface UsePaymentMethodsReturn {
  methods: PaymentMethod[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

export function usePaymentMethods(): UsePaymentMethodsReturn {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: PAYMENT_METHODS_QUERY_KEY,
    queryFn: async () => {
      const result = await fetchPaymentMethods();
      if (!result.ok) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    placeholderData: [],
  });

  return {
    methods: data ?? [],
    isLoading,
    isError,
    error: error instanceof Error ? error.message : null,
  };
}
