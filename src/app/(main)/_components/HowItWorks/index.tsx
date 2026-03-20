"use client";

import React, { forwardRef, useCallback, useEffect, useState, MouseEvent } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, Variants, MotionStyle } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../SectionHeader";
import { useHowItWorks } from "../../_hooks/useHowItWorks";
import type { HowItWorksCarouselProps } from "../../_props/howItworks.props";
import type { HowItWorksStep } from "../../_types/howItWorks.types";

// --- Constants & Data ---

const FALLBACK_STEPS: readonly HowItWorksStep[] = [
  {
    id: "step-1",
    title: "Place Your Order",
    description: "Complete our user-friendly order form with your paper requirements, including topic, length, deadline, and formatting style. The more details you provide, the better we can match you with the perfect writer."
  },
  {
    id: "step-2",
    title: "Make Your Payment",
    description: "Choose from our secure payment options to confirm your order. We offer competitive pricing with no hidden fees. Multiple payment methods are available for your convenience and security. Reach out for guidance if needed."
  },
  {
    id: "step-3",
    title: "Track Your Progress",
    description: "Monitor your order's status through our real-time tracking system. Receive notifications at each milestone, from order processing to final submission. Stay informed throughout the entire process."
  },
  {
    id: "step-4",
    title: "Receive Your Paper",
    description: "Download your completed paper from your account. All papers are delivered on time, thoroughly researched, properly formatted, and plagiarism-free. We ensure your work meets all paper standards."
  },
  {
    id: "step-5",
    title: "Review and Request Revisions",
    description: "Read through your paper and request free revisions if needed. Our writers are committed to your satisfaction and will make adjustments according to your feedback within our revision policy timeframe."
  },
  {
    id: "step-6",
    title: "Return for Future Orders",
    description: "Join our community of satisfied customers who return for reliable paper assistance. Enjoy loyalty discounts on future orders and build a relationship with your preferred writers for consistent quality."
  },
  {
    id: "step-7",
    title: "Provide Feedback",
    description: "Share your feedback on the completed paper to help us improve our services. Your satisfaction is our top priority, and we're always looking for ways to better serve you."
  }
];

const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const;

type WrapperStyle = MotionStyle & {
  "--x": any;
  "--y": any;
};

// --- Hooks ---

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);
  return isMobile;
}

// --- Components ---

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
};

interface StepImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={className}
        src={src}
        style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/800x600/e2e8f0/64748b?text=Step`;
        }}
        {...props}
      />
    );
  }
);
StepImage.displayName = "StepImage";

const MotionStepImage = motion.create(StepImage);

function AnimatedStepImage({ delay = 0, ...props }: StepImageProps & { delay?: number }) {
  const presetConfig = ANIMATION_PRESETS.fadeInScale;
  return (
    <MotionStepImage 
      {...props} 
      {...presetConfig} 
      transition={{ ...presetConfig.transition, delay }} 
    />
  );
}

function FeatureCard({ children, step, stepsItems }: { children: React.ReactNode; step: number; stepsItems: readonly HowItWorksStep[] }) {
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

function StepsNav({ 
  stepsItems, 
  current, 
  onChange 
}: { 
  stepsItems: readonly HowItWorksStep[]; 
  current: number; 
  onChange: (index: number) => void; 
}) {
    return (
        <nav aria-label="Progress" className="flex justify-center px-4 w-full overflow-x-auto pb-4 pt-2 -mx-4 sm:mx-0 custom-scrollbar">
            <ol className="flex w-max min-w-full lg:w-full flex-nowrap lg:flex-wrap items-center justify-start lg:justify-center gap-2 px-4 sm:px-0" role="list">
                {stepsItems.map((stepItem, stepIdx) => {
                    const isCompleted = current > stepIdx;
                    const isCurrent = current === stepIdx;
                    return (
                        <motion.li key={stepItem.id} initial="inactive" animate={isCurrent ? "active" : "inactive"} variants={stepVariants} transition={{ duration: 0.3 }} className="relative shrink-0" >
                            <button
                                type="button"
                                className={cn(
                                    "group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500",
                                    isCurrent 
                                        ? "bg-emerald-600 text-white" 
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                                onClick={() => onChange(stepIdx)}
                            >
                                <span className={cn(
                                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                                    isCompleted 
                                        ? "bg-emerald-600 text-white" 
                                        : isCurrent 
                                            ? "bg-emerald-400 text-emerald-900" 
                                            : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                                )}>
                                    {isCompleted ? (
                                        <Check className="h-3 w-3" />
                                    ) : (
                                        <span>{stepIdx + 1}</span>
                                    )}
                                </span>
                                <span className={cn("inline-block", !isCurrent && "hidden sm:inline-block")}>
                                    {isCurrent ? "Current Step" : `Step ${stepIdx + 1}`}
                                </span>
                            </button>
                        </motion.li>
                    );
                })}
            </ol>
        </nav>
    );
}

export function HowItWorks({
  steps = FALLBACK_STEPS,
  title = "How It Works",
  description = "A simple, straightforward process from start to finish. We ensure complete transparency and satisfaction at every step along the way.",
  className,
  autoPlayInterval = 6000,
}: HowItWorksCarouselProps) {
  const { currentStepIndex, setStep } = useHowItWorks(steps, autoPlayInterval);

  const imageColors = [
    "10b981", // emerald
    "0ea5e9", // sky
    "8b5cf6", // violet
    "f59e0b", // amber
    "ec4899", // pink
    "14b8a6", // teal
    "6366f1"  // indigo
  ];

  const renderStepContent = () => {
    const color = imageColors[currentStepIndex % imageColors.length];
    const imageUrl = `https://placehold.co/800x600/${color}/ffffff?text=Step+${currentStepIndex + 1}`;
    
    return (
      <AnimatedStepImage 
        alt={`Step ${currentStepIndex + 1} Illustration`} 
        className="rounded-xl border border-slate-200 shadow-xl w-[90%] left-[5%] top-[10%] min-h-[50%] object-cover sm:w-[80%] sm:left-[10%] sm:top-[20%] md:absolute md:w-[42%] md:left-[55%] md:top-[12%] md:min-h-0" 
        src={imageUrl} 
      />
    );
  };

  if (!steps || steps.length === 0) return null;

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className={cn(
        "relative w-full bg-[#f8f9fa] py-16 md:py-24 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-slate-200" aria-hidden="true" />

      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="how-it-works-heading"
          title={title}
          description={description}
          backgroundLabel="PROCESS"
          backgroundPosition="right"
          align="center"
          accentWord="Works"
        />

        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto mt-12">
          <FeatureCard step={currentStepIndex} stepsItems={steps}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStepIndex} 
                {...ANIMATION_PRESETS.fadeInScale} 
                className="w-full h-full relative mt-8 md:mt-0 md:absolute md:inset-0 pointer-events-none"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </FeatureCard>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
          >
            <StepsNav 
               current={currentStepIndex} 
               onChange={setStep} 
               stepsItems={steps} 
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
