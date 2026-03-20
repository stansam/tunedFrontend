"use client";

import { forwardRef, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { SectionHeader } from "../SectionHeader";
import { useHowItWorks } from "../../_hooks/useHowItWorks";
import type { HowItWorksCarouselProps, StepImageProps } from "../../_props/howItworks.props";
import { FALLBACK_STEPS } from "../../_fallback/howitworks.fallback";
import { HowItWorksCard } from "./card";
import { StepsNav } from "./stepsNav";
import Image from "next/image";


export const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 26,
      mass: 0.5,
    },
  },
} as const;

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style }, ref) => {
    return (
      <Image
        ref={ref}
        src={src ?? ""}
        alt={alt ?? ""}
        className={className}
        style={style}
        draggable={false}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }
);

StepImage.displayName = "StepImage";

const MotionStepImage = motion.create(StepImage);

interface AnimatedStepImageProps extends StepImageProps {
  delay?: number;
  isFirst?: boolean;
}


function AnimatedStepImage(
  { delay = 0, isFirst = false, style, ...props }: AnimatedStepImageProps
) {
  const preset = ANIMATION_PRESETS.fadeInScale;

  const combinedStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    userSelect: "none",
    ...style,
  };

  return (
    <MotionStepImage
      {...props}
      {...preset}
      transition={{ ...preset.transition, delay }}
      style={combinedStyle}
      loading={isFirst ? "eager" : "lazy"}
      fetchPriority={isFirst ? "high" : "auto"}
    />
  );
}

interface ProgressBarProps {
  readonly current: number;
  readonly total: number;
}

function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1 rounded-full transition-all duration-300",
            i === current
              ? "w-8 bg-amber-500"
              : i < current
                ? "w-2 bg-amber-300"
                : "w-2 bg-stone-200"
          )}
        />
      ))}
    </div>
  );
}

export function HowItWorks({
  steps = FALLBACK_STEPS,
  title = "How It Works",
  description = "A simple, straightforward process from start to finish. We ensure complete transparency and satisfaction at every step along the way.",
  className,
  autoPlayInterval = 6_000,
}: HowItWorksCarouselProps) {
  const { currentStepIndex, setStep } = useHowItWorks(steps, autoPlayInterval);
  if (!steps || steps.length === 0) return null;

  const currentStep = steps[currentStepIndex];
  const nextStep = steps[(currentStepIndex + 1) % steps.length];

  return (
    <>
      {nextStep && nextStep.image !== currentStep?.image && (
        <Head>
          <link rel="preload" as="image" href={nextStep.image} />
        </Head>
      )}

      <section
        aria-labelledby="how-it-works-heading"
        className={cn(
          "relative w-full bg-[#ede9e3] py-16 md:py-24 overflow-hidden",
          className
        )}
      >
        <div
          className="absolute inset-x-0 top-0 h-px bg-stone-300"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <SectionHeader
            id="how-it-works-heading"
            title={title}
            description={description}
            backgroundLabel="PROCESS"
            backgroundPosition="right"
            align="center"
            accentWord="Works"
          />

          <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-6">
            <HowItWorksCard step={currentStepIndex} stepsItems={steps}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  {...ANIMATION_PRESETS.fadeInScale}
                  className="absolute inset-0"
                >
                  {currentStep && (
                    <AnimatedStepImage
                      src={currentStep.image}
                      alt={`${currentStep.title} illustration`}
                      isFirst={currentStepIndex === 0}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </HowItWorksCard>

            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ProgressBar
                current={currentStepIndex}
                total={steps.length}
              />

              <StepsNav
                current={currentStepIndex}
                onChange={setStep}
                stepsItems={steps}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}