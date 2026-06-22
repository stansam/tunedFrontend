"use client";

import type { PolicyType, LegalModalProps } from "@/lib/types/legal.type";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { TermsContent } from "./contents/TermsContent";
import { PrivacyContent } from "./contents/PrivacyContent";
import { RefundContent } from "./contents/RefundContent";
import { SecurityContent } from "./contents/SecurityContent";
import { ShieldCheck, Scale, FileText, LockOpen, LucideIcon } from "lucide-react";

const TITLE_MAP: Record<PolicyType, string> = {
  terms: "Terms of Service",
  privacy: "Privacy Policy",
  refund: "Refund Policy",
  security: "Security Guarantee",
};

const DESC_MAP: Record<PolicyType, string> = {
  terms: "Please review our honor code, fair use policy, and terms of website use.",
  privacy: "Learn about what data we collect, how it is secured, and CCPA/GDPR controls.",
  refund: "Review the eligibility criteria for full, partial, and non-eligible refunds.",
  security: "Discover how we protect your files, encrypt sessions, and secure payment data.",
};

const ICON_MAP: Record<PolicyType, LucideIcon> = {
  terms: Scale,
  privacy: ShieldCheck,
  refund: FileText,
  security: LockOpen,
};

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const isMobile = useIsMobile();

  if (!type) return null;

  const title = TITLE_MAP[type];
  const description = DESC_MAP[type];
  const Icon = ICON_MAP[type];

  const renderContent = () => {
    switch (type) {
      case "terms":
        return <TermsContent />;
      case "privacy":
        return <PrivacyContent />;
      case "refund":
        return <RefundContent />;
      case "security":
        return <SecurityContent />;
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="px-4 pb-8 max-h-[85vh] bg-white text-slate-800">
          <DrawerHeader className="px-0 pb-4 text-left border-b border-slate-100 shrink-0">
            <DrawerTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Icon className="h-5 w-5 text-emerald-600" />
              <span>{title}</span>
            </DrawerTitle>
            <DrawerDescription className="text-xs text-slate-400 mt-1">
              {description}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto pr-1 py-4 custom-scrollbar">
            {renderContent()}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] w-full max-h-[85vh] flex flex-col p-6 rounded-2xl bg-white text-slate-800 border border-slate-100 shadow-xl">
        <DialogHeader className="pb-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Icon className="h-5 w-5 text-emerald-600" />
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400 mt-1">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-0 pt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
