"use client";

import { useState, useCallback } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShareButtonProps } from "../_props/sample.prop";


export function ShareButton({ title, path }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${path}`
        : path;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      const timer = setTimeout(() => setCopied(false), 2_000);
      return () => clearTimeout(timer);
    } catch {
    }
  }, [title, path]);

  return (
    <button
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white",
        "px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm",
        "hover:border-emerald-300 hover:text-emerald-600 transition-all"
      )}
      aria-label="Share this sample"
    >
      {copied ? (
        <>
          <Check size={13} className="text-emerald-500" aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <Share2 size={13} aria-hidden="true" />
          Share
        </>
      )}
    </button>
  );
}