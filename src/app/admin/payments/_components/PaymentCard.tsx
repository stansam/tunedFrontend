"use client";

import { Card } from "@/components/ui/card";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { PaymentDetailsExpanded } from "./PaymentDetailsExpanded";
import { ChevronDown } from "lucide-react";
import type { PaymentCardProps } from "../_props/payments.props";

export function PaymentCard({
  payment,
  isExpanded,
  onToggleExpand,
  onVerify,
  onReject,
  isActionPending,
}: PaymentCardProps) {
  const isDev = process.env.NODE_ENV === "development";
  const displayClient = payment.client_name || (isDev ? "Jane Doe" : payment.user_id.slice(0, 8));
  const displayOrder = payment.order_number || (isDev ? "ORD-1234-XYZ" : payment.order_id.slice(0, 8));

  return (
    <Card className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xs transition-all duration-300 hover:bg-white/50 hover:shadow-sm rounded-2xl p-4 md:p-6 space-y-4">
      <div
        onClick={onToggleExpand}
        className="flex items-center justify-between cursor-pointer select-none gap-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payment ID</p>
            <p className="text-xs font-mono font-bold text-slate-800">{payment.payment_id}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Client & Order</p>
            <p className="text-xs text-slate-700 font-semibold truncate max-w-[150px]">{displayClient}</p>
            <p className="text-[10px] font-mono text-slate-500">{displayOrder}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Amount</p>
            <p className="text-sm font-bold text-slate-800 tabular-nums">
              {payment.currency} {payment.amount.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center md:justify-start">
            <PaymentStatusBadge status={payment.status} />
          </div>
        </div>
        <div className="flex items-center justify-center size-8 rounded-full bg-white/40 border border-white/50 hover:bg-white/60 transition-colors">
          <ChevronDown
            className={`size-4 text-slate-600 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isExpanded && (
        <PaymentDetailsExpanded
          payment={payment}
          onVerify={onVerify}
          onReject={onReject}
          isActionPending={isActionPending}
        />
      )}
    </Card>
  );
}
