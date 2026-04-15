import type { BlogPost, BlogComment, BlogPostViewModel, CommentFormValues } from "../_types/post.type";
import type { BlogListItem } from "@/app/(main)/blogs/_types/blog.types";
import type { AuthUser } from "@/lib/types/auth.type";

export interface BlogDetailHeroProps {
  readonly post: BlogPostViewModel;
}

export interface BlogContentProps {
  readonly post: BlogPostViewModel;
}

export interface BlogCommentsPanelProps {
  readonly postId: string;
  readonly postSlug: string;
  readonly comments: readonly BlogComment[];
  readonly isAuthenticated: boolean;
  readonly currentUser: AuthUser | null;
}

export interface BlogCommentItemProps {
  readonly comment: BlogComment;
  readonly isAuthenticated: boolean;
  readonly isBlurred: boolean;
}

export interface CommentFormProps {
  readonly postSlug: string;
  /**
   * Submission handler owned by the parent (CommentPanel via useComments).
   * Receives validated form values and returns true on success, false on failure.
   * CommentForm delegates the API call up to keep it as a pure UI component.
   */
  readonly onSubmitValues: (values: CommentFormValues) => Promise<boolean>;
  /** Submission-in-progress flag — controls button and field disabled state. */
  readonly isSubmitting: boolean;
  /** Server or network error to display inside the form. Null when no error. */
  readonly submitError: string | null;
  /** True when the most recent submission succeeded — shows success banner. */
  readonly submitSuccess: boolean;
}


export interface CommentsAuthGateProps {
  readonly visibleCount: number;
  readonly totalCount: number;
}

export interface RelatedBlogsSectionProps {
  readonly posts: readonly BlogListItem[];
  readonly currentSlug: string;
}

export interface BlogDetailSkeletonProps {
  readonly variant?: "hero" | "content" | "comments" | "related";
}

export interface BlogDetailClientProps {
  readonly post: BlogPost;
  readonly isAuthenticated: boolean;
  readonly currentUser: AuthUser | null;
}

export interface TocItem {
  readonly id: string;
  readonly text: string;
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;//2 | 3;
}

export interface TableOfContentsProps {
  readonly items: readonly TocItem[];
  readonly activeId: string;
}

export interface MobileTocProps {
  readonly items: readonly TocItem[];
}