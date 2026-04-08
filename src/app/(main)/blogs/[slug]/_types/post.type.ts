import type { Tag, Slug, ISODateString, BlogPostId, CategoryId } from "@/app/(main)/_types";
import type { BlogCategory, BlogListItem } from "@/app/(main)/blogs/_types/blog.types";
// import type { AuthUser } from "@/lib/types/auth.type";

export type ReactionType = "like" | "dislike";

export interface CommentReaction {
  readonly id: string;
  readonly comment_id: string;
  readonly reaction_type: ReactionType;
  readonly user_id: string | null;
  readonly ip_address: string | null;
}

export interface BlogComment {
  readonly id: string;
  readonly post_id: string;
  readonly content: string;
  readonly name: string;
  readonly email: string;
  readonly user_id: string | null;
  readonly approved: boolean;
  readonly reactions: readonly CommentReaction[];
  readonly total_likes: number;
  readonly total_dislikes: number;
}

export interface BlogPost {
  readonly id: BlogPostId;
  readonly title: string;
  readonly content: string;
  readonly author: string;
  readonly category_id: CategoryId;
  readonly slug: Slug;
  readonly excerpt: string;
  readonly featured_image: string;
  readonly meta_description: string;
  readonly is_published: boolean;
  readonly is_featured: boolean;
  readonly published_at: ISODateString;
  readonly comments: readonly BlogComment[];
  readonly tags: readonly Tag[];
  readonly category?: BlogCategory | null;
}

export interface RelatedBlogsResponse {
  readonly data: readonly BlogListItem[];
}

export interface CommentFormValues {
  readonly name: string;
  readonly email: string;
  readonly content: string;
}

export interface BlogDetailPageParams {
  readonly params: Promise<{ slug: string }>;
}

export interface BlogPostViewModel {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly author: string;
  readonly authorInitials: string;
  readonly category: BlogCategory | null;
  readonly tags: readonly Tag[];
  readonly featuredImage: string;
  readonly publishedAt: string;
  readonly readTimeMinutes: number;
  readonly isFeatured: boolean;
  readonly commentCount: number;
  readonly comments: readonly BlogComment[];
}

export interface UseCommentsOptions {
  readonly postSlug: string;
  readonly initialComments: readonly BlogComment[];
}

export interface UseCommentsReturn {
  readonly visibleComments: readonly BlogComment[];
  readonly totalCount: number;
  readonly displayedCount: number;
  readonly hasMore: boolean;
  readonly isSubmitting: boolean;
  readonly submitError: string | null;
  readonly submitSuccess: boolean;
  readonly loadMore: () => void;
  readonly handleSubmit: (values: CommentFormValues) => Promise<boolean>;
  readonly handleReaction: (commentId: string, type: "like" | "dislike") => Promise<void>;
  readonly reactionCounts: Record<string, { likes: number; dislikes: number }>;
}

export type OptimisticAction =
  | { type: "ADD"; comment: BlogComment }
  | { type: "UPDATE_REACTION"; commentId: string; likes: number; dislikes: number }
  | { type: "REMOVE"; id: string };