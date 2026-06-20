"use client";

import { OrderSummarySection } from "@/app/order/_components/step3/OrderSummarySection";
import { RewardPointsRedeemer } from "@/app/order/_components/step3/RewardPointsRedeemer";
import { DiscountCodeInput } from "@/app/order/_components/step3/DiscountCodeInput";
import { CheckoutLedger } from "@/app/order/_components/step3/CheckoutLedger";
import type { StepProps } from "@/app/order/_props/order.props";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderSubmit } from "@/app/order/_hooks/useOrderSubmit";

export function Step3ReviewCheckout(props: StepProps) {
  const { state, priceState, setPriceState, updateStep3, goToStep } = props;
  const { submit, isLoading: isSubmitting } = useOrderSubmit();

  const handlePlaceOrder = () => {
    submit({ state });
  };

  return (
    <div className="space-y-6">
      <Card className="border-none bg-white/60 shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
        <CardContent className="p-6 md:p-8 space-y-8">
          <header>
            <h2 className="text-2xl font-bold text-slate-900">Review & Checkout</h2>
            <p className="text-sm text-slate-500 mt-1">Almost there! Review your order and apply any discounts.</p>
          </header>

          <OrderSummarySection state={state} goToStep={goToStep} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-black/5">
            <RewardPointsRedeemer 
            // currentPoints={0}
              value={state.step3.pointsToRedeem}
              onChange={(v) => updateStep3({ pointsToRedeem: v })}
              onApplied={(amt) => setPriceState(p => ({ ...p, pointsDiscount: amt, total: p.subtotal - p.discountAmount - amt }))}
            />
            <DiscountCodeInput 
              subtotal={priceState.subtotal}
              onApplied={(amt) => setPriceState(p => ({ ...p, discountAmount: amt, total: p.subtotal - amt - p.pointsDiscount }))}
            />
          </div>
        </CardContent>
      </Card>

      <CheckoutLedger 
        priceState={priceState} 
        isSubmitting={isSubmitting} 
        onPlaceOrder={handlePlaceOrder} 
      />
    </div>
  );
}
