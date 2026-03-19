import type {
  ServiceCategory,
  Sample,
  BlogPostResponse,
  BlogPostViewModel,
  SampleViewModel,
} from "../_types";

export interface ServicesMarqueeProps {
  readonly featuredServices: readonly ServiceCategory[];
}

export interface ServiceCardProps {
  readonly service: ServiceCategory;
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
