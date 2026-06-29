"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export function usePesapalBridge(): void {
  const searchParams = useSearchParams();
  const messageSentRef = useRef<boolean>(false);

  useEffect(() => {
    if (messageSentRef.current) return;
    messageSentRef.current = true;

    const orderTrackingId = searchParams.get("OrderTrackingId") ?? "";
    const orderMerchantReference = searchParams.get("OrderMerchantReference") ?? "";
    const orderPaymentStatus = searchParams.get("OrderPaymentStatus") ?? "";

    const parentOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? window.location.origin;

    const message = {
      type: "pesapal_payment_complete" as const,
      order_tracking_id: orderTrackingId,
      order_merchant_reference: orderMerchantReference,
      order_payment_status: orderPaymentStatus,
    };

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(message, parentOrigin);
    }

    if (window.parent === window) {
      const params = new URLSearchParams({
        OrderTrackingId: orderTrackingId,
        OrderMerchantReference: orderMerchantReference,
      });
      window.location.href = `/order/checkout/callback?${params.toString()}`;
    }
  }, [searchParams]);
}
