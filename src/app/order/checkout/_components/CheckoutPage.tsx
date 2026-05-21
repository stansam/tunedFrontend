"use client";

import { AuthGuard } from "@/lib/auth/Guard";
import { useCheckoutPage } from "../_hooks/useCheckoutPage";
import { CheckoutLeftPanel } from "./CheckoutLeftPanel";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { CheckoutBreadcrumb } from "./CheckoutBreadcrumb";
import { CheckoutSkeleton } from "./skeletons/CheckoutSkeleton";
import type { CheckoutPageClientProps } from "../_props/checkout.props";

function CheckoutContent({ orderNumber, pesapalTrackingId }: CheckoutPageClientProps) {
  const {
    order, orderLoading,
    activeTab, setActiveTab,
    instantMethod, directMethod,
    cardholderName, setCardholderName,
    isSubmitting,
    directSuccess, successPaymentId,
    handleCompletePayment,
    handleDirectSubmit,
  } = useCheckoutPage(orderNumber, pesapalTrackingId);

  return (
    <main className="flex-1 bg-[#e8e6e1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <CheckoutBreadcrumb orderNumber={order?.order_number} />
        <h1 className="text-2xl font-bold text-foreground mb-6">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">
          <CheckoutLeftPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            instantMethod={instantMethod}
            directMethod={directMethod}
            cardholderName={cardholderName}
            onCardholderNameChange={setCardholderName}
            onInstantSubmit={handleCompletePayment}
            onDirectSubmit={handleDirectSubmit}
            onMobileSubmit={handleCompletePayment}
            isSubmitting={isSubmitting}
            isDirectSuccess={directSuccess}
            directPaymentId={successPaymentId}
            isPaid={order?.paid ?? false}
          />

          <div className="lg:sticky lg:top-6">
            <OrderSummaryCard
              order={order}
              isLoading={orderLoading}
              onCompletePayment={handleCompletePayment}
              isSubmitting={isSubmitting}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export function CheckoutPage(props: CheckoutPageClientProps) {
  return (
    <AuthGuard loadingFallback={<CheckoutSkeleton />} unauthenticatedFallback={null}>
      <CheckoutContent {...props} />
    </AuthGuard>
  );
}
