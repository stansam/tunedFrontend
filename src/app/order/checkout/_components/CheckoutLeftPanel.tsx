"use client";

import { PaymentMethodTabs } from "./PaymentMethodTabs";
import { InstantPaymentForm } from "./InstantPaymentForm";
import { DirectTransferPanel } from "./DirectTransferPanel";
import { MobileSubmitButton } from "./MobileSubmitButton";
import { SecurityBadges } from "./SecurityBadges";
import type { ActiveTab, PaymentMethod } from "../_types/checkout.types";

interface CheckoutLeftPanelProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  instantMethod: PaymentMethod | null;
  directMethod: PaymentMethod | null;
  cardholderName: string;
  onCardholderNameChange: (v: string) => void;
  onInstantSubmit: () => void;
  onDirectSubmit: (ref: string) => void;
  onMobileSubmit: () => void;
  isSubmitting: boolean;
  isDirectSuccess: boolean;
  directPaymentId: string | null;
  isPaid: boolean;
}

export function CheckoutLeftPanel({
  activeTab,
  onTabChange,
  instantMethod,
  directMethod,
  cardholderName,
  onCardholderNameChange,
  onInstantSubmit,
  onDirectSubmit,
  onMobileSubmit,
  isSubmitting,
  isDirectSuccess,
  directPaymentId,
  isPaid,
}: CheckoutLeftPanelProps) {
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

  return (
    <div className="space-y-5">
      <PaymentMethodTabs
        methods={[...(instantMethod ? [instantMethod] : []), ...(directMethod ? [directMethod] : [])]}
        activeTab={activeTab}
        onTabChange={onTabChange}
        instantMethod={instantMethod}
        directMethod={directMethod}
      />

      {activeTab === "instant" ? (
        <InstantPaymentForm
          onSubmit={onInstantSubmit}
          isSubmitting={isSubmitting}
          cardholderName={cardholderName}
          onCardholderNameChange={onCardholderNameChange}
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

      <MobileSubmitButton
        onSubmit={onMobileSubmit}
        isSubmitting={isSubmitting}
        isDisabled={isPaid || isDirectSuccess}
        activeTab={activeTab}
      />
      <SecurityBadges />
    </div>
  );
}
