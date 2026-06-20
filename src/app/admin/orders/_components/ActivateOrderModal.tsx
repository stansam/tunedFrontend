"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ActivateOrderModalProps } from "../_props/orders.props";

export function ActivateOrderModal({ orderId, onClose, onActivateConfirm }: ActivateOrderModalProps) {
  const handleConfirm = () => {
    onActivateConfirm();
    onClose();
  };

  return (
    <Dialog open={orderId !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl max-w-sm border-white/50 bg-white/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-800">Activate Order</DialogTitle>
          <DialogDescription className="text-xs text-slate-500 pt-1">
            Are you sure you want to activate this order? This will transition its status from Pending to Active (In Progress).
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row gap-2 justify-end pt-4">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-9 text-xs">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 text-xs"
          >
            Confirm Activation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
