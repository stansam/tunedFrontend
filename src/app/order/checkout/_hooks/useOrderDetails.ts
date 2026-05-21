"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetails } from "../_services/checkout.service";
import type { OrderDetails } from "../_types/checkout.types";
import { FALLBACK_ORDER } from "../_fallback/order.fallback";

export const ORDER_QUERY_KEY = (orderNumber: string) =>
  ["checkout", "order", orderNumber] as const;

interface UseOrderDetailsReturn {
  order: OrderDetails | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

export function useOrderDetails(orderNumber: string): UseOrderDetailsReturn {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ORDER_QUERY_KEY(orderNumber),
    queryFn: async () => {
      if (!orderNumber) throw new Error("Order number is required");
      const result = await fetchOrderDetails(orderNumber);
      if (!result.ok) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    enabled: !!orderNumber,
    staleTime: 0,
    refetchOnMount: true,
    retry: 1,
    placeholderData: FALLBACK_ORDER,
  });

  return {
    order: data ?? null,
    isLoading,
    isError,
    error: error instanceof Error ? error.message : null,
  };
}
