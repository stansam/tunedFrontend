"use client";

import { CreditCard, Building2, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaymentMethodTabsProps } from "../_props/payment.props";

const TAB_META = {
  instant: {
    icon: CreditCard,
    label: "Instant Payment",
    sub: "Credit/Debit Card via Pesapal",
    note: null,
  },
  direct: {
    icon: Building2,
    label: "Direct Transfer",
    sub: "Bank Transfer / CashApp",
    note: "Manual verification required",
  },
} as const;

export function PaymentMethodTabs({
  activeTab,
  onTabChange,
  instantMethod,
  directMethod,
}: PaymentMethodTabsProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      role="tablist"
      aria-label="Payment method"
    >
      {(["instant", "direct"] as const).map((tab) => {
        const meta = TAB_META[tab];
        const isActive = activeTab === tab;
        const isDisabled =
          (tab === "instant" && !instantMethod) ||
          (tab === "direct" && !directMethod);
        const Icon = meta.icon;

        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => onTabChange(tab)}
            className={cn(
              "relative flex flex-col gap-1.5 rounded-2xl border-2 p-4 text-left transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
              isActive
                ? "border-emerald-500 bg-white shadow-sm"
                : "border-border bg-card hover:border-emerald-300 hover:shadow-sm",
              isDisabled && "pointer-events-none opacity-50"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={cn("h-4 w-4", isActive ? "text-emerald-600" : "text-muted-foreground")} />
                <span className="text-sm font-semibold">{meta.label}</span>
              </div>
              {isActive
                ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                : <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
              }
            </div>
            <p className="text-xs text-muted-foreground pl-6">{meta.sub}</p>
            {meta.note && (
              <p className="text-xs text-amber-600 pl-6 font-medium">{meta.note}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}
