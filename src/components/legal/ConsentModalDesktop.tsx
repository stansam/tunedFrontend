"use client";

import type { ConsentModalProps } from "@/lib/types/legal.type";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { ConsentInnerContent } from "./ConsentInnerContent";
import { ConsentSkeleton } from "./contents/LegalSkeletons";

export function ConsentModalDesktop({ isOpen, onAccept, onDecline, isLoading, isAccepting }: ConsentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isAccepting && onDecline()}>
      <DialogContent className="sm:max-w-md w-full p-6 rounded-2xl bg-white text-slate-800 border border-slate-100 shadow-xl" showCloseButton={false}>
        <DialogHeader className="pb-4 shrink-0">
          <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>We value your privacy</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 mt-1">
            Please review and accept our legal terms before proceeding.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <ConsentSkeleton />
        ) : (
          <>
            <div className="py-2">
              <ConsentInnerContent />
            </div>
            <DialogFooter className="pt-4 flex flex-row justify-end gap-2 shrink-0">
              <Button
                type="button"
                variant="ghost"
                onClick={onDecline}
                disabled={isAccepting}
                className="px-4 h-11 rounded-xl border border-slate-100 text-slate-500 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={onAccept}
                disabled={isAccepting}
                className="px-5 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white flex items-center gap-2 cursor-pointer"
              >
                {isAccepting ? (
                  <Loader2 size={14} className="animate-spin text-white" />
                ) : (
                  <>
                    <span>Accept Agreements</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
