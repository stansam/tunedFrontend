import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  approveComment,
  deleteComment,
} from "../_services/blogs.service";

export function useCommentMutations() {
  const queryClient = useQueryClient();

  const invalidate = (postId?: string) => {
    queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
    if (postId) {
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs", "post", postId, "comments"] });
    }
  };

  const approveComm = useMutation({
    mutationFn: (vars: { id: string; approved: boolean; postId?: string }) =>
      approveComment(vars.id, vars.approved),
    onSuccess: (res, variables) => {
      if (res.ok) {
        toast.success(variables.approved ? "Comment approved successfully" : "Comment unapproved");
        invalidate(variables.postId);
      } else {
        toast.error(res.error?.message || "Failed to update comment status");
      }
    },
  });

  const deleteComm = useMutation({
    mutationFn: (vars: { id: string; postId?: string }) => deleteComment(vars.id),
    onSuccess: (res, variables) => {
      if (res.ok) {
        toast.success("Comment deleted successfully");
        invalidate(variables.postId);
      } else {
        toast.error(res.error?.message || "Failed to delete comment");
      }
    },
  });

  return { approveComm, deleteComm };
}
