import { z } from "zod";
import * as schemas from "../_schemas/blogs.schema";

export type AdminBlogCategoryResponse = z.infer<typeof schemas.AdminBlogCategoryResponseSchema>;
export type AdminBlogCategoryMutation = z.infer<typeof schemas.AdminBlogCategoryMutationSchema>;
export type AdminTagResponse = z.infer<typeof schemas.AdminTagResponseSchema>;
export type AdminCommentReactionResponse = z.infer<typeof schemas.AdminCommentReactionResponseSchema>;
export type AdminBlogCommentResponse = z.infer<typeof schemas.AdminBlogCommentResponseSchema>;
export type AdminBlogPostResponse = z.infer<typeof schemas.AdminBlogPostResponseSchema>;
export type AdminBlogPostMutation = z.infer<typeof schemas.AdminBlogPostMutationSchema>;
export type AdminBlogPostListResponse = z.infer<typeof schemas.AdminBlogPostListResponseSchema>;
export type AdminBlogStats = z.infer<typeof schemas.AdminBlogStatsSchema>;
