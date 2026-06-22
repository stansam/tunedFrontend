"use client";

import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DeleteTestimonialDialogProps } from "../_props/testimonials.props";

export function DeleteTestimonialDialog({
  isOpen,
  testimonial,
  onClose,
  onDelete,
  isDeleting,
}: DeleteTestimonialDialogProps) {
  const clientName = testimonial?.user?.name || "Anonymous Client";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur-md shadow-lg max-w-sm text-slate-700">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-base font-bold text-slate-800">Delete Testimonial</DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium leading-relaxed">
            Are you sure you want to delete the testimonial by <span className="font-semibold text-slate-700">&quot;{clientName}&quot;</span>? This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white text-xs font-bold px-4 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={onDelete}
            className="rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-xs px-4 py-2 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
