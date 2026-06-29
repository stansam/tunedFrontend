"use client";

import type { ReactNode } from "react";
import { ShieldCheck, Loader2, XCircle } from "lucide-react";
import { SslBadge } from "./SecurityBadges";

interface HeaderProps {
  onCancel: () => void;
}

export function PesapalIframeHeader({ onCancel }: HeaderProps): ReactNode {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
        <span className="text-sm font-semibold text-foreground">Secure Payment</span>
      </div>
      <div className="flex items-center gap-3">
        <SslBadge />
        <button
          onClick={onCancel}
          className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
          aria-label="Cancel payment and go back"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function PesapalIframeLoading(): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 bg-muted/10">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm text-muted-foreground">Loading secure payment page…</p>
    </div>
  );
}

interface ErrorProps {
  onCancel: () => void;
}

export function PesapalIframeError({ onCancel }: ErrorProps): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6">
      <XCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
      <p className="text-sm text-destructive font-medium">
        Failed to load payment page. Please try again.
      </p>
      <button
        onClick={onCancel}
        className="text-xs text-muted-foreground hover:text-foreground underline"
        type="button"
      >
        Go back
      </button>
    </div>
  );
}
