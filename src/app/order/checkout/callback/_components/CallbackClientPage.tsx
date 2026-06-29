"use client";

import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import { useCallbackPage } from "../_hooks/useCallbackPage";
import { apiGet } from "@/api-client";
import { CallbackLoadingState } from "./CallbackLoadingState";
import { CallbackErrorState } from "./CallbackErrorState";
import { CallbackProcessingState } from "./CallbackProcessingState";
import { CallbackSuccessState } from "./CallbackSuccessState";
import type { ApiResult } from "@/lib/types";

interface PaymentItem {
  id: string;
  order_id: string;
}

interface CallbackClientPageProps {
  orderId: string;
  trackingId: string;
}

export function CallbackClientPage({
  orderId,
  trackingId,
}: CallbackClientPageProps): ReactNode {
  const { order, isLoading, isError, error, timedOut } = useCallbackPage(orderId);
  const [paymentUuid, setPaymentUuid] = useState<string | null>(null);
  const fetchingRef = useRef<boolean>(false);

  useEffect(() => {
    if (order?.paid && !paymentUuid && !fetchingRef.current) {
      fetchingRef.current = true;
      apiGet<PaymentItem>(`/payments/order/${order.id}`)
        .then((res: ApiResult<PaymentItem>) => {
          if (res.ok && res.data?.id) {
            setPaymentUuid(res.data.id);
          }
        })
        .catch((err) => {
          console.error("[CallbackClientPage] Failed to fetch payment for order:", err);
        })
        .finally(() => {
          fetchingRef.current = false;
        });
    }
  }, [order, paymentUuid]);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (isLoading) {
    return <CallbackLoadingState trackingId={trackingId} />;
  }

  if (isError || !order) {
    return <CallbackErrorState error={error} trackingId={trackingId} />;
  }

  if (!order.paid) {
    return (
      <CallbackProcessingState
        orderNumber={order.order_number}
        trackingId={trackingId}
        timedOut={timedOut}
      />
    );
  }

  return (
    <CallbackSuccessState order={order} paymentUuid={paymentUuid} apiBaseUrl={apiBaseUrl} />
  );
}
