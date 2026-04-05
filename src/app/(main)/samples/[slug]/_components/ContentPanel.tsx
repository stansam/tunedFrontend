import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { SamplePreviewPane } from "./PreviewPane";
import { SampleMetaSidebar } from "./MetaSidebar";
import { ShareButton } from "./ShareBtn";
import type { SampleContentPanelProps } from "../_props/sample.prop";

export function SampleContentPanel({ sample }: SampleContentPanelProps) {
  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <Link
          href="/samples"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white",
            "px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm",
            "hover:border-emerald-300 hover:text-emerald-600 transition-all"
          )}
          aria-label="Back to all samples"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          All Samples
        </Link>

        <div className="flex items-center gap-2">
          <ShareButton title={sample.title} path={`/samples/${sample.slug}`} />

          <Link
            href={{pathname:"/order",query:{service:sample.service.slug,ref:sample.slug}}}
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 rounded-full",
              "bg-emerald-500 hover:bg-emerald-600",
              "px-4 py-2 text-xs font-bold text-white",
              "shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all"
            )}
          >
            <Download size={13} aria-hidden="true" />
            Request sample
          </Link>
        </div>
      </div>

      <SamplePreviewPane
        title={sample.title}
        excerpt={sample.excerpt}
        wordCount={sample.wordCount}
        image={sample.image}
      />

      <div className="lg:hidden">
        <SampleMetaSidebar sample={sample} />
      </div>
    </div>
  );
}