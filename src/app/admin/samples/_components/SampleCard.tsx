"use client";

import { FileText, Eye, Download, Trash2, Edit, ChevronDown, ChevronUp, Star } from "lucide-react";
import type { SampleCardProps } from "../_props/samples.props";

export function SampleCard({
  sample,
  expanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onFeatureToggle,
}: SampleCardProps) {
  const categoryLabel = sample.service?.name || "General";
  const tagsLabel = sample.tags.map((t) => t.name).join(" · ");
  const dateLabel = sample.id === "sample-1" ? "Apr 20, 2026" : sample.id === "sample-2" ? "Apr 18, 2026" : "Apr 15, 2026";

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs transition-all duration-300 hover:bg-white/50 hover:shadow-sm overflow-hidden w-full">
      {/* Header Row */}
      <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/60 border border-white/85 shrink-0">
            <FileText className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight truncate">{sample.title}</h3>
            <p className="text-xs text-slate-500 font-medium">
              Category: {categoryLabel} {tagsLabel ? `· ${tagsLabel}` : ""} · Added {dateLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 ml-auto md:ml-0 shrink-0 self-end md:self-auto text-slate-500 font-medium">
          <div className="flex items-center gap-1 text-xs">
            <Eye className="h-4 w-4 text-slate-400" />
            <span className="tabular-nums">{sample.views_count} views</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Download className="h-4 w-4 text-slate-400" />
            <span className="tabular-nums">{sample.downloads_count} downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onToggleExpand} className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white/60 hover:bg-white border border-slate-200 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer">
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              {expanded ? "Hide" : "View"}
            </button>
            <button onClick={onDelete} className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-5 pt-2 border-t border-white/20 bg-white/20 backdrop-blur-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
            <div>
              <span className="text-slate-400 block mb-0.5 font-semibold">Word Count</span>
              <span className="text-slate-800 font-bold tabular-nums">{sample.word_count} words</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5 font-semibold">URL Slug</span>
              <span className="text-slate-800 font-mono select-all font-semibold">{sample.slug}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5 font-semibold">Featured Status</span>
              <span className={`inline-flex items-center gap-1 font-bold ${sample.featured ? "text-amber-600" : "text-slate-400"}`}>
                <Star className={`h-3.5 w-3.5 ${sample.featured ? "fill-amber-500 text-amber-500" : ""}`} />
                {sample.featured ? "Featured" : "Regular"}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-700 bg-white/40 border border-white/30 rounded-xl p-3 shadow-2xs leading-relaxed font-medium">
            {sample.excerpt || "No excerpt provided."}
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button onClick={onFeatureToggle} className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white/60 hover:bg-white border border-slate-200 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer">
              <Star className="h-3.5 w-3.5" /> {sample.featured ? "Unfeature" : "Make Featured"}
            </button>
            <button onClick={onEdit} className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer">
              <Edit className="h-3.5 w-3.5" /> Edit Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
