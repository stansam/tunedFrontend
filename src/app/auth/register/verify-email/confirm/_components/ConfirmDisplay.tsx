"use client";

import { useSearchParams } from "next/navigation";
import { useConfirmVerification } from "../_hooks/useConfirmVerification";
import { VerifyingSpinner } from "./VerifyingSpinner";
import { SuccessContent } from "./SuccessContent";
import { ErrorContent } from "./ErrorContent";

export function ConfirmDisplay() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid") ?? "";
  const token = searchParams.get("token") ?? "";

  const { status, message } = useConfirmVerification(uid, token);

  if (status === "verifying") {
    return <VerifyingSpinner />;
  }

  if (status === "success" || status === "already_verified") {
    return <SuccessContent alreadyVerified={status === "already_verified"} />;
  }

  return <ErrorContent message={message ?? "Verification failed."} />;
}
