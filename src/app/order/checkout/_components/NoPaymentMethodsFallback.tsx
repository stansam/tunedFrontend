"use client";
import type { ReactNode } from "react";

export function NoPaymentMethodsFallback(): ReactNode {
  return (
    <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center space-y-2">
      <p className="text-sm font-semibold text-destructive">Payment Unavailable</p>
      <p className="text-xs text-muted-foreground">
        No payment methods are currently available. Please contact support.
      </p>
    </div>
  );
}
