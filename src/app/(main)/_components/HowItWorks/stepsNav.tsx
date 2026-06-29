"use client";

import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { DesktopStepsNav } from "./DesktopStepsNav";
import { MobileStepsNav } from "./MobileStepsNav";
import type { StepsNavProps } from "../../_props/howItworks.props";

export function StepsNav(props: StepsNavProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileStepsNav {...props} />
  ) : (
    <DesktopStepsNav {...props} />
  );
}