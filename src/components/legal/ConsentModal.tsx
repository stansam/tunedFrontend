"use client";

import type { ConsentModalProps } from "@/lib/types/legal.type";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { ConsentModalDesktop } from "./ConsentModalDesktop";
import { ConsentModalMobile } from "./ConsentModalMobile";

export function ConsentModal(props: ConsentModalProps) {
  const isMobile = useIsMobile();

  if (!props.isOpen) {
    return null;
  }

  return isMobile ? (
    <ConsentModalMobile {...props} />
  ) : (
    <ConsentModalDesktop {...props} />
  );
}
