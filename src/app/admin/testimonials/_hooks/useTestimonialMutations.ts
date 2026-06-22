import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { approveTestimonial, updateTestimonial, deleteTestimonial } from "../_services/testimonials.service";
import type { AdminTestimonialMutation } from "../_types/testimonials.type";

export function useTestimonialMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
    queryClient.invalidateQueries({ queryKey: ["admin-nav-stats"] });
  };

  const approveMut = useMutation({
    mutationFn: approveTestimonial,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Testimonial approved successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to approve testimonial");
      }
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminTestimonialMutation }) =>
      updateTestimonial(id, data),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Testimonial updated successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to update testimonial");
      }
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: (res) => {
      if (res.ok) {
        toast.success("Testimonial deleted successfully");
        invalidate();
      } else {
        toast.error(res.error?.message || "Failed to delete testimonial");
      }
    },
  });

  return { approveMut, updateMut, deleteMut };
}
