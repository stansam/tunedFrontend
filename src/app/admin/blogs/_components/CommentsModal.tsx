import type { CommentsModalProps } from "../_props/blogs.props";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Check, User, Mail, ThumbsUp, ThumbsDown } from "lucide-react";

export function CommentsModal({ isOpen, post, comments, loading, onClose, onApprove, onDelete }: CommentsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col bg-slate-50/90 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl">
        <DialogHeader className="shrink-0 border-b border-white/10 pb-4">
          <DialogTitle className="text-slate-900 font-bold flex flex-col gap-1">
            <span>Comments Moderation</span>
            <span className="text-xs text-slate-500 font-normal line-clamp-1">Post: {post?.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {loading ? (
            <div className="h-48 flex items-center justify-center text-slate-500 animate-pulse">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-500">No comments on this post yet.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-xl border border-white/40 bg-white/40 shadow-xs space-y-2 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                      <User className="size-3.5 text-slate-400" />
                      <span>{comment.name || "Anonymous"}</span>
                    </div>
                    {comment.email && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Mail className="size-3 text-slate-400" />
                        <span>{comment.email}</span>
                      </div>
                    )}
                  </div>
                  <Badge variant={comment.approved ? "default" : "secondary"}>
                    {comment.approved ? "Approved" : "Pending"}
                  </Badge>
                </div>

                <p className="text-sm text-slate-700 bg-white/30 rounded-lg p-2.5 border border-white/10">{comment.content}</p>

                <div className="flex justify-between items-center pt-2 text-xs text-slate-500 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><ThumbsUp className="size-3 text-emerald-500" /> {comment.total_likes ?? 0}</span>
                    <span className="flex items-center gap-1"><ThumbsDown className="size-3 text-rose-500" /> {comment.total_dislikes ?? 0}</span>
                  </div>
                  <div className="flex gap-1">
                    {!comment.approved && (
                      <Button size="sm" variant="outline" className="h-7 text-xs bg-emerald-50/50 text-emerald-600 border-emerald-200 hover:bg-emerald-50" onClick={() => onApprove(comment.id)}>
                        <Check className="size-3 mr-1" /> Approve
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="h-7 text-xs bg-rose-50/50 text-rose-600 border-rose-200 hover:bg-rose-50" onClick={() => onDelete(comment.id)}>
                      <Trash2 className="size-3 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
