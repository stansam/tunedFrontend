"use client";

import { MouseEvent } from "react";
import { useMotionValue, useMotionTemplate } from "framer-motion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export function useCardHover() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const xTemplate = useMotionTemplate`${mouseX}px`;
  const yTemplate = useMotionTemplate`${mouseY}px`;
  const isMobile = useIsMobile();

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return { xTemplate, yTemplate, handleMouseMove };
}
