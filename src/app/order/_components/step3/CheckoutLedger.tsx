"use client";

import { CreditCard, ArrowRight } from "lucide-react";
import type { OrderPriceState } from "../../_types/order.types";
import { formatCurrency } from "../../_utils/order.utils";

export function CheckoutLedger({ priceState, isSubmitting, onPlaceOrder }: { priceState: OrderPriceState, isSubmitting: boolean, onPlaceOrder: () => void }) {
  const rows = [
    { label: "Project Subtotal", value: priceState.subtotal, display: formatCurrency(priceState.subtotal) },
    { label: "Discount Code", value: priceState.discountAmount, display: `- ${formatCurrency(priceState.discountAmount)}`, highlight: "text-emerald-600" },
    { label: "Reward Points", value: priceState.pointsDiscount, display: `- ${formatCurrency(priceState.pointsDiscount)}`, highlight: "text-emerald-600" },
  ];

  return (
    <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/40">
      <div className="space-y-4">
        {rows.filter(r => r.value !== 0).map((row, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-slate-400 font-medium">{row.label}</span>
            <span className={row.highlight || "font-bold"}>{row.display}</span>
          </div>
        ))}
        <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
          <span className="text-lg font-bold">Total Amount</span>
          <span className="text-3xl font-black text-emerald-400 tabular-nums">
            {formatCurrency(priceState.total)}
          </span>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 p-5 text-lg font-black transition-all hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-emerald-500/20"
      >
        {isSubmitting ? "Processing..." : (
          <>
            <CreditCard size={20} />
            Place Order
            <ArrowRight size={20} />
          </>
        )}
      </button>
      <p className="mt-4 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        Secure Payment via TunedPay
      </p>
    </div>
  );
}
