"use client";

import React, { MouseEvent } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, type MotionStyle } from "framer-motion";
import type { HowItWorksStep } from "../../_types/howItWorks.types";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

type WrapperStyle = MotionStyle & {
  "--x": any;
  "--y": any;
};

export function HowItWorksCard({ children, step, stepsItems }: { children: React.ReactNode; step: number; stepsItems: readonly HowItWorksStep[] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();
  
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={{ "--x": useMotionTemplate`${mouseX}px`, "--y": useMotionTemplate`${mouseY}px` } as WrapperStyle}
    >
      <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors duration-300">
        <div className="m-8 sm:m-10 min-h-[450px] w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-4 md:w-1/2 lg:w-2/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-sm font-semibold uppercase tracking-wider text-emerald-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                  Step {step + 1}
              </motion.div>
              <motion.h3
                className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                {stepsItems[step]?.title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                <p className="text-base leading-relaxed text-slate-500">
                  {stepsItems[step]?.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {children}
        </div>
      </div>
    </motion.div>
  );
}