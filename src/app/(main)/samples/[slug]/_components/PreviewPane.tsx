import { cn } from "@/lib/utils";
import type { SamplePreviewPaneProps } from "../_props/sample.prop";

function splitIntoParagraphs(text: string): string[] {
  const byDouble = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (byDouble.length > 1) return byDouble;
  const bySingle = text.split(/\n/).map((p) => p.trim()).filter(Boolean);
  if (bySingle.length > 1) return bySingle;
  if (text.length > 300) {
    const mid = text.lastIndexOf(" ", Math.floor(text.length / 2));
    return [text.slice(0, mid).trim(), text.slice(mid).trim()].filter(Boolean);
  }
  return [text];
}

export function SamplePreviewPane({
  title,
  excerpt,
  wordCount,
  image,
}: SamplePreviewPaneProps) {
  const paragraphs = splitIntoParagraphs(excerpt);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200 bg-white",
        "shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
      )}
      role="region"
      aria-label="Sample document preview"
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/70"   aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" aria-hidden="true" />
        <div className="ml-3 flex-1 rounded-md bg-white border border-slate-200 px-3 py-1 text-xs text-slate-400 font-mono truncate hidden sm:block">
          tuned-sample.pdf — {wordCount.toLocaleString()} words
        </div>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <h2 className="mb-6 text-center text-lg font-bold leading-snug text-slate-800 sm:text-xl">
          {title}
        </h2>

        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-slate-200" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Preview
          </span>
          <div className="h-px flex-1 bg-slate-200" aria-hidden="true" />
        </div>

        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Abstract / Excerpt
        </p>

        <div className="space-y-4 text-sm leading-7 text-slate-600">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="first-letter:text-base first-letter:font-semibold">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-8 space-y-3" aria-hidden="true">
          <div className="h-3.5 w-full rounded-sm bg-slate-100" />
          <div className="h-3.5 w-5/6 rounded-sm bg-slate-100" />
          <div className="h-3.5 w-full rounded-sm bg-slate-100" />
          <div className="h-3.5 w-4/5 rounded-sm bg-slate-100" />
          <div className="h-3.5 w-full rounded-sm bg-slate-100" />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-white via-white/90 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-8 px-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Full sample available
          </span>
          <div className="h-px w-8 bg-slate-300" aria-hidden="true" />
        </div>
        <p className="mb-1 text-center text-sm font-medium text-slate-600">
          This is a preview. Request the complete {wordCount.toLocaleString()}-word sample.
        </p>
      </div>
    </div>
  );
}