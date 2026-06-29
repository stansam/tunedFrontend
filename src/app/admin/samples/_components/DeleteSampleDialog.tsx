"use client";

import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DeleteSampleDialogProps } from "../_props/samples.props";

export function DeleteSampleDialog({
  isOpen,
  sample,
  onClose,
  onDelete,
  isDeleting,
}: DeleteSampleDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur-md shadow-lg max-w-sm text-slate-700">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-base font-bold text-slate-800">Delete Sample</DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium leading-relaxed">
            Are you sure you want to delete the sample <span className="font-semibold text-slate-700">&quot;{sample?.title}&quot;</span>? This action is permanent and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white text-xs font-bold px-4 py-2 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={onDelete}
            className="rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-xs px-4 py-2 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
