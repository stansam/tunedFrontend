"use client";

import { useState } from "react";
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
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 hover:bg-white/5 transition-colors text-sm font-semibold text-white"
      >
        <span>Submit Delivery Files</span>
        <span>{isOpen ? "Collapse ▲" : "Expand ▼"}</span>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-white/10 space-y-4 text-xs">
          {error && <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-slate-400 block font-medium">Delivery Files (PDF, ZIP, DOCX, etc)</span>
              <input type="file" multiple onChange={(e) => handleFileChange(e, false)} className="w-full text-slate-300" />
              <div className="space-y-1">
                {deliveryFiles.map((f, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-900/40 p-2 rounded">
                    <span className="truncate max-w-[150px]">{f.name}</span>
                    <button onClick={() => removeFile(i, false)} className="text-red-400 font-bold hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 block font-medium">Plagiarism Reports (PDF only)</span>
              <input type="file" multiple accept=".pdf" onChange={(e) => handleFileChange(e, true)} className="w-full text-slate-300" />
              <div className="space-y-1">
                {plagiarismFiles.map((f, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-900/40 p-2 rounded">
                    <span className="truncate max-w-[150px]">{f.name}</span>
                    <button onClick={() => removeFile(i, true)} className="text-red-400 font-bold hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={submit}
              disabled={isSubmitting || deliveryFiles.length === 0}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Delivery"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
