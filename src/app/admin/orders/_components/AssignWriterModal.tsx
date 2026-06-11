"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { AssignWriterModalProps } from "../_props/orders.props";

export function AssignWriterModal({ orderId, writers, onClose, onAssignConfirm }: AssignWriterModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedId) {
      onAssignConfirm(selectedId);
      onClose();
    }
  };

  return (
    <Dialog open={orderId !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl max-w-sm border-white/50 bg-white/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-800">Assign Writer</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2 max-h-[300px] overflow-y-auto pr-1">
          {writers.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedId(w.id)}
              className={`flex items-center justify-between w-full p-2.5 rounded-xl border text-left transition-all ${
                selectedId === w.id
                  ? "border-emerald-500 bg-emerald-50/50 shadow-xs"
                  : "border-slate-200/60 hover:bg-slate-55/40"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-800">{w.name}</span>
                <span className="text-[10px] text-slate-500">{w.orders_count} active orders</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                w.status === "Busy" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {w.status}
              </span>
            </button>
          ))}
        </div>

        <DialogFooter className="flex flex-row gap-2 justify-end pt-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-9 text-xs">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedId}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 text-xs"
          >
            Confirm Assignment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
