"use client";

import type { ReactNode } from "react";
import type { OrderDetails } from "../../_types/checkout.types";

interface CallbackReceiptSummaryProps {
  order: OrderDetails;
}

export function CallbackReceiptSummary({ order }: CallbackReceiptSummaryProps): ReactNode {
  return (
    <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-6 border border-emerald-500/10 space-y-4">
      <h3 className="text-xs font-semibold text-emerald-900/60 uppercase tracking-wider">
        Order Receipt Summary
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center pb-2 border-b border-emerald-900/5">
          <span className="text-emerald-900/70">Order Number</span>
          <span className="font-bold text-emerald-950">{order.order_number}</span>
        </div>
        {order.service_type && (
          <div className="flex justify-between items-center pb-2 border-b border-emerald-900/5">
            <span className="text-emerald-900/70">Service Type</span>
            <span className="font-medium text-emerald-950">{order.service_type}</span>
          </div>
        )}
        {order.pages !== undefined && order.pages > 0 && (
          <div className="flex justify-between items-center pb-2 border-b border-emerald-900/5">
            <span className="text-emerald-900/70">Pages / Words</span>
            <span className="font-medium text-emerald-950">
              {order.pages} page{order.pages > 1 ? "s" : ""} / {order.pages * 275} words
            </span>
          </div>
        )}
        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold text-emerald-950">Total Paid</span>
          <span className="text-lg font-bold text-emerald-700">
            ${Number(order.total_price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
