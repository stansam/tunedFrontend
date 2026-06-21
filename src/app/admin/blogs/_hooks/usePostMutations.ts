import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  togglePublishPost,
  toggleFeaturePost,
} from "../_services/blogs.service";
import type { AdminBlogPostMutation } from "../_types/blogs.types";

export function usePostMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
  };

  const createPost = useMutation({
    mutationFn: createBlogPost,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Blog post created successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to create blog post");
      }
    },
  });

  const updatePost = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminBlogPostMutation }) =>
      updateBlogPost(id, data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Blog post updated successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to update blog post");
      }
    },
  });

  const deletePost = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Blog post deleted successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to delete blog post");
      }
    },
  });

  const togglePublish = useMutation({
    mutationFn: ({ id, publish }: { id: string; publish: boolean }) =>
      togglePublishPost(id, publish),
    onSuccess: (res, variables) => {
      if (res.ok) {
        toast.success(variables.publish ? "Post published successfully" : "Post reverted to draft");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to update publish status");
      }
    },
  });

  const toggleFeature = useMutation({
    mutationFn: ({ id, feature }: { id: string; feature: boolean }) =>
      toggleFeaturePost(id, feature),
    onSuccess: (res, variables) => {
      if (res.ok) {
        toast.success(variables.feature ? "Post featured successfully" : "Post unfeatured");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to update featured status");
      }
    },
  });

  return { createPost, updatePost, deletePost, togglePublish, toggleFeature };
}
