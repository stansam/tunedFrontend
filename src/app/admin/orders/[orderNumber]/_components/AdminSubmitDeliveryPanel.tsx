"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AdminSubmitDeliveryPanelProps } from "../_props";
import { useAdminSubmitDelivery } from "../_hooks/useAdminSubmitDelivery";

export function AdminSubmitDeliveryPanel({ orderId, onSuccess }: AdminSubmitDeliveryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    deliveryFiles,
    setDeliveryFiles,
    plagiarismFiles,
    setPlagiarismFiles,
    submit,
    isSubmitting,
    error,
  } = useAdminSubmitDelivery(orderId, () => {
    setIsOpen(false);
    onSuccess();
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isPlag: boolean) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    if (isPlag) {
      setPlagiarismFiles((prev) => [...prev, ...filesArray]);
    } else {
      setDeliveryFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (idx: number, isPlag: boolean) => {
    if (isPlag) {
      setPlagiarismFiles((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setDeliveryFiles((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="bg-white/40 border border-white/50 rounded-xl overflow-hidden shadow-xs">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 h-auto hover:bg-white/60 transition-colors text-sm font-semibold text-slate-800 rounded-none cursor-pointer"
      >
        <span>Submit Delivery Files</span>
        <span>{isOpen ? "Collapse ▲" : "Expand ▼"}</span>
      </Button>

      {isOpen && (
        <div className="p-5 border-t border-slate-200/50 space-y-4 text-xs text-slate-800">
          {error && <div className="text-red-800 bg-red-50 border border-red-200/50 p-2.5 rounded">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-slate-500 block font-medium">Delivery Files (PDF, ZIP, DOCX, etc)</span>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(e, false)}
                className="w-full text-slate-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
              />
              <div className="space-y-1">
                {deliveryFiles.map((f, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/20 border border-slate-200/50 p-2 rounded">
                    <span className="truncate max-w-[150px] text-slate-700">{f.name}</span>
                    <Button variant="link" size="sm" onClick={() => removeFile(i, false)} className="text-red-600 hover:text-red-700 font-bold p-0 h-auto cursor-pointer">Remove</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-slate-500 block font-medium">Plagiarism Reports (PDF only)</span>
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={(e) => handleFileChange(e, true)}
                className="w-full text-slate-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
              />
              <div className="space-y-1">
                {plagiarismFiles.map((f, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/20 border border-slate-200/50 p-2 rounded">
                    <span className="truncate max-w-[150px] text-slate-700">{f.name}</span>
                    <Button variant="link" size="sm" onClick={() => removeFile(i, true)} className="text-red-600 hover:text-red-700 font-bold p-0 h-auto cursor-pointer">Remove</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={submit}
              disabled={isSubmitting || deliveryFiles.length === 0}
              className="px-4 h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Delivery"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
