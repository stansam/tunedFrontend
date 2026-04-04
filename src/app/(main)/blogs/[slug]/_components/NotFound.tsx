import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogNotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex min-h-[70vh] flex-col items-center justify-center bg-[#f8f7f4] px-4 py-24 text-center overflow-hidden"
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-8 select-none text-center",
          "text-[160px] font-extrabold leading-none text-slate-800 opacity-[0.025]",
          "md:text-[220px]"
        )}
      >
        404
      </span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className={cn(
          "flex h-20 w-20 items-center justify-center rounded-full bg-white",
          "ring-8 ring-white/50 shadow-sm"
        )}>
          <FileQuestion size={40} className="text-slate-300" aria-hidden="true" />
        </div>

        <div>
          <h1
            id="not-found-heading"
            className="text-2xl font-bold text-slate-800 sm:text-3xl"
          >
            Article not found
          </h1>
          <p className="mt-3 max-w-md text-slate-500">
            The article you&apos;re looking for doesn&apos;t exist or may have
            been removed. Head back to the blog to discover more articles.
          </p>
        </div>

        <Link
          href="/blogs"
          className={cn(
            "mt-2 flex items-center gap-2 rounded-full",
            "bg-emerald-500 hover:bg-emerald-600",
            "px-6 py-3 text-sm font-semibold text-white",
            "shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all"
          )}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Blogs
        </Link>
      </div>
    </section>
  );
}