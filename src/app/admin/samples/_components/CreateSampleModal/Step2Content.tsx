"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Step2Props } from "../../_props/samples.props";

export function Step2Content({ data, onChange, onBack, onNext }: Step2Props) {
  const isValid = data.content.trim().length > 0;

  return (
    <div className="space-y-4 text-slate-700">
      <div className="space-y-1.5">
        <Label htmlFor="excerpt" className="text-xs font-bold">Excerpt / Summary</Label>
        <Textarea
          id="excerpt"
          placeholder="Brief summary of the sample content..."
          value={data.excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          className="rounded-xl border border-slate-200 text-xs py-2 shadow-2xs min-h-[60px] resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content" className="text-xs font-bold">Content Body *</Label>
        <Textarea
          id="content"
          placeholder="Full text of the essay or report..."
          value={data.content}
          onChange={(e) => onChange({ content: e.target.value })}
          className="rounded-xl border border-slate-200 text-xs py-2 shadow-2xs min-h-[140px] resize-y"
        />
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 shadow-2xs">
        <div className="space-y-0.5">
          <Label className="text-xs font-bold block">Featured Sample</Label>
          <span className="text-[10px] text-slate-400 font-medium">Highlight this sample on the homepage</span>
        </div>
        <Switch
          checked={data.featured}
          onCheckedChange={(checked) => onChange({ featured: checked })}
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-200 bg-white text-xs font-bold px-4 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs px-4 py-2 disabled:opacity-50 transition-colors cursor-pointer"
        >
          Preview Sample
        </button>
      </div>
    </div>
  );
}
