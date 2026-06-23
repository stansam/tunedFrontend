"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Head from "next/head";
import { SectionHeader } from "../SectionHeader";
import { useHowItWorks } from "../../_hooks/useHowItWorks";
import type { HowItWorksCarouselProps } from "../../_props/howItworks.props";
import { FALLBACK_STEPS } from "../../_fallback/howitworks.fallback";
import { HowItWorksCard } from "./card";
import { StepsNav } from "./stepsNav";
import { ProgressBar } from "./ProgressBar";
import { AnimatedStepImage, ANIMATION_PRESETS } from "./AnimatedStepImage";

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
        <Head><link rel="preload" as="image" href={nextStep.image} /></Head>
      )}

      <section aria-labelledby="how-it-works-heading" className={cn("relative w-full bg-[#ede9e3] py-16 md:py-24 overflow-hidden", className)}>
        <div className="absolute inset-x-0 top-0 h-px bg-stone-300" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px" }} aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <SectionHeader id="how-it-works-heading" title={title} description={description} backgroundLabel="PROCESS" backgroundPosition="right" align="center" accentWord="Works" />

          <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-6">
            <HowItWorksCard step={currentStepIndex} stepsItems={steps}>
              <AnimatePresence mode="wait">
                <motion.div key={currentStepIndex} {...ANIMATION_PRESETS.fadeInScale} className="absolute inset-0">
                  {currentStep && (
                    <AnimatedStepImage src={currentStep.image} alt={`${currentStep.title} illustration`} isFirst={currentStepIndex === 0} />
                  )}
                </motion.div>
              </AnimatePresence>
            </HowItWorksCard>

            <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <ProgressBar current={currentStepIndex} total={steps.length} />
              <StepsNav current={currentStepIndex} onChange={setStep} stepsItems={steps} />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}