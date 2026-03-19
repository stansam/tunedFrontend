/**
 * view-model.mappers.ts
 *
 * Pure transformation functions that convert raw API response objects
 * to UI-ready view models. No side-effects, no `any`, fully typed.
 */

import type {
  BlogPostResponse,
  BlogPostViewModel,
  Sample,
  SampleViewModel,
} from "../_types";

// ─── Constants ────────────────────────────────────────────────────────────────

/** Average adult reading speed in words per minute */
const WORDS_PER_MINUTE = 200;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function estimateReadTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

// ─── Blog Post ────────────────────────────────────────────────────────────────

export function toBlogPostViewModel(post: BlogPostResponse): BlogPostViewModel {
  return {
    id:              post.id,
    title:           post.title,
    author:          post.author,
    slug:            post.slug,
    excerpt:         post.excerpt,
    featuredImage:   post.featured_image,
    categoryId:      post.category_id,
    tags:            post.tags,
    publishedAt:     post.published_at,
    isFeatured:      post.is_featured,
    readTimeMinutes: estimateReadTime(post.content),
  };
}

export function toBlogPostViewModels(
  posts: readonly BlogPostResponse[]
): BlogPostViewModel[] {
  return posts
    .filter((p) => p.is_published)
    .map(toBlogPostViewModel);
}

// ─── Sample ───────────────────────────────────────────────────────────────────

export function toSampleViewModel(sample: Sample): SampleViewModel {
  return {
    id:         sample.id,
    title:      sample.title,
    slug:       sample.slug,
    excerpt:    sample.excerpt,
    serviceId:  sample.service_id,
    wordCount:  sample.word_count,
    isFeatured: sample.featured,
    image:      sample.image,
    tags:       sample.tags,
  };
}

export function toSampleViewModels(
  samples: readonly Sample[]
): SampleViewModel[] {
  return samples.map(toSampleViewModel);
}

// ─── Date formatting ──────────────────────────────────────────────────────────

/**
 * Formats a UTC ISO-8601 date string into a human-readable display string.
 * e.g. "2026-02-14T08:00:00.000Z" → "Feb 14, 2026"
 */
export function formatPublishedDate(isoString: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year:  "numeric",
      month: "short",
      day:   "numeric",
    }).format(new Date(isoString));
  } catch {
    return "";
  }
}
