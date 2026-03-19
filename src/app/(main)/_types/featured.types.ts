import type {
  Service,
  Sample,
  BlogPostResponse,
  BlogPostViewModel,
  SampleViewModel,
} from "../_types";

export interface FeaturedContentSeed {
  readonly services: readonly Service[];
  readonly samples:  readonly Sample[];
  readonly blogs:    readonly BlogPostResponse[];
}

export interface UseFeaturedContentReturn {
  readonly blogPosts:       readonly BlogPostViewModel[];
  readonly featuredBlogs:   readonly BlogPostViewModel[];
  readonly samples:         readonly SampleViewModel[];
  readonly featuredSamples: readonly SampleViewModel[];
  readonly services:        readonly Service[];
  readonly hasBlogs:        boolean;
  readonly hasSamples:      boolean;
}
