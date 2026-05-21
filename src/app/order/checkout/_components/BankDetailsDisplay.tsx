"use client";

import { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface BankDetailsDisplayProps {
  details: string;
}

export function BankDetailsDisplay({ details }: BankDetailsDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="relative rounded-xl border border-border bg-muted/40 p-4">
      <pre className="text-xs text-foreground font-mono whitespace-pre-wrap leading-relaxed pr-8">
        {details}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted transition-colors"
        aria-label="Copy bank details"
      >
        {copied
          ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          : <Copy className="h-4 w-4 text-muted-foreground" />
        }
      </button>
    </div>
  );
}
