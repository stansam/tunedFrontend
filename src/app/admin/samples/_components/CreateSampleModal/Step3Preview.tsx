"use client";

import { FileText, Star } from "lucide-react";
import type { Step3Props } from "../../_props/samples.props";

export function Step3Preview({ data, services, onBack, onSubmit, isSaving }: Step3Props) {
  const serviceName = services.find((s) => s.id === data.service_id)?.name || "General";
  const tagsText = data.tags.join(" · ");

  return (
    <div className="space-y-4 text-slate-700">
      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Mock Card Preview</p>

      <div className="rounded-xl border border-white/60 bg-white/40 backdrop-blur-md p-4 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/60 border border-white/85 shrink-0">
            <FileText className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="font-bold text-slate-800 text-sm leading-tight truncate">{data.title || "Untitled Sample"}</h3>
            <p className="text-xs text-slate-500 font-medium">
              Category: {serviceName} {tagsText ? `· ${tagsText}` : ""} · Added Just Now
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Preview Details</p>
        <div className="rounded-xl border border-slate-100 bg-white/50 p-4 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-400 block mb-0.5 font-semibold">Word Count</span>
              <span className="text-slate-800 font-bold">{data.word_count || 0} words</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5 font-semibold">Featured Status</span>
              <span className={`inline-flex items-center gap-1 font-bold ${data.featured ? "text-amber-600" : "text-slate-400"}`}>
                <Star className={`h-3.5 w-3.5 ${data.featured ? "fill-amber-500 text-amber-500" : ""}`} />
                {data.featured ? "Featured" : "Regular"}
              </span>
            </div>
          </div>
          <div className="space-y-1 border-t border-slate-100/50 pt-2">
            <span className="text-slate-400 block mb-0.5 font-semibold">Excerpt</span>
            <p className="text-slate-700 bg-white/40 border border-white/30 rounded-lg p-2.5 leading-relaxed font-medium">
              {data.excerpt || "No excerpt provided."}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          disabled={isSaving}
          onClick={onBack}
          className="rounded-xl border border-slate-200 bg-white text-xs font-bold px-4 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          disabled={isSaving}
          onClick={onSubmit}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs px-4 py-2 transition-colors cursor-pointer"
        >
          {isSaving ? "Saving..." : "Confirm & Upload"}
        </button>
      </div>
    </div>
  );
}
