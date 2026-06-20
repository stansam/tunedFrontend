"use client";

import type { ReactNode } from "react";
import { PaymentMethodTabs } from "./PaymentMethodTabs";
import { InstantPaymentForm } from "./InstantPaymentForm";
import { DirectTransferPanel } from "./DirectTransferPanel";
import { MobileSubmitButton } from "./MobileSubmitButton";
import { SecurityBadges } from "./SecurityBadges";
import type { ActiveTab, PaymentMethod } from "../_types/checkout.types";
import type { UsePesapalIframeReturn } from "../_hooks/usePesapalIframe";

interface CheckoutLeftPanelProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  instantMethod: PaymentMethod | null;
  directMethod: PaymentMethod | null;
  onInstantSubmit: () => void;
  onDirectSubmit: (ref: string) => void;
  onMobileSubmit: () => void;
  isSubmitting: boolean;
  isDirectSuccess: boolean;
  directPaymentId: string | null;
  isPaid: boolean;
  pesapalIframe: UsePesapalIframeReturn;
}

export function CheckoutLeftPanel({
  activeTab,
  onTabChange,
  instantMethod,
  directMethod,
  onInstantSubmit,
  onDirectSubmit,
  onMobileSubmit,
  isSubmitting,
  isDirectSuccess,
  directPaymentId,
  isPaid,
  pesapalIframe,
}: CheckoutLeftPanelProps): ReactNode {
  if (!instantMethod && !directMethod) {
    return (
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center space-y-2">
        <p className="text-sm font-semibold text-destructive">Payment Unavailable</p>
        <p className="text-xs text-muted-foreground">
          No payment methods are currently available. Please contact support.
        </p>
      </div>
    );
  }

  const methods = [
    ...(instantMethod ? [instantMethod] : []),
    ...(directMethod ? [directMethod] : []),
  ];

  return (
    <div className="space-y-5">
      <PaymentMethodTabs
        methods={methods}
        activeTab={activeTab}
        onTabChange={onTabChange}
        instantMethod={instantMethod}
        directMethod={directMethod}
      />

      {activeTab === "instant" ? (
        <InstantPaymentForm
          onSubmit={onInstantSubmit}
          isSubmitting={isSubmitting}
          pesapalIframe={pesapalIframe}
        />
      ) : (
        <DirectTransferPanel
          method={directMethod}
          onSubmit={onDirectSubmit}
          isSubmitting={isSubmitting}
          isSuccess={isDirectSuccess}
          paymentId={directPaymentId}
        />
      )}

      {pesapalIframe.checkoutState === "idle" && (
        <MobileSubmitButton
          onSubmit={onMobileSubmit}
          isSubmitting={isSubmitting}
          isDisabled={isPaid || isDirectSuccess}
          activeTab={activeTab}
        />
      )}
      <SecurityBadges />
    </div>
  );
}
