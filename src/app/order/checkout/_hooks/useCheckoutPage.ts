"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { usePaymentMethods } from "./usePaymentMethods";
import { useOrderDetails, ORDER_QUERY_KEY } from "./useOrderDetails";
import { useCheckout } from "./useCheckout";
import { getInstantMethod, getDirectTransferMethod, getMethodIdForTab, resolveActiveTab } from "../_utils/payment.utils";
import type { ActiveTab } from "../_types/checkout.types";

export function useCheckoutPage(orderNumber: string, pesapalTrackingId?: string) {
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [activeTabState, setActiveTab] = useState<ActiveTab>("instant");
  const [cardholderName, setCardholderName] = useState<string>(user?.name ?? "");
  const [directSuccess, setDirectSuccess] = useState(false);
  const [successPaymentId, setSuccessPaymentId] = useState<string | null>(null);

  const { methods } = usePaymentMethods();
  const { order, isLoading: orderLoading } = useOrderDetails(orderNumber);
  const instantMethod = getInstantMethod(methods);
  const directMethod = getDirectTransferMethod(methods);

  const activeTab = resolveActiveTab(activeTabState, instantMethod, directMethod);

  // Invalidate order details if we are returning from a Pesapal redirect
  useEffect(() => {
    if (pesapalTrackingId && orderNumber) {
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY(orderNumber) });
    }
  }, [pesapalTrackingId, orderNumber, queryClient]);

  const { submit, isSubmitting } = useCheckout({
    onPesapalRedirect: () => {},
    onManualSuccess: (pid) => {
      setDirectSuccess(true);
      setSuccessPaymentId(pid);
      router.refresh();
    },
  });

  const handleCompletePayment = useCallback(() => {
    if (!order) return;
    const methodId = getMethodIdForTab(activeTab, instantMethod, directMethod);
    if (!methodId) return;
    if (activeTab === "instant") {
      submit({ order_id: order.id, payment_method_id: methodId });
      return;
    }
    document
      .getElementById("direct-transfer-form")
      ?.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }, [order, activeTab, instantMethod, directMethod, submit]);

  const handleDirectSubmit = useCallback((proofReference: string) => {
    if (!order || !directMethod?.id) return;
    submit({
      order_id: order.id,
      payment_method_id: directMethod.id,
      client_proof_reference: proofReference,
    });
  }, [order, directMethod, submit]);

  return {
    order, orderLoading,
    activeTab, setActiveTab,
    instantMethod, directMethod,
    cardholderName, setCardholderName,
    isSubmitting,
    directSuccess, successPaymentId,
    handleCompletePayment,
    handleDirectSubmit,
  };
}
