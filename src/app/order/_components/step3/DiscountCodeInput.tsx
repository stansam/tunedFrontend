"use client";

import { useState } from "react";
import { Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDiscountValidation } from "../../_hooks/useDiscountValidation";

export function DiscountCodeInput({ subtotal, onApplied }: { subtotal: number, onApplied: (amt: number) => void }) {
  const [code, setCode] = useState("");
  const { validate, isLoading } = useDiscountValidation(subtotal, onApplied);

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
        <Tag size={14} /> Discount Code
      </label>
      <div className="flex gap-2">
        <Input 
          placeholder="ENTER CODE"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="h-12 rounded-xl border-white bg-white/50 px-4 font-bold ring-offset-emerald-500 focus-visible:ring-emerald-500 placeholder:text-slate-300"
        />
        <button 
          onClick={() => validate(code)}
          disabled={isLoading || !code}
          className="rounded-xl bg-slate-900 px-6 font-bold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-50 shadow-lg shadow-black/10"
        >
          {isLoading ? "..." : "Apply"}
        </button>
      </div>
    </div>
  );
}
