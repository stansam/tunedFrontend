import { useQuery } from "@tanstack/react-query";
import {
  fetchBlogStats,
  fetchBlogPosts,
  fetchBlogCategories,
  fetchBlogPostBySlug,
  fetchPostComments,
} from "../_services/blogs.service";
import {
  FALLBACK_BLOG_STATS,
  FALLBACK_BLOG_POSTS,
  FALLBACK_BLOG_CATEGORIES,
  FALLBACK_BLOG_COMMENTS,
} from "../_fallbacks/blogs.fallback";

export function useBlogStatsQuery() {
  return useQuery({
    queryKey: ["admin", "blogs", "stats"],
    queryFn: async () => {
      const res = await fetchBlogStats();
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") return FALLBACK_BLOG_STATS;
        throw new Error(res.error?.message || "Failed to load blog stats");
      }
      return res.data;
    },
    staleTime: 30_000,
  });
}

export function useBlogPostsQuery(filters: {
  page: number;
  per_page: number;
  category_id?: string;
  is_published?: boolean;
  q?: string;
}) {
  return useQuery({
    queryKey: ["admin", "blogs", "list", filters],
    queryFn: async () => {
      const res = await fetchBlogPosts(filters);
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") {
          return {
            blogs: FALLBACK_BLOG_POSTS,
            total: FALLBACK_BLOG_POSTS.length,
            page: filters.page,
            per_page: filters.per_page,
          };
        }
        throw new Error(res.error?.message || "Failed to load blog posts");
      }
      return res.data;
    },
    staleTime: 15_000,
  });
}

export function useBlogCategoriesQuery() {
  return useQuery({
    queryKey: ["admin", "blogs", "categories"],
    queryFn: async () => {
      const res = await fetchBlogCategories();
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") return FALLBACK_BLOG_CATEGORIES;
        throw new Error(res.error?.message || "Failed to load categories");
      }
      return res.data;
    },
    staleTime: 30_000,
  });
}

export function useBlogPostDetailsQuery(slug: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["admin", "blogs", "post", slug],
    queryFn: async () => {
      const res = await fetchBlogPostBySlug(slug);
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") {
          const matched = FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);
          if (matched) return matched;
        }
        throw new Error(res.error?.message || "Failed to load blog post details");
      }
      return res.data;
    },
    staleTime: 30_000,
    enabled: enabled && !!slug,
  });
}

export function usePostCommentsQuery(postId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["admin", "blogs", "post", postId, "comments"],
    queryFn: async () => {
      const res = await fetchPostComments(postId);
      if (!res.ok) {
        if (process.env.NODE_ENV !== "production") return FALLBACK_BLOG_COMMENTS;
        throw new Error(res.error?.message || "Failed to load comments");
      }
      return res.data;
    },
    staleTime: 15_000,
    enabled: enabled && !!postId,
  });
}
