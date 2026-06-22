"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { LegalModalContextValue } from "@/lib/types/legal.type";
import { useLegalConsent } from "@/lib/hooks/useLegalConsent";
import { LegalModal } from "@/components/legal/LegalModal";
import { ConsentModal } from "@/components/legal/ConsentModal";

const LegalModalContext = createContext<LegalModalContextValue | null>(null);
LegalModalContext.displayName = "LegalModalContext";

export function LegalModalProvider({ children }: { readonly children: React.ReactNode }) {
  const consent = useLegalConsent();

  const value = useMemo<LegalModalContextValue>(
    () => ({
      isOpen: consent.isOpen,
      type: consent.type,
      openModal: consent.openModal,
      closeModal: consent.closeModal,
      showConsentPopup: consent.showConsentPopup,
      acceptAllPolicies: consent.acceptAllPolicies,
      dismissConsentPopup: consent.dismissConsentPopup,
      isLoading: consent.isLoading,
      isAccepting: consent.isAccepting,
    }),
    [
      consent.isOpen,
      consent.type,
      consent.openModal,
      consent.closeModal,
      consent.showConsentPopup,
      consent.acceptAllPolicies,
      consent.dismissConsentPopup,
      consent.isLoading,
      consent.isAccepting,
    ]
  );

  return (
    <LegalModalContext.Provider value={value}>
      {children}
      <LegalModal isOpen={consent.isOpen} onClose={consent.closeModal} type={consent.type} />
      <ConsentModal
        isOpen={consent.showConsentPopup}
        onAccept={consent.acceptAllPolicies}
        onDecline={consent.dismissConsentPopup}
        isLoading={consent.isLoading}
        isAccepting={consent.isAccepting}
      />
    </LegalModalContext.Provider>
  );
}

export function useLegalModal(): LegalModalContextValue {
  const ctx = useContext(LegalModalContext);
  if (!ctx) {
    throw new Error("useLegalModal must be used within LegalModalProvider");
  }
  return ctx;
}
