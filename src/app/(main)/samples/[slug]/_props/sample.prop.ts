import type { Sample, SampleViewModel, RelatedSampleItem } from "../_types/sample.type";

export interface SampleDetailClientProps {
  readonly sample: Sample;
}

export interface SampleDetailHeroProps {
  readonly sample: SampleViewModel;
}

export interface SampleContentPanelProps {
  readonly sample: SampleViewModel;
}

export interface SampleMetaSidebarProps {
  readonly sample: SampleViewModel;
}

export interface SamplePreviewPaneProps {
  readonly title: string;
  readonly excerpt: string;
  readonly wordCount: number;
  readonly image: string;
}

export interface RelatedSamplesSectionProps {
  readonly samples: readonly RelatedSampleItem[];
  readonly currentSlug: string;
}

export interface RelatedSampleCardProps {
  readonly sample: RelatedSampleItem;
}

export interface SampleDetailSkeletonProps {
  readonly variant?: "hero" | "content" | "related" | "full";
}

export interface ShareButtonProps {
  readonly title: string;
  readonly path: string;
}