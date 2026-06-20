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

  if (isLoading) return <div className="text-xs text-slate-500">Loading revisions...</div>;
  if (revisions.length === 0) return null;

  return (
    <div className="bg-white/40 border border-white/50 rounded-xl p-5 shadow-xs space-y-4 text-xs text-slate-800">
      <h3 className="text-sm font-semibold text-slate-800">Revision Requests</h3>
      <div className="space-y-4">
        {revisions.map((req) => (
          <div key={req.id} className="border border-slate-200/50 bg-white/20 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-slate-700 font-semibold">Req #{req.revision_count}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                req.status === "pending" ? "bg-amber-100 text-amber-800 border-amber-200" :
                req.status === "in_progress" ? "bg-blue-100 text-blue-800 border-blue-200" :
                req.status === "completed" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                "bg-red-100 text-red-800 border-red-200"
              }`}>{req.status}</span>
            </div>
            <p className="text-slate-600 leading-relaxed"><strong className="text-slate-800 font-semibold">Notes:</strong> {req.revision_notes}</p>
            {req.internal_notes && (
              <p className="text-amber-800 bg-amber-50/50 border border-amber-200/40 p-2.5 rounded font-medium leading-relaxed font-mono"><strong className="text-slate-800 font-semibold">Admin Notes:</strong> {req.internal_notes}</p>
            )}
            
            {["pending", "in_progress"].includes(req.status) && (
              <div>
                {selectedReq === req.id ? (
                  <form onSubmit={(e) => handleSubmit(e, req.id)} className="space-y-2 pt-2 border-t border-slate-200/50">
                    <div className="flex gap-4 flex-wrap">
                      <label className="flex items-center space-x-1.5">
                        <span className="text-slate-500 font-medium">New Status:</span>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="bg-white/50 border border-slate-200 text-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30 cursor-pointer"
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
                      className="w-full bg-white/50 border border-slate-200 rounded p-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30"
                      rows={2}
                    />
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setSelectedReq(null)} className="text-slate-500 hover:text-slate-700 transition cursor-pointer">Cancel</button>
                      <button type="submit" disabled={isUpdating} className="text-emerald-700 hover:text-emerald-800 font-bold transition cursor-pointer">Update</button>
                    </div>
                  </form>
                ) : (
                  <button onClick={() => { setSelectedReq(req.id); setStatus(req.status === "pending" ? "in_progress" : "completed"); }} className="text-emerald-700 hover:text-emerald-800 hover:underline font-semibold transition cursor-pointer">
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
