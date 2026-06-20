"use client";

import { useState, useCallback } from "react";
import type { PesapalCheckoutState } from "../_types/payment.types";

export interface PesapalIframeState {
  checkoutState: PesapalCheckoutState;
  redirectUrl: string | null;
  trackingId: string | null;
  paymentId: string | null;
  paymentRef: string | null;
}

export interface UsePesapalIframeReturn extends PesapalIframeState {
  onCheckoutSuccess: (data: {
    redirect_url: string;
    order_tracking_id: string;
    payment_id: string;
    payment_ref: string;
  }) => void;
  onBridgeComplete: () => void;
  onCancel: () => void;
  onOrderPaid: () => void;
}

const INITIAL_STATE: PesapalIframeState = {
  checkoutState: "idle",
  redirectUrl: null,
  trackingId: null,
  paymentId: null,
  paymentRef: null,
};

export function usePesapalIframe(): UsePesapalIframeReturn {
  const [state, setState] = useState<PesapalIframeState>(INITIAL_STATE);

  const onCheckoutSuccess = useCallback(
    (data: {
      redirect_url: string;
      order_tracking_id: string;
      payment_id: string;
      payment_ref: string;
    }) => {
      setState({
        checkoutState: "iframe_ready",
        redirectUrl: data.redirect_url,
        trackingId: data.order_tracking_id,
        paymentId: data.payment_id,
        paymentRef: data.payment_ref,
      });
    },
    []
  );

  const onBridgeComplete = useCallback(() => {
    setState((prev) => ({ ...prev, checkoutState: "iframe_complete" }));
  }, []);

  const onCancel = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const onOrderPaid = useCallback(() => {
    setState((prev) => ({ ...prev, checkoutState: "done" }));
  }, []);

  return {
    ...state,
    onCheckoutSuccess,
    onBridgeComplete,
    onCancel,
    onOrderPaid,
  };
}
