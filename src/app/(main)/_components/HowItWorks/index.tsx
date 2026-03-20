"use client";

import React, { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "../SectionHeader";
import { useHowItWorks } from "../../_hooks/useHowItWorks";
import type { HowItWorksCarouselProps } from "../../_props/howItworks.props";
import { FALLBACK_STEPS } from "../../_fallback/howitworks.fallback";
import { HowItWorksCard } from "./card";
import { StepsNav } from "./stepsNav";

export const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const;

interface StepImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}
// function BookIllustration() {
//   return (
//     <Image
//       src="/book_sketch.svg"
//       alt="Book illustration"
//       className="h-80"
//       width={290}
//       height={180}
//     />
//   );
// }


const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={className}
        src={src}
        style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
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

export function HowItWorks({
  steps = FALLBACK_STEPS,
  title = "How It Works",
  description = "A simple, straightforward process from start to finish. We ensure complete transparency and satisfaction at every step along the way.",
  className,
  autoPlayInterval = 6000,
}: HowItWorksCarouselProps) {
  const { currentStepIndex, setStep } = useHowItWorks(steps, autoPlayInterval);

  const renderStepContent = () => {
    const currentStep = steps[currentStepIndex];
    if (!currentStep) return null;
    
    return (
      <AnimatedStepImage 
        alt={`${currentStep.title} Illustration`} 
        className="rounded-xl border border-slate-200 shadow-xl w-[90%] left-[5%] top-[10%] min-h-[50%] object-cover sm:w-[80%] sm:left-[10%] sm:top-[20%] md:absolute md:w-[42%] md:left-[55%] md:top-[12%] md:min-h-0 md:h-[75%]" 
        src={currentStep.image} 
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
          <HowItWorksCard step={currentStepIndex} stepsItems={steps}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStepIndex} 
                {...ANIMATION_PRESETS.fadeInScale} 
                className="w-full h-full relative mt-8 md:mt-0 md:absolute md:inset-0 pointer-events-none"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </HowItWorksCard>
          
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
