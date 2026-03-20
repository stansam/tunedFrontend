import React from "react";
import type { HowItWorksStep } from "../_types/howItWorks.types";

export interface HowItWorksProps {
  readonly steps?: readonly HowItWorksStep[];
  readonly title?: string;
  readonly description?: string;
  readonly className?: string;
}

export interface HowItWorksCarouselProps extends HowItWorksProps {
  readonly autoPlayInterval?: number;
}

export interface HowItWorksCardProps {
  readonly children: React.ReactNode;
  readonly step: number;
  readonly stepsItems: readonly HowItWorksStep[];
}

export interface StepsNavProps {
  readonly stepsItems: readonly HowItWorksStep[];
  readonly current: number;
  readonly onChange: (index: number) => void;
}

export interface StepImageProps {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly nextSrc?: string;
  readonly loading?: "eager" | "lazy";
  readonly fetchPriority?: "high" | "low" | "auto";
} 
