import type { BlogPost, BlogComment, BlogPostViewModel } from "../_types/post.type";
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
  readonly onSuccess: (comment: BlogComment) => void;
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