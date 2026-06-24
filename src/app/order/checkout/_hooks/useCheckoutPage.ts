"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePaymentMethods } from "./usePaymentMethods";
import { useOrderDetails } from "./useOrderDetails";
import { useCheckout } from "./useCheckout";
import { usePesapalIframe } from "./usePesapalIframe";
import { usePesapalIframePolling } from "./usePesapalIframePolling";
import { getInstantMethod, getDirectTransferMethod, getMethodIdForTab, resolveActiveTab } from "../_utils/payment.utils";
import type { ActiveTab } from "../_types/checkout.types";

export function useCheckoutPage(orderNumber: string) {
  const router = useRouter();
  const [activeTabState, setActiveTab] = useState<ActiveTab>("instant");
  const [directSuccess, setDirectSuccess] = useState(false);
  const [successPaymentId, setSuccessPaymentId] = useState<string | null>(null);

  const { methods } = usePaymentMethods();
  const { order } = useOrderDetails(orderNumber);
  const instantMethod = getInstantMethod(methods);
  const directMethod = getDirectTransferMethod(methods);
  const activeTab = resolveActiveTab(activeTabState, instantMethod, directMethod);

  const pesapalIframe = usePesapalIframe();
  usePesapalIframePolling(orderNumber, pesapalIframe);

  const { submit, isSubmitting } = useCheckout({
    onManualSuccess: (pid) => { setDirectSuccess(true); setSuccessPaymentId(pid); router.refresh(); },
    onPesapalRedirect: (data) => pesapalIframe.onCheckoutSuccess(data),
  });

  const handleCompletePayment = useCallback(() => {
    if (!order) return;
    const methodId = getMethodIdForTab(activeTab, instantMethod, directMethod);
    if (!methodId) return;
    const formId = activeTab === "instant" ? "instant-payment-form" : "direct-transfer-form";
    document.getElementById(formId)?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }, [order, activeTab, instantMethod, directMethod]);

  const handleInstantSubmit = useCallback(() => {
    if (order && instantMethod?.id) submit({ order_id: order.id, payment_method_id: instantMethod.id });
  }, [order, instantMethod, submit]);

  const handleDirectSubmit = useCallback((proofRef: string) => {
    if (order && directMethod?.id) submit({ order_id: order.id, payment_method_id: directMethod.id, client_proof_reference: proofRef });
  }, [order, directMethod, submit]);

  return {
    order,
    activeTab,
    setActiveTab,
    instantMethod,
    directMethod,
    isSubmitting,
    directSuccess,
    successPaymentId,
    handleCompletePayment,
    handleInstantSubmit,
    handleDirectSubmit,
    pesapalIframe,
  };
}
