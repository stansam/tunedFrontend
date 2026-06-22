"use client";

import { useLegalModal } from "@/lib/contexts/LegalModalContext";
import { ShieldCheck, ExternalLink } from "lucide-react";

export function ConsentInnerContent() {
  const { openModal } = useLegalModal();

  return (
    <div className="space-y-4 text-slate-700 leading-relaxed text-xs">
      <div className="flex items-start gap-3 bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl text-emerald-950 font-medium">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          We updated our policies to ensure compliance with data standards. Please accept our Terms and Privacy to
          continue using your dashboard and placing essay orders.
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-slate-900 text-xs">Review agreements:</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => openModal("terms")}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-left font-semibold text-slate-800 transition-all text-xs w-full cursor-pointer"
          >
            <span>Terms of Service</span>
            <ExternalLink size={12} className="text-slate-400" />
          </button>
          <button
            type="button"
            onClick={() => openModal("privacy")}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-left font-semibold text-slate-800 transition-all text-xs w-full cursor-pointer"
          >
            <span>Privacy Policy</span>
            <ExternalLink size={12} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
