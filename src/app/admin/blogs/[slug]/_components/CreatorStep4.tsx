import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { parseMarkdown } from "./parseMarkdown";
import type {Step4Props} from "../_props";

export function CreatorStep4({ data, categories, onPrev, onSubmit, isSubmitting }: Step4Props) {
  const cat = categories.find((c) => c.id === data.category_id);

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-slate-800 border-b border-white/20 pb-2">Step 4: Final Preview</h3>

      <div className="bg-white/50 border border-white/60 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="space-y-2">
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80">{cat?.name || "Uncategorized"}</Badge>
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">{data.title || "Untitled Post"}</h1>
          <p className="text-xs text-slate-500 font-medium">By {data.author || "Unknown"}</p>
        </div>

        {data.excerpt && <p className="italic text-slate-600 border-l-2 border-slate-300 pl-4 py-1 text-sm">{data.excerpt}</p>}

        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {data.tags.map((t) => (
              <Badge key={t} variant="secondary" className="text-xs">#{t}</Badge>
            ))}
          </div>
        )}

        <div
          className="border-t border-slate-200/50 pt-4 prose max-w-none text-slate-800 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(data.content) }}
        />
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onPrev} disabled={isSubmitting} className="rounded-xl border-white/50 bg-white/40">
          Back
        </Button>
        <div className="flex gap-2">
          <Button onClick={() => onSubmit(false)} disabled={isSubmitting} variant="outline" className="rounded-xl border-white/50 bg-white/40">
            {isSubmitting ? "Saving..." : "Save Draft"}
          </Button>
          <Button onClick={() => onSubmit(true)} disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}
