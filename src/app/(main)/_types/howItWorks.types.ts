export type HowItWorksStepId = string;

export interface HowItWorksStep {
  readonly id: HowItWorksStepId;
  readonly title: string;
  readonly description: string;
}
