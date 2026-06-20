"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAdminDeadlineExtension } from "../_hooks/useAdminDeadlineExtension";

export function AdminDeadlineExtensionPanel({
  orderId,
  orderNumber,
}: {
  orderId: string;
  orderNumber: string;
}) {
  const { extensions, requestExtension, isRequesting } = useAdminDeadlineExtension(orderId, orderNumber);
  const [hours, setHours] = useState<number>(24);
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("normal");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.length < 10) {
      setError("Reason must be at least 10 characters.");
      return;
    }
    setError(null);
    try {
      await requestExtension({ requested_hours: hours, reason, priority });
      setReason("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to submit request.";
      setError(msg);
    }
  };

  return (
    <div className="bg-white/40 border border-white/50 rounded-xl p-5 shadow-xs space-y-6 text-xs text-slate-800">
      <div>
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Request Deadline Extension</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <div className="text-red-800 bg-red-50 border border-red-200/50 p-2.5 rounded">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <label className="space-y-1 block">
              <span className="text-slate-500 font-medium">Hours to Extend:</span>
              <input
                type="number"
                min={1}
                max={720}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full bg-white/50 border border-slate-200 text-slate-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs"
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-slate-500 font-medium">Priority:</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-white/50 border border-slate-200 text-slate-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
          </div>
          <label className="space-y-1 block">
            <span className="text-slate-500 font-medium">Reason (Client will see this):</span>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide clear reasons for this extension request..."
              className="w-full bg-white/50 border border-slate-200 text-slate-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs"
              rows={2}
            />
          </label>
          <Button
            type="submit"
            disabled={isRequesting || reason.length < 10}
            className="w-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition"
          >
            {isRequesting ? "Submitting..." : "Request Extension"}
          </Button>
        </form>
      </div>

      {extensions.length > 0 && (
        <div className="space-y-3 border-t border-slate-200/50 pt-4">
          <h4 className="font-semibold text-slate-800">Extension Request History</h4>
          <div className="space-y-3">
            {extensions.map((ext) => (
              <div key={ext.id} className="border border-slate-200/50 bg-white/20 rounded p-3 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 font-semibold">+{ext.requested_hours} hours</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${
                    ext.status === "pending" ? "bg-amber-100 text-amber-800 border-amber-200" :
                    ext.status === "approved" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                    "bg-red-100 text-red-800 border-red-200"
                  }`}>{ext.status}</span>
                </div>
                <p className="text-slate-500">Reason: {ext.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
