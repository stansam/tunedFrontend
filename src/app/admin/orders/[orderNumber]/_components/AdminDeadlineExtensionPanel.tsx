"use client";

import { useState } from "react";
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
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg space-y-6 text-xs">
      <div>
        <h3 className="text-sm font-semibold text-white mb-4">Request Deadline Extension</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <label className="space-y-1 block">
              <span className="text-slate-400">Hours to Extend:</span>
              <input
                type="number"
                min={1}
                max={720}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 text-white rounded p-2 focus:outline-none focus:border-emerald-500"
              />
            </label>
            <label className="space-y-1 block">
              <span className="text-slate-400">Priority:</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 text-white rounded p-2 focus:outline-none focus:border-emerald-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
          </div>
          <label className="space-y-1 block">
            <span className="text-slate-400">Reason (Client will see this):</span>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Provide clear reasons for this extension request..."
              className="w-full bg-slate-950 border border-white/10 text-white rounded p-2 focus:outline-none focus:border-emerald-500"
              rows={2}
            />
          </label>
          <button
            type="submit"
            disabled={isRequesting || reason.length < 10}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
          >
            {isRequesting ? "Submitting..." : "Request Extension"}
          </button>
        </form>
      </div>

      {extensions.length > 0 && (
        <div className="space-y-3 border-t border-white/10 pt-4">
          <h4 className="font-semibold text-white">Extension Request History</h4>
          <div className="space-y-3">
            {extensions.map((ext) => (
              <div key={ext.id} className="border border-white/5 bg-slate-900/40 rounded p-3 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">+{ext.requested_hours} hours</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                    ext.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                    ext.status === "approved" ? "bg-emerald-500/10 text-emerald-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>{ext.status}</span>
                </div>
                <p className="text-slate-400">Reason: {ext.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
