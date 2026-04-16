"use client";

import { useEffect, useRef, useState } from "react";
import { confirmEmailVerification } from "../../_services/verify-email.service";
import type { ConfirmState } from "../_types/confirm.type";

const REASON_MESSAGES: Readonly<Record<string, string>> = {
  expired: "This verification link has expired. Please request a new one.",
  invalid: "This verification link is invalid or has already been used.",
  not_found: "We couldn't find your account. Please register again.",
  no_token: "No verification token found. Please request a new verification email.",
};


export function useConfirmVerification(uid: string, token: string): ConfirmState {
  const [state, setState] = useState<ConfirmState>({
    status: "verifying",
    message: null,
  });

  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    if (!uid || !token) {
      setState({
        status: "error",
        message: "Missing verification parameters. Please use the link from your email.",
      });
      return;
    }

    confirmEmailVerification(uid, token).then(({ verified, reason }) => {
      if (verified) {
        setState({ status: "success", message: null });
      } else if (reason === "already_verified") {
        setState({ status: "already_verified", message: null });
      } else {
        setState({
          status: "error",
          message:
            REASON_MESSAGES[reason ?? ""] ??
            "Verification failed. Please try again or request a new link.",
        });
      }
    });
  }, [uid, token]);

  return state;
}
