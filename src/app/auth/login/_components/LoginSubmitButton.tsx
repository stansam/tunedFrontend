import React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginSubmitButtonProps {
  readonly isSubmitting: boolean;
  readonly isSuccess: boolean;
}

export function LoginSubmitButton({ isSubmitting, isSuccess }: LoginSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isSuccess}
      aria-busy={isSubmitting}
      className={cn(
        "mt-2 flex w-full items-center justify-center gap-2",
        "rounded-xl py-3.5 text-base font-bold text-white",
        "bg-emerald-600 hover:bg-emerald-700",
        "shadow-[0_4px_16px_rgba(22,163,74,0.35)]",
        "transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        "disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
      )}
    >
      {isSubmitting ? (
        <>
          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
          <span>Signing in…</span>
        </>
      ) : isSuccess ? (
        <>
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>Redirecting…</span>
        </>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
