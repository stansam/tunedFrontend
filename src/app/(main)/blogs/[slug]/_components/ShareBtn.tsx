"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShareButton({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/blogs/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User dismissed
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        "flex items-center gap-2 rounded-full border border-slate-200 bg-white",
        "px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm",
        "hover:border-emerald-300 hover:text-emerald-600 transition-all"
      )}
      aria-label="Share this article"
    >
      {copied ? (
        <>
          <Check size={15} className="text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <Share2 size={15} />
          Share
        </>
      )}
    </button>
  );
}