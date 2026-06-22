"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useUnsubscribe } from "@/lib/hooks/useUnsubscribe";
import { UnsubscribeModal } from "./UnsubscribeModal";
import type { Route } from "next";

export function UnsubscribeTrigger() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const token = searchParams.get("unsubscribe-token") || searchParams.get("token") || "";

  const { status, email, errorMsg, execute } = useUnsubscribe(token);

  if (!token) return null;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("unsubscribe-token");
    params.delete("token");
    const query = params.toString();
    const cleanUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(cleanUrl as Route);
  };

  return (
    <UnsubscribeModal
      isOpen={true}
      onClose={handleClose}
      status={status}
      email={email}
      errorMsg={errorMsg}
      onConfirm={execute}
    />
  );
}
