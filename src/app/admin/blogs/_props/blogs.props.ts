import type { 
  AdminBlogPostResponse, 
  AdminBlogCategoryResponse, 
  AdminBlogCommentResponse, 
  AdminBlogStats 
} from "../_types/blogs.types";

export interface BlogsKPICardsProps {
  readonly stats: AdminBlogStats | null;
  readonly loading: boolean;
}

export interface BlogsTableProps {
  readonly blogs: readonly AdminBlogPostResponse[];
  readonly loading: boolean;
  readonly page: number;
  readonly total: number;
  readonly perPage: number;
  readonly onPageChange: (page: number) => void;
  readonly onEdit: (slug: string) => void;
  readonly onDelete: (id: string) => void;
  readonly onPublishToggle: (id: string, published: boolean) => void;
  readonly onFeatureToggle: (id: string, featured: boolean) => void;
  readonly onViewComments: (post: AdminBlogPostResponse) => void;
}

export interface CategoryListProps {
  readonly categories: readonly AdminBlogCategoryResponse[];
  readonly loading: boolean;
  readonly onCreate: () => void;
  readonly onEdit: (category: AdminBlogCategoryResponse) => void;
  readonly onDelete: (id: string) => void;
}

export interface CategoryModalProps {
  readonly isOpen: boolean;
  readonly category: AdminBlogCategoryResponse | null;
  readonly onClose: () => void;
  readonly onSave: (data: { name: string; description: string }) => void;
  readonly isSaving: boolean;
}

export interface CommentsModalProps {
  readonly isOpen: boolean;
  readonly post: AdminBlogPostResponse | null;
  readonly comments: readonly AdminBlogCommentResponse[];
  readonly loading: boolean;
  readonly onClose: () => void;
  readonly onApprove: (id: string) => void;
  readonly onDelete: (id: string) => void;
}

export interface BlogsToolbarProps {
  readonly search: string;
  readonly onSearchChange: (val: string) => void;
  readonly categoryId: string;
  readonly onCategoryChange: (val: string) => void;
  readonly status: string;
  readonly onStatusChange: (val: string) => void;
  readonly categories: readonly AdminBlogCategoryResponse[];
  readonly onCreatePost: () => void;
  readonly activeTab: "posts" | "categories";
  readonly onTabChange: (val: "posts" | "categories") => void;
}

export interface BlogsPaginationProps {
  readonly page: number;
  readonly total: number;
  readonly onPageChange: (p: number) => void;
}

export interface BlogsTableMobileProps {
  readonly blogs: readonly AdminBlogPostResponse[];
  readonly onEdit: (slug: string) => void;
  readonly onDelete: (id: string) => void;
  readonly onPublishToggle: (id: string, published: boolean) => void;
  readonly onFeatureToggle: (id: string, featured: boolean) => void;
  readonly onViewComments: (post: AdminBlogPostResponse) => void;
}