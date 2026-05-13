"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { Coins } from "lucide-react";
import { Input } from "@/components/ui/input";

export function RewardPointsRedeemer({ value, onChange, onApplied }: { value: number, onChange: (v: number) => void, onApplied: (amt: number) => void }) {
  const { user } = useAuth();
  const balance = user?.reward_points || 0;

  const handleApply = () => {
    const amt = Math.min(value, balance);
    onChange(amt);
    onApplied(amt);
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
        <Coins size={14} /> Use Reward Points
      </label>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input 
            type="number" 
            placeholder="0"
            value={value || ""}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            max={balance}
            className="h-12 rounded-xl border-white bg-white/50 px-4 font-bold ring-offset-emerald-500 focus-visible:ring-emerald-500"
          />
          <button 
            onClick={handleApply}
            className="rounded-xl bg-slate-900 px-6 font-bold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-black/10"
          >
            Apply
          </button>
        </div>
        <div className="flex items-center justify-between px-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Available: {balance} pts</p>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">1 pt = $1.00</p>
        </div>
      </div>
    </div>
  );
}
