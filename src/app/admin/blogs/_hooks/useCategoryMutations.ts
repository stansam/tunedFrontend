import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from "../_services/blogs.service";
import type { AdminBlogCategoryMutation } from "../_types/blogs.types";

export function useCategoryMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
  };

  const createCategory = useMutation({
    mutationFn: createBlogCategory,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Category created successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to create category");
      }
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminBlogCategoryMutation }) =>
      updateBlogCategory(id, data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Category updated successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to update category");
      }
    },
  });

  const deleteCategory = useMutation({
    mutationFn: deleteBlogCategory,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Category deleted successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to delete category");
      }
    },
  });

  return { createCategory, updateCategory, deleteCategory };
}
