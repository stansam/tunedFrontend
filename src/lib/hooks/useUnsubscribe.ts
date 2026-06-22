import { useState, useEffect, useCallback } from "react";
import { unsubscribeFromNewsletter, validateUnsubscribe } from "@/app/(main)/_actions/newsletter.action";

export type UnsubscribeStatus = "fetching" | "confirm" | "loading" | "success" | "error";

export interface UseUnsubscribeResult {
  readonly status: UnsubscribeStatus;
  readonly email: string | null;
  readonly errorMsg: string | null;
  readonly execute: () => Promise<void>;
  readonly reset: () => void;
}

export function useUnsubscribe(token: string): UseUnsubscribeResult {
  const [status, setStatus] = useState<UnsubscribeStatus>(token ? "fetching" : "error");
  const [email, setEmail] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(token ? null : "Unsubscription token is missing.");

  const verifyToken = useCallback(async () => {
    if (!token) {
      setStatus("error");
      setErrorMsg("Unsubscription token is missing.");
      return;
    }
    setStatus("fetching");
    try {
      const res = await validateUnsubscribe(token);
      if (res.ok) {
        setEmail(res.data.email);
        setStatus("confirm");
      } else {
        setStatus("error");
        setErrorMsg(res.error.message || "Invalid or expired unsubscription link.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Failed to verify the unsubscription link.");
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    let active = true;
    async function check() {
      try {
        const res = await validateUnsubscribe(token);
        if (!active) return;
        if (res.ok) {
          setEmail(res.data.email);
          setStatus("confirm");
        } else {
          setStatus("error");
          setErrorMsg(res.error.message || "Invalid or expired unsubscription link.");
        }
      } catch {
        if (!active) return;
        setStatus("error");
        setErrorMsg("Failed to verify the unsubscription link.");
      }
    }

    void check();

    return () => {
      active = false;
    };
  }, [token]);

  const execute = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await unsubscribeFromNewsletter(token);
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(res.error.message || "Failed to unsubscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("A network error occurred. Please try again.");
    }
  }, [token]);

  const reset = useCallback(() => {
    void verifyToken();
  }, [verifyToken]);

  return { status, email, errorMsg, execute, reset };
}
