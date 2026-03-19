import type {
  ServiceCategory,
  Sample,
  BlogPostResponse,
  BlogPostViewModel,
  SampleViewModel,
} from "../_types";
import type { ResolvedServiceIcon } from "@/lib/utils/resolveServiceIcon";

export type ServiceIconRecord = Readonly<Record<string, ResolvedServiceIcon>>;

export interface ServicesMarqueeProps {
  readonly featuredServices: readonly ServiceCategory[];
  readonly iconRecord:       ServiceIconRecord;
}

export interface ServiceCardProps {
  readonly service:    ServiceCategory;
  readonly icon:       ResolvedServiceIcon;
}

export interface FeaturedBlogsProps {
  readonly blogs:             readonly BlogPostResponse[];
  readonly title?:            string;
  readonly description?:      string;
  readonly backgroundLabel?:  string;
  readonly backgroundPosition?: "left" | "right";
  readonly className?:        string;
}

export interface BlogCardProps {
  readonly post:      BlogPostViewModel;
  readonly isPrimary: boolean;
}

export interface BlogCardSkeletonProps {
  readonly isPrimary?: boolean;
}

export interface FeaturedSamplesProps {
  readonly samples:       readonly Sample[];
  readonly title?:        string;
  readonly description?:  string;
  readonly className?:    string;
}

export interface SampleCardProps {
  readonly sample: SampleViewModel;
}

export interface SampleCardSkeletonProps {
  readonly index?: number;
}

export interface SectionHeaderProps {
  readonly id?:                  string;
  readonly title:                string;
  readonly description:          string;
  readonly backgroundLabel?:     string;
  readonly backgroundPosition?:  "left" | "right";
  readonly align?:               "left" | "center";
  readonly accentWord?:          string;
}

export interface TagChipProps {
  readonly name:      string;
  readonly slug:      string;
  readonly variant?:  "default" | "outline" | "muted";
}
