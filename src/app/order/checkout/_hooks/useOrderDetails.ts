"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import type { QueryObserverResult } from "@tanstack/react-query";
import { fetchOrderDetails } from "../_services/checkout.service";
import type { OrderDetails } from "../_types/checkout.types";

export const ORDER_QUERY_KEY = (orderNumber: string) =>
  ["checkout", "order", orderNumber] as const;

interface UseOrderDetailsReturn {
  order: OrderDetails;
  refetch: () => Promise<QueryObserverResult<OrderDetails, Error>>;
}

export function useOrderDetails(orderNumber: string): UseOrderDetailsReturn {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ORDER_QUERY_KEY(orderNumber),
    queryFn: async () => {
      if (!orderNumber) throw new Error("Order number is required");
      const result = await fetchOrderDetails(orderNumber);
      if (!result.ok) {
        throw new Error(result.error.message);
      }
      return result.data;
    },
    staleTime: 0,
    retry: 1,
  });

  return {
    order: data,
    refetch,
  };
}
