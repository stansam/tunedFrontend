"use client";

import type { ReactNode } from "react";
import { AuthGuard } from "@/lib/auth/Guard";
import { useCheckoutPage } from "../_hooks/useCheckoutPage";
import { CheckoutLeftPanel } from "./CheckoutLeftPanel";
import { OrderSummaryCard } from "./OrderSummaryCard";
import { CheckoutBreadcrumb } from "./CheckoutBreadcrumb";
import { CheckoutSkeleton } from "./skeletons/CheckoutSkeleton";
import type { CheckoutPageClientProps } from "../_props/checkout.props";

function CheckoutContent({ orderNumber }: CheckoutPageClientProps): ReactNode {
  const {
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
  } = useCheckoutPage(orderNumber);

  const hideSummaryCTA = pesapalIframe.checkoutState !== "idle";

  return (
    <main className="flex-1 bg-[#e8e6e1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <CheckoutBreadcrumb orderNumber={order.order_number} />
        <h1 className="text-2xl font-bold text-foreground mb-6">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">
          <CheckoutLeftPanel
            activeTab={activeTab}
            onTabChange={setActiveTab}
            instantMethod={instantMethod}
            directMethod={directMethod}
            onInstantSubmit={handleInstantSubmit}
            onDirectSubmit={handleDirectSubmit}
            onMobileSubmit={handleCompletePayment}
            isSubmitting={isSubmitting}
            isDirectSuccess={directSuccess}
            directPaymentId={successPaymentId}
            isPaid={order.paid}
            pesapalIframe={pesapalIframe}
          />

          <div className="lg:sticky lg:top-6">
            <OrderSummaryCard
              order={order}
              isLoading={false}
              onCompletePayment={handleCompletePayment}
              isSubmitting={isSubmitting}
              activeTab={activeTab}
              hideCTA={hideSummaryCTA}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export function CheckoutPage(props: CheckoutPageClientProps): ReactNode {
  return (
    <AuthGuard loadingFallback={<CheckoutSkeleton />} unauthenticatedFallback={null}>
      <CheckoutContent {...props} />
    </AuthGuard>
  );
}
