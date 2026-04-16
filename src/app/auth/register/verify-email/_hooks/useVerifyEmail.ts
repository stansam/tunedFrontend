"use client";

/**
 * useVerifyEmail — state management for the verify-email page.
 *
 * Responsibilities:
 *  - Manage the resend lifecycle (idle → resending → resent | error)
 *  - Run a 60-second countdown after each successful resend
 *  - Expose a single handleResend() action to components
 *
 * The cooldown countdown is purely UX; the real enforcement is on the
 * backend via a Redis TTL key.
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { resendVerificationEmail } from "../_services/verify-email.service";
import type { VerifyEmailStatus } from "../_types/verify-email.type";

const COOLDOWN_SECONDS = 60;

interface UseVerifyEmailReturn {
  readonly status: VerifyEmailStatus;
  /** Feedback message to show beneath the resend button. */
  readonly feedbackMessage: string | null;
  /** Seconds until the resend button re-enables. 0 = enabled. */
  readonly cooldownSeconds: number;
  readonly handleResend: () => Promise<void>;
}

export function useVerifyEmail(email: string): UseVerifyEmailReturn {
  const [status, setStatus] = useState<VerifyEmailStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);

  // Interval ref so we can clear it on unmount / re-trigger
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** Start (or restart) the countdown. */
  const startCooldown = useCallback((from: number = COOLDOWN_SECONDS) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setCooldownSeconds(from);

    intervalRef.current = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1_000);
  }, []);

  // Clean up the interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleResend = useCallback(async () => {
    if (status === "resending" || cooldownSeconds > 0) return;

    setStatus("resending");
    setFeedbackMessage(null);

    const result = await resendVerificationEmail(email);

    if (!result.ok) {
      setStatus("error");
      setFeedbackMessage(result.message);

      // If the backend sent back a cooldown duration, honour it
      if (result.cooldownSeconds && result.cooldownSeconds > 0) {
        startCooldown(result.cooldownSeconds);
      }
      return;
    }

    setStatus("resent");
    setFeedbackMessage("A new verification email has been sent. Check your inbox.");
    startCooldown(COOLDOWN_SECONDS);
  }, [email, status, cooldownSeconds, startCooldown]);

  return { status, feedbackMessage, cooldownSeconds, handleResend };
}
