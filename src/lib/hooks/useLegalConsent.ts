"use client";

import { useState, useCallback } from "react";
import { useAuthContext } from "@/lib/auth/Context";
import { POLICY_VERSIONS, type PolicyType } from "@/lib/constants/policy";
import { checkLocalConsent, saveLocalConsent } from "@/lib/services/legal.service";
import { usePolicyStatusQuery, useAcceptPoliciesMutation } from "./useLegalQuery";

export function useLegalConsent() {
  const { isAuthenticated, status } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<PolicyType | null>(null);
  const [localConsentDismissed, setLocalConsentDismissed] = useState<boolean>(false);

  const statusQuery = usePolicyStatusQuery(isAuthenticated, status);
  const acceptMutation = useAcceptPoliciesMutation();

  const isAuthLoading = status === "loading" || (isAuthenticated && statusQuery.isLoading);

  const showConsentPopup = !isAuthLoading && (() => {
    if (isAuthenticated) {
      return statusQuery.data === true;
    }
    return !localConsentDismissed && checkLocalConsent();
  })();

  const openModal = useCallback((t: PolicyType) => {
    setType(t);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setType(null);
  }, []);

  const dismissConsentPopup = useCallback(() => setLocalConsentDismissed(true), []);

  const acceptAllPolicies = useCallback(async () => {
    if (isAuthenticated) {
      try {
        const ok = await acceptMutation.mutateAsync({
          terms: POLICY_VERSIONS.terms,
          privacy: POLICY_VERSIONS.privacy,
        });
        // statusQuery.data will update via React Query cache invalidation
        if (!ok) console.error("[useLegalConsent] Server rejected policy acceptance");
      } catch (err) {
        console.error("[useLegalConsent] Mutation failed:", err);
      }
    } else {
      saveLocalConsent();
      setLocalConsentDismissed(true);
    }
  }, [isAuthenticated, acceptMutation])

  return {
    isOpen,
    type,
    openModal,
    closeModal,
    showConsentPopup,
    acceptAllPolicies,
    dismissConsentPopup,
    isLoading: isAuthLoading,
    isAccepting: acceptMutation.isPending,
  };
}
