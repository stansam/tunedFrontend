import { apiGet, apiPost } from "@/api-client";
import { BlogPostSchema, RelatedBlogsResponseSchema, CommentFormSchema, BlogCommentSchema } from "@/lib/schemas/post.schema";
import type { ApiResult } from "@/lib/types";
import type { BlogPost, BlogComment, CommentFormValues, RelatedBlogsResponse } from "@/app/(main)/blogs/[slug]/_types/post.type";
import type { BlogListItem } from "@/app/(main)/blogs/_types/blog.types";
import { z } from "zod";

export async function fetchBlogPost(
  slug: string
): Promise<ApiResult<BlogPost>> {
  const result = await apiGet<unknown>(`/blogs/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });

  if (!result.ok) return result as ApiResult<BlogPost>;

  const parsed = BlogPostSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[BlogDetail] PARSE ERROR:", parsed.error.format());
      console.log("[BlogDetail] RAW:", result.data);
    }
    return {
      ok: false,
      error: {
        message: "Invalid blog post response from server.",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data as BlogPost,
    message: "Blog post fetched successfully.",
    status: 200,
  };
}

export async function fetchRelatedBlogs(
  categoryId: string,
  excludeSlug: string
): Promise<ApiResult<readonly BlogListItem[]>> {
  const result = await apiGet<unknown>(
    `/blogs/${encodeURIComponent(categoryId)}/related?exclude=${encodeURIComponent(excludeSlug)}&per_page=3`,
    { next: { revalidate: 120 } }
  );

  if (!result.ok) return result as ApiResult<readonly BlogListItem[]>;

  const raw =
    Array.isArray(result.data)
      ? { data: result.data }
      : result.data;

  const parsed = RelatedBlogsResponseSchema.safeParse(raw);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[RelatedBlogs] PARSE ERROR:", parsed.error.format());
    }
    return {
      ok: false,
      error: {
        message: "Invalid related blogs response.",
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  const items = parsed.data.data.filter((p) => p.slug !== excludeSlug);

  return {
    ok: true,
    data: items as readonly BlogListItem[],
    message: "Related blogs fetched.",
    status: 200,
  };
}

export async function submitComment(
  slug: string,
  values: CommentFormValues
): Promise<ApiResult<BlogComment>> {
  const validated = CommentFormSchema.safeParse(values);
  if (!validated.success) {
    return {
      ok: false,
      error: {
        message: "Please fix the form errors before submitting.",
        errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        status: "PARSE_ERROR",
      },
    };
  }

  const result = await apiPost<unknown>(
    `/blogs/${encodeURIComponent(slug)}/comments`,
    validated.data
  );

  if (!result.ok) return result as ApiResult<BlogComment>;

  const parsed = BlogCommentSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[SubmitComment] PARSE ERROR:", parsed.error.format());
    }
    return {
      ok: false,
      error: {
        message: "Comment was submitted but could not be parsed.",
        errors: {},
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data as BlogComment,
    message: "Comment submitted for review.",
    status: 201,
  };
}

export async function reactToComment(
  commentId: string,
  reactionType: "like" | "dislike"
): Promise<ApiResult<{ total_likes: number; total_dislikes: number }>> {
  const result = await apiPost<unknown>(
    `/comments/${encodeURIComponent(commentId)}/reactions`,
    { reaction_type: reactionType }
  );

  if (!result.ok) return result as ApiResult<{ total_likes: number; total_dislikes: number }>;

  const parsed = z
    .object({ total_likes: z.number(), total_dislikes: z.number() })
    .safeParse(result.data);

  if (!parsed.success) {
    return { ok: true, data: { total_likes: 0, total_dislikes: 0 }, message: "", status: 200 };
  }

  return { ok: true, data: parsed.data, message: "", status: 200 };
}