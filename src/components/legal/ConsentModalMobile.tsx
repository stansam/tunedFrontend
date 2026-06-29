"use client";

import type { ConsentModalProps } from "@/lib/types/legal.type";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { ConsentInnerContent } from "./ConsentInnerContent";
import { ConsentSkeleton } from "./contents/LegalSkeletons";

export function ConsentModalMobile({ isOpen, onAccept, onDecline, isLoading, isAccepting }: ConsentModalProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && !isAccepting && onDecline()}>
      <DrawerContent className="px-4 pb-8 bg-white text-slate-800">
        <DrawerHeader className="px-0 pb-4 text-left shrink-0">
          <DrawerTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>We value your privacy</span>
          </DrawerTitle>
          <DrawerDescription className="text-xs text-slate-400 mt-1">
            Please review and accept our legal terms before proceeding.
          </DrawerDescription>
        </DrawerHeader>

        {isLoading ? (
          <ConsentSkeleton />
        ) : (
          <>
            <div className="py-2">
              <ConsentInnerContent />
            </div>
            <DrawerFooter className="px-0 pt-4 flex flex-col gap-2 shrink-0">
              <Button
                type="button"
                onClick={onAccept}
                disabled={isAccepting}
                className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer"
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
              <Button
                type="button"
                variant="ghost"
                onClick={onDecline}
                disabled={isAccepting}
                className="w-full h-11 rounded-xl border border-slate-100 text-slate-500 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
