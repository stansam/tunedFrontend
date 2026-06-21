import { apiGet, apiPost, apiPatch, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import * as S from "../_schemas/blogs.schema";
import type * as T from "../_types/blogs.types";

function validate<Out, In>(
  res: ApiResult<In>,
  schema: { safeParse: (d: In) => { success: boolean; data?: Out } }
): ApiResult<Out> {
  if (!res.ok) return res as unknown as ApiResult<Out>;
  const p = schema.safeParse(res.data);
  if (!p.success) {
    return {
      ok: false,
      error: { message: "Response validation failed", errors: {}, status: 422 },
    };
  }
  return { ...res, data: p.data } as ApiResult<Out>;
}

export const fetchBlogStats = async (): Promise<ApiResult<T.AdminBlogStats>> =>
  validate(await apiGet("/admin/blogs/stats"), S.AdminBlogStatsSchema);

export const fetchBlogPosts = async (p: {
  page: number;
  per_page: number;
  category_id?: string;
  is_published?: boolean;
  q?: string;
}): Promise<ApiResult<T.AdminBlogPostListResponse>> =>
  validate(await apiPost("/admin/blogs/list", p), S.AdminBlogPostListResponseSchema);

export const fetchBlogCategories = async (): Promise<ApiResult<readonly T.AdminBlogCategoryResponse[]>> =>
  validate(await apiGet("/admin/blogs/categories"), S.AdminBlogCategoryResponseSchema.array());

export const createBlogCategory = async (
  d: T.AdminBlogCategoryMutation
): Promise<ApiResult<T.AdminBlogCategoryResponse>> =>
  validate(await apiPost("/admin/blogs/categories", d), S.AdminBlogCategoryResponseSchema);

export const updateBlogCategory = async (
  id: string,
  d: T.AdminBlogCategoryMutation
): Promise<ApiResult<T.AdminBlogCategoryResponse>> =>
  validate(await apiPatch(`/admin/blogs/categories/${id}`, d), S.AdminBlogCategoryResponseSchema);

export const deleteBlogCategory = (id: string): Promise<ApiResult<void>> =>
  apiDelete(`/admin/blogs/categories/${id}`);

export const fetchBlogPostBySlug = async (slug: string): Promise<ApiResult<T.AdminBlogPostResponse>> =>
  validate(await apiGet(`/admin/blogs/posts/${slug}`), S.AdminBlogPostResponseSchema);

export const createBlogPost = async (
  d: T.AdminBlogPostMutation
): Promise<ApiResult<T.AdminBlogPostResponse>> =>
  validate(await apiPost("/admin/blogs/posts", d), S.AdminBlogPostResponseSchema);

export const updateBlogPost = async (
  id: string,
  d: T.AdminBlogPostMutation
): Promise<ApiResult<T.AdminBlogPostResponse>> =>
  validate(await apiPatch(`/admin/blogs/posts/${id}`, d), S.AdminBlogPostResponseSchema);

export const deleteBlogPost = (id: string): Promise<ApiResult<void>> =>
  apiDelete(`/admin/blogs/posts/${id}`);

export const togglePublishPost = async (
  id: string,
  publish: boolean
): Promise<ApiResult<T.AdminBlogPostResponse>> =>
  validate(
    await apiPatch(`/admin/blogs/posts/${id}/publish`, { is_published: publish }),
    S.AdminBlogPostResponseSchema
  );

export const toggleFeaturePost = async (
  id: string,
  feature: boolean
): Promise<ApiResult<T.AdminBlogPostResponse>> =>
  validate(
    await apiPatch(`/admin/blogs/posts/${id}/feature`, { is_featured: feature }),
    S.AdminBlogPostResponseSchema
  );

export const fetchPostComments = async (
  postId: string
): Promise<ApiResult<readonly T.AdminBlogCommentResponse[]>> =>
  validate(await apiGet(`/admin/blogs/posts/${postId}/comments`), S.AdminBlogCommentResponseSchema.array());

export const approveComment = async (
  id: string,
  approved: boolean
): Promise<ApiResult<T.AdminBlogCommentResponse>> =>
  validate(await apiPatch(`/admin/blogs/comments/${id}/approve`, { approved }), S.AdminBlogCommentResponseSchema);

export const deleteComment = (id: string): Promise<ApiResult<void>> =>
  apiDelete(`/admin/blogs/comments/${id}`);

export const uploadMedia = async (file: File): Promise<ApiResult<{ id: string; storage_path: string }>> => {
  const form = new FormData();
  form.append("file", file);
  return apiPost("/media/upload", form);
};
