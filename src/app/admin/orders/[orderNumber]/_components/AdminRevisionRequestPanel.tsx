"use client";

import { useState } from "react";
import { useAdminRevisionRequests } from "../_hooks/useAdminRevisionRequests";

export function AdminRevisionRequestPanel({ orderId }: { orderId: string }) {
  const { revisions, isLoading, updateStatus, isUpdating } = useAdminRevisionRequests(orderId);
  const [selectedReq, setSelectedReq] = useState<string | null>(null);
  const [status, setStatus] = useState("in_progress");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent, requestId: string) => {
    e.preventDefault();
    try {
      await updateStatus({ requestId, status, internal_notes: notes });
      setSelectedReq(null);
      setNotes("");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div className="text-xs text-slate-400">Loading revisions...</div>;
  if (revisions.length === 0) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg space-y-4 text-xs">
      <h3 className="text-sm font-semibold text-white">Revision Requests</h3>
      <div className="space-y-4">
        {revisions.map((req) => (
          <div key={req.id} className="border border-white/5 bg-slate-900/40 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-slate-300 font-medium">Req #{req.revision_count}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                req.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                req.status === "in_progress" ? "bg-blue-500/10 text-blue-400" :
                req.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                "bg-slate-500/10 text-slate-400"
              }`}>{req.status}</span>
            </div>
            <p className="text-slate-300 leading-relaxed"><strong className="text-white">Notes:</strong> {req.revision_notes}</p>
            {req.internal_notes && (
              <p className="text-amber-400/90 leading-relaxed font-mono"><strong className="text-white">Admin Notes:</strong> {req.internal_notes}</p>
            )}
            
            {["pending", "in_progress"].includes(req.status) && (
              <div>
                {selectedReq === req.id ? (
                  <form onSubmit={(e) => handleSubmit(e, req.id)} className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex gap-4 flex-wrap">
                      <label className="flex items-center space-x-1.5">
                        <span className="text-slate-400">New Status:</span>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="bg-slate-950 border border-white/10 text-white rounded px-2 py-1"
                        >
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </label>
                    </div>
                    <textarea
                      placeholder="Add internal notes (optional)..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded p-2 text-white"
                      rows={2}
                    />
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setSelectedReq(null)} className="text-slate-400">Cancel</button>
                      <button type="submit" disabled={isUpdating} className="text-emerald-400 font-bold">Update</button>
                    </div>
                  </form>
                ) : (
                  <button onClick={() => { setSelectedReq(req.id); setStatus(req.status === "pending" ? "in_progress" : "completed"); }} className="text-emerald-400 hover:underline">
                    Manage Revision
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
