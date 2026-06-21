import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSample, updateSample, deleteSample } from "../_services/samples.service";
import type { AdminSampleMutation } from "../_types/samples.type";

export function useSampleMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "samples"] });
  };

  const createMut = useMutation({
    mutationFn: createSample,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Sample created successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to create sample");
      }
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminSampleMutation }) =>
      updateSample(id, data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Sample updated successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to update sample");
      }
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteSample,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Sample deleted successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to delete sample");
      }
    },
  });

  return { createMut, updateMut, deleteMut };
}
