"use client";

import type { ReactNode } from "react";
import { FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildOrderItemLabel, formatCurrency } from "../_utils/format.utils";
import { OrderSummaryLineItems } from "./OrderSummaryLineItems";
import { OrderSummarySkeleton } from "./skeletons/OrderSummarySkeleton";
import type { OrderSummaryCardProps } from "../_props/payment.props";
import { useLegalModal } from "@/lib/contexts/LegalModalContext";

export function OrderSummaryCard({ order, isLoading, onCompletePayment, isSubmitting, activeTab, hideCTA = false }: OrderSummaryCardProps): ReactNode {
  const { openModal } = useLegalModal();
  if (isLoading && !order) return <OrderSummarySkeleton />;

  const total = order?.total_price ?? 0;
  const itemLabel = buildOrderItemLabel(order?.service_type, order?.pages, order?.academic_level);
  const btnLabel = activeTab === "direct" ? "Submit Proof of Payment" : `Complete Payment${total ? ` — ${formatCurrency(total)}` : ""}`;

  return (
    <aside aria-label="Order summary" className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      <h2 className="text-base font-bold text-foreground">Order Summary</h2>

      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">Order Reference</p>
        <p className="text-sm font-bold tracking-wide">{order?.order_number ?? "—"}</p>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600 shrink-0">
          <FileText className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold truncate">{order?.service_type ?? "Your Order"}</p>
          {itemLabel && <p className="text-xs text-muted-foreground truncate">{itemLabel}</p>}
        </div>
      </div>

      <OrderSummaryLineItems subtotal={order?.subtotal ?? 0} tax={order?.tax ?? 0} total={total} />

      {!hideCTA && (
        <>
          <Button type="button" onClick={onCompletePayment} disabled={isSubmitting || !order || order.paid} className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm hidden sm:flex items-center justify-center gap-2" aria-label={btnLabel}>
            <Lock className="h-4 w-4" aria-hidden="true" />
            <span>{isSubmitting ? "Processing…" : btnLabel}</span>
          </Button>

          <p className="text-center text-xs text-muted-foreground hidden sm:block leading-relaxed">
            By completing this payment, you agree to our{" "}
            <button type="button" onClick={() => openModal("terms")} className="underline hover:text-foreground transition-colors bg-transparent border-none p-0 cursor-pointer text-xs">
              Terms of Service
            </button>
            .
          </p>
        </>
      )}

      {order?.paid && <p className="text-xs text-center text-emerald-600 font-medium">This order has already been paid.</p>}
    </aside>
  );
}
