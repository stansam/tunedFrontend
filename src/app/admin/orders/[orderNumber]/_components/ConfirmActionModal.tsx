"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ConfirmActionModalProps } from "../_props";

export function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isPending = false,
  variant = "default",
}: ConfirmActionModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const getButtonClass = () => {
    if (variant === "destructive") {
      return "bg-red-600 hover:bg-red-700 text-white rounded-xl h-9 text-xs";
    }
    if (variant === "emerald") {
      return "bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 text-xs";
    }
    return "bg-slate-800 hover:bg-slate-900 text-white rounded-xl h-9 text-xs";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl max-w-sm border-white/50 bg-white/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-800">{title}</DialogTitle>
          <DialogDescription className="text-xs text-slate-500 pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-2 justify-end pt-4">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-9 text-xs" disabled={isPending}>
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={getButtonClass()}
            disabled={isPending}
          >
            {isPending ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
