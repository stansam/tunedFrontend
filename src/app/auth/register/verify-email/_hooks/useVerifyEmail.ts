"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { resendVerificationEmail } from "../_services/verify-email.service";
import type { VerifyEmailStatus } from "../_types/verify-email.type";

const COOLDOWN_SECONDS = 60;

interface UseVerifyEmailReturn {
  readonly status: VerifyEmailStatus;
  readonly feedbackMessage: string | null;
  readonly cooldownSeconds: number;
  readonly handleResend: () => Promise<void>;
}

export function useVerifyEmail(email: string): UseVerifyEmailReturn {
  const [status, setStatus] = useState<VerifyEmailStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
