import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from "../_services/services.service";
import type { CategoryMutationPayload, ServiceMutationPayload } from "../_types/services.types";

export function useServiceMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "services"] });
  };

  const createCategory = useMutation({
    mutationFn: (data: CategoryMutationPayload) => createAdminCategory(data),
    onSuccess: (res) => {
      if (res.ok) { toast.success("Category created successfully"); invalidate(); }
      else { toast.error(res.error?.message || "Failed to create category"); }
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryMutationPayload }) =>
      updateAdminCategory(id, data),
    onSuccess: (res) => {
      if (res.ok) { toast.success("Category updated successfully"); invalidate(); }
      else { toast.error(res.error?.message || "Failed to update category"); }
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => deleteAdminCategory(id),
    onSuccess: (res) => {
      if (res.ok) { toast.success("Category deleted successfully"); invalidate(); }
      else { toast.error(res.error?.message || "Failed to delete category"); }
    },
  });

  const createService = useMutation({
    mutationFn: (data: ServiceMutationPayload) => createAdminService(data),
    onSuccess: (res) => {
      if (res.ok) { toast.success("Service created successfully"); invalidate(); }
      else { toast.error(res.error?.message || "Failed to create service"); }
    },
  });

  const updateService = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServiceMutationPayload }) =>
      updateAdminService(id, data),
    onSuccess: (res) => {
      if (res.ok) { toast.success("Service updated successfully"); invalidate(); }
      else { toast.error(res.error?.message || "Failed to update service"); }
    },
  });

  const deleteService = useMutation({
    mutationFn: (id: string) => deleteAdminService(id),
    onSuccess: (res) => {
      if (res.ok) { toast.success("Service deleted successfully"); invalidate(); }
      else { toast.error(res.error?.message || "Failed to delete service"); }
    },
  });

  return { createCategory, updateCategory, deleteCategory, createService, updateService, deleteService };
}
