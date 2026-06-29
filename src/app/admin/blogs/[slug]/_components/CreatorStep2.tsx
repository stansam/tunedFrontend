import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "./MarkdownEditor";
import type {Step2Props } from "../_props";

export function CreatorStep2({ content, onChange, onPrev, onNext }: Step2Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-slate-800 border-b border-white/20 pb-2">Step 2: Write Content</h3>
      <MarkdownEditor value={content} onChange={onChange} placeholder="Write your blog post content using Markdown..." />
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onPrev} className="rounded-xl border-white/50 bg-white/40">
          Back
        </Button>
        <Button onClick={onNext} disabled={!content.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">
          Next Step
        </Button>
      </div>
    </div>
  );
}
