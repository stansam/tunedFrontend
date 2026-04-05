import { apiGet } from "@/api-client";
import { BlogsPageResponseSchema, BlogCategorySchema } from "@/lib/schemas/blog.schema";
import { z } from "zod";
import type { ApiResult } from "@/lib/types";
import type { 
  BlogQueryParams, 
  BlogsPageResponse,
  BlogCategory
} from "@/app/(main)/blogs/_types/blog.types";

export async function fetchBlogs(
  params: BlogQueryParams = {}
): Promise<ApiResult<BlogsPageResponse>> {
  const query = new URLSearchParams();

  if (params.q) query.set("q", params.q);
  if (params.category_id && params.category_id !== "all") {
    query.set("category_id", params.category_id);
  }
  if (params.sort) query.set("sort", params.sort);
  if (params.order) query.set("order", params.order);
  if (params.page) query.set("page", String(params.page));
  if (params.per_page) query.set("per_page", String(params.per_page));

  const qs = query.toString();
  const path = `/blogs${qs ? `?${qs}` : ""}`;

  const result = await apiGet<unknown>(path, {
    cache: "no-store",
  });

  if (!result.ok) return result as ApiResult<BlogsPageResponse>;

  const parsed = BlogsPageResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("BLOGS PARSE ERROR:", parsed.error.format());
      console.log("BLOGS RAW DATA:", result.data);
    }
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const normalizedErrors: Record<string, string[]> = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
    );

    return {
      ok: false,
      error: {
        message: "Invalid blogs response from server.",
        errors: normalizedErrors,
        status: "PARSE_ERROR",
      },
    };
  }

  const data: BlogsPageResponse = {
    ...parsed.data,
    data: parsed.data.data.map(item => ({
      ...item,
      tags: item.tags || [],
    })),
  };

  return {
    ok: true,
    data,
    message: "Blogs fetched successfully.",
    status: 200,
  };
}

export async function fetchBlogCategories(): Promise<ApiResult<readonly BlogCategory[]>> {
  const result = await apiGet<unknown>("/blogs/categories", {
    next: { revalidate: 3600 }
  });

  if (!result.ok) return result as ApiResult<readonly BlogCategory[]>;

  const parsed = z.array(BlogCategorySchema).safeParse(result.data);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.error("BLOG CATEGORIES PARSE ERROR:", parsed.error.flatten());
      console.log("BLOG CATEGORIES RAW DATA:", result.data);
    }
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const normalizedErrors: Record<string, string[]> = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
    );

    return {
      ok: false,
      error: {
        message: "Invalid blog categories response.",
        errors: normalizedErrors,
        status: "PARSE_ERROR",
      },
    };
  }

  return {
    ok: true,
    data: parsed.data,
    message: "Categories fetched successfully.",
    status: 200,
  };
}
