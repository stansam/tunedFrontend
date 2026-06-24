"use client";

import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { PesapalIframeHeader, PesapalIframeLoading, PesapalIframeError } from "./PesapalIframeStates";
import type { PesapalBridgeMessage } from "../_types/payment.types";

interface PesapalIframeProps {
  redirectUrl: string;
  onComplete: () => void;
  onCancel: () => void;
}

export function PesapalIframe({ redirectUrl, onComplete, onCancel }: PesapalIframeProps): ReactNode {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const appOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? (typeof window !== "undefined" ? window.location.origin : "");

  const handleMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== appOrigin) return;
    if ((event.data as PesapalBridgeMessage)?.type === "pesapal_payment_complete") onComplete();
  }, [appOrigin, onComplete]);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  const handleIframeLoad = useCallback(() => setIsLoading(false), []);
  const handleIframeError = useCallback(() => { setIsLoading(false); setLoadError(true); }, []);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <PesapalIframeHeader onCancel={onCancel} />
      {isLoading && !loadError && <PesapalIframeLoading />}
      {loadError && <PesapalIframeError onCancel={onCancel} />}
      {!loadError && (
        <iframe
          src={redirectUrl}
          title="Secure Payment via Pesapal"
          className={`w-full border-0 transition-opacity duration-300 ${isLoading ? "opacity-0 h-0" : "opacity-100 h-[600px]"}`}
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          allow="payment"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          aria-label="Pesapal secure payment page"
        />
      )}
      {!isLoading && !loadError && (
        <div className="px-5 py-3 border-t border-border bg-muted/20 text-center space-y-1.5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your card details are processed securely by Pesapal. We do not store your card details.
          </p>
          <p className="text-xs text-muted-foreground">
            Having trouble?{" "}
            <a href={redirectUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
              Pay in a new tab
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
