"use client";

import React, { useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { SECURITY_BLOCKS } from "./securityData";

export function SecurityContent() {
  const [activeTab, setActiveTab] = useState<string>("data-protection");
  const currentBlock = SECURITY_BLOCKS[activeTab];

  return (
    <div className="space-y-6">
      {/* Visual Navigation Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(SECURITY_BLOCKS).map(([key, block]) => {
          const Icon = block.icon;
          const isSelected = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50/20 shadow-sm text-emerald-950 font-bold"
                  : "border-slate-100 bg-white/50 hover:bg-white text-slate-600 font-medium"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl mb-2 ${
                  isSelected ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                }`}
              >
                <Icon size={20} />
              </div>
              <span className="text-xs">{block.title}</span>
            </button>
          );
        })}
      </div>

      {currentBlock && (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 space-y-4 transition-all duration-200">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <ShieldCheck size={16} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{currentBlock.title}</h4>
          </div>
          <p className="text-xs text-slate-500 font-medium">{currentBlock.tagline}</p>

          <div className="space-y-3">
            {currentBlock.details.map((detail, idx) => {
              const [label, desc] = detail.split(":");
              return (
                <div key={idx} className="flex items-start gap-2 bg-white/60 p-3 rounded-xl border border-slate-50">
                  <ArrowRight size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-950">{label}</strong>
                    {desc && <span>: {desc}</span>}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
