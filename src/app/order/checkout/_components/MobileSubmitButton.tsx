"use client";

import type { ActiveTab } from "../_types/checkout.types";
import { useLegalModal } from "@/lib/contexts/LegalModalContext";

interface MobileSubmitButtonProps {
  onSubmit: () => void;
  isSubmitting: boolean;
  isDisabled: boolean;
  activeTab: ActiveTab;
}

export function MobileSubmitButton({
  onSubmit,
  isSubmitting,
  isDisabled,
  activeTab,
}: MobileSubmitButtonProps) {
  const { openModal } = useLegalModal();
  const label = isSubmitting
    ? "Processing…"
    : activeTab === "direct"
      ? "Submit Proof of Payment"
      : "Complete Payment";

  return (
    <div className="sm:hidden px-1 space-y-2">
      <button
        type="button"
        onClick={onSubmit}
        disabled={isDisabled || isSubmitting}
        className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
      >
        {label}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <button
          type="button"
          onClick={() => openModal("terms")}
          className="underline hover:text-foreground transition-colors bg-transparent border-none p-0 cursor-pointer text-xs"
        >
          Terms of Service
        </button>
        .
      </p>
    </div>
  );
}
