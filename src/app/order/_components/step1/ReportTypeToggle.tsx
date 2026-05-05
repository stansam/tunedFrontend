"use client";

import { ShieldCheck, FileSearch } from "lucide-react";
import { cn } from "../../_utils/order.utils";

export function ReportTypeToggle({ value, onChange }: { value: "turnitin" | "standard" | null, onChange: (v: "turnitin" | "standard" | null) => void }) {
  const options = [
    { id: "turnitin", title: "Turnitin + AI Check", desc: "Full Turnitin report with AI detection analysis.", price: "$9.99", icon: ShieldCheck, popular: true },
    { id: "standard", title: "Plagiarism Report", desc: "Comprehensive plagiarism check for complete privacy.", price: "$4.99", icon: FileSearch, popular: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((opt) => {
        const isActive = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(isActive ? null : opt.id as "turnitin" | "standard")}
            className={cn(
              "relative flex flex-col gap-4 rounded-3xl border-2 p-6 text-left transition-all duration-300",
              isActive ? "border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-500/10" : "border-white bg-white/40 hover:border-slate-200"
            )}
          >
            {opt.popular && <span className="absolute right-4 top-4 rounded-full bg-slate-900 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-tighter">Popular</span>}
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", isActive ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500")}>
              <opt.icon size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{opt.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{opt.desc}</p>
            </div>
            <div className="mt-auto pt-4">
              <span className="text-lg font-bold text-emerald-600">{opt.price}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
