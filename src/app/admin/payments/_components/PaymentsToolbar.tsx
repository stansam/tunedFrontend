"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { PaymentsToolbarProps } from "../_props/payments.props";
import type { PaymentStatus } from "../_types/payments.types";

const tabs: readonly { readonly value: PaymentStatus | "all"; readonly label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending_verification", label: "Verification" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

export function PaymentsToolbar({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
}: PaymentsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 w-full md:flex-row md:items-center md:justify-between bg-white/20 backdrop-blur-md border border-white/50 p-4 rounded-2xl">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by Payment ID, Order or Client..."
          className="pl-10 text-xs bg-white/50 border-white/80 focus:border-emerald-500/50 rounded-xl placeholder:text-slate-400 h-9"
        />
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = statusValue === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onStatusChange(tab.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? "bg-slate-800 text-white shadow-xs"
                  : "bg-white/40 text-slate-600 border border-white/50 hover:bg-white/60"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
