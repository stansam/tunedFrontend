"use client";

import { MouseEvent } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, type MotionStyle } from "framer-motion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import type { HowItWorksCardProps } from "../../_props/howItworks.props";

type CSSVarString = `${number}px`;

type WrapperStyle = MotionStyle & {
  "--x": CSSVarString | ReturnType<typeof useMotionTemplate>;
  "--y": CSSVarString | ReturnType<typeof useMotionTemplate>;
};

export function HowItWorksCard(
    { children, step, stepsItems }: HowItWorksCardProps
) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const xTemplate = useMotionTemplate`${mouseX}px`;
  const yTemplate = useMotionTemplate`${mouseY}px`;

  const isMobile = useIsMobile();
  
  function handleMouseMove(
    { currentTarget, clientX, clientY }: MouseEvent
  ) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const currentStep = stepsItems[step];

  return (
    <motion.div
      className="group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": xTemplate,
          "--y": yTemplate,
        } as WrapperStyle
      }
    >
        <div
        className="
          pointer-events-none absolute inset-0 z-0 rounded-3xl opacity-0
          transition-opacity duration-500 group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(600px circle at var(--x) var(--y), rgba(251,191,36,0.07), transparent 70%)",
        }}
        aria-hidden="true"
      />

        <div className="relative w-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md">
            <div className="grid min-h-[460px] grid-cols-1 md:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-center px-8 py-10 sm:px-10 md:py-14">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className="flex flex-col gap-5"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div
                                className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1"
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.05,
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                                    Step {step + 1}
                                </span>
                            </motion.div>
                            <motion.h3
                                className="text-2xl font-bold tracking-tight text-stone-800 md:text-3xl"
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.1,
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                >
                                {currentStep?.title}
                            </motion.h3>
                            <motion.p
                                className="text-base leading-relaxed text-stone-500"
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.15,
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                >
                                {currentStep?.description}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="relative h-64 md:h-auto">
                    {children}
                </div>

            </div>
        </div>
       </motion.div>
    );
}