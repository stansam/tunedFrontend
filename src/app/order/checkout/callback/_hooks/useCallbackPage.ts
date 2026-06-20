"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetailsById } from "../../_services/checkout.service";

export const ORDER_BY_ID_QUERY_KEY = (orderId: string) => ["order", "id", orderId];

export function useCallbackPage(orderId: string) {
  const { data: result, isLoading, error, refetch } = useQuery({
    queryKey: ORDER_BY_ID_QUERY_KEY(orderId),
    queryFn: async () => {
      const res = await fetchOrderDetailsById(orderId);
      if (!res.ok) {
        throw new Error(res.error.message);
      }
      return res.data;
    },
    // Poll for status reconciliation while the payment is not verified yet
    refetchInterval: (query) => {
      const order = query.state.data;
      if (order && order.paid) {
        return false; // Stop polling once paid
      }
      return 1500; // Poll every 1.5s
    },
    staleTime: 0,
    gcTime: 0,
  });

  return {
    order: result ?? null,
    isLoading,
    isError: !!error,
    error: error instanceof Error ? error.message : "Failed to verify payment status",
    refetch,
  };
}
