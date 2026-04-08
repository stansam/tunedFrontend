import React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegisterSubmitButtonProps {
  readonly isSubmitting: boolean;
  readonly isSuccess: boolean;
}

export function RegisterSubmitButton({ isSubmitting, isSuccess }: RegisterSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isSuccess}
      aria-busy={isSubmitting}
      className={cn(
        "mt-2 flex w-full items-center justify-center gap-2",
        "rounded-xl py-3.5 text-base font-bold text-white",
        "bg-emerald-800 hover:bg-emerald-900",
        "shadow-[0_4px_16px_rgba(6,78,59,0.35)]",
        "transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2",
        "disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
      )}
    >
      {isSubmitting ? (
        <>
          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          <span>Creating account…</span>
        </>
      ) : isSuccess ? (
        <>
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>Account created…</span>
        </>
      ) : (
        "Create Account"
      )}
    </button>
  );
}
