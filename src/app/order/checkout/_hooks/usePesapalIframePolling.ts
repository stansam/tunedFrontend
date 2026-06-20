"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrderDetails } from "./useOrderDetails";
import type { UsePesapalIframeReturn } from "./usePesapalIframe";

export function usePesapalIframePolling(
  orderNumber: string,
  pesapalIframe: UsePesapalIframeReturn
): void {
  const router = useRouter();
  const { refetch: refetchOrder } = useOrderDetails(orderNumber);
  const { checkoutState, onOrderPaid, trackingId, paymentRef } = pesapalIframe;

  useEffect(() => {
    if (checkoutState !== "iframe_complete") return;

    let attempts = 0;
    const MAX_ATTEMPTS = 40; // 40 * 3000ms = 2 minutes max
    const INTERVAL_MS = 3000;

    const pollInterval = setInterval(async () => {
      attempts++;
      try {
        const result = await refetchOrder();
        if (result.data?.paid) {
          clearInterval(pollInterval);
          onOrderPaid();
        } else if (attempts >= MAX_ATTEMPTS) {
          clearInterval(pollInterval);
          const params = new URLSearchParams({
            OrderTrackingId: trackingId ?? "",
            OrderMerchantReference: paymentRef ?? "",
          });
          router.push(`/order/checkout/callback?${params.toString()}`);
        }
      } catch (err) {
        console.error("[usePesapalIframePolling] Poll error:", err);
      }
    }, INTERVAL_MS);

    return () => clearInterval(pollInterval);
  }, [checkoutState, onOrderPaid, trackingId, paymentRef, refetchOrder, router]);
}
