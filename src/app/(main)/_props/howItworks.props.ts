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
