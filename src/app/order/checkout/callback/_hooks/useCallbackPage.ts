"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetailsById, resolvePaymentReference } from "../../_services/checkout.service";

export const ORDER_BY_ID_QUERY_KEY = (orderId: string) => ["order", "id", orderId];

const INITIAL_INTERVAL_MS = 2000;
const BACKOFF_MULTIPLIER = 1.5;
const INTERVAL_STEP = 5; // increase interval every N polls
const MAX_INTERVAL_MS = 10000;
const MAX_POLL_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export function useCallbackPage(paymentRef: string) {
  const [resolvedOrderUuid, setResolvedOrderUuid] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState<number>(0);
  const [pollStartTime] = useState<number>(() => Date.now());
  const [timedOut, setTimedOut] = useState<boolean>(false);

  const { data: result, isLoading, error, refetch } = useQuery({
    queryKey: ORDER_BY_ID_QUERY_KEY(paymentRef),
    queryFn: async () => {
      let targetOrderUuid = resolvedOrderUuid;
      if (!targetOrderUuid) {
        const resolveRes = await resolvePaymentReference(paymentRef);
        if (!resolveRes.ok) {
          throw new Error(resolveRes.error.message);
        }
        if (!resolveRes.data?.order_id) {
          throw new Error("Failed to resolve payment reference");
        }
        targetOrderUuid = resolveRes.data.order_id;
        setResolvedOrderUuid(targetOrderUuid);
      }

      const res = await fetchOrderDetailsById(targetOrderUuid);
      if (!res.ok) {
        throw new Error(res.error.message);
      }
      setPollCount((c) => c + 1);
      return res.data;
    },
    refetchInterval: (query) => {
      const order = query.state.data;

      if (order?.paid) return false;

      if (Date.now() - pollStartTime >= MAX_POLL_DURATION_MS) {
        setTimedOut(true);
        return false;
      }

      const steps = Math.floor(pollCount / INTERVAL_STEP);
      const interval = Math.min(
        INITIAL_INTERVAL_MS * Math.pow(BACKOFF_MULTIPLIER, steps),
        MAX_INTERVAL_MS
      );
      return interval;
    },
    staleTime: 0,
    gcTime: 0,
  });

  return {
    order: result ?? null,
    isLoading,
    isError: !!error,
    error: error instanceof Error ? error.message : "Failed to verify payment status",
    timedOut,
    refetch,
  };
}
