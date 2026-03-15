"use client";

import React from "react";
import { QuoteForm } from "@/components/quote-form";
import type { HeroPhoneBlockProps } from "@/lib/props";

export function HeroPhoneBlock({ services, levels }: HeroPhoneBlockProps) {
  return (
    <div className="relative flex items-end justify-center w-full">
      {/* Lady in purple - left of phone */}
      <div
        className="absolute bottom-0 z-10 hidden md:block"
        style={{ left: "calc(50% - 340px)", width: 140, height: 340 }}
        aria-hidden="true"
      >
        <LadyIllustration />
      </div>

      {/* Phone frame */}
      <div
        className="relative z-20 flex flex-col rounded-[48px] bg-slate-900 shadow-2xl"
        style={{
          width: 320,
          minHeight: 560,
          padding: "14px 10px",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.22), inset 0 0 0 1.5px rgba(255,255,255,0.06)",
        }}
        role="presentation"
        aria-label="Quick quote form"
      >
        {/* Notch / Dynamic island */}
        <div className="mx-auto mb-3 flex h-7 w-24 items-center justify-center rounded-full bg-slate-800">
          <div className="h-2.5 w-12 rounded-full bg-slate-700" />
        </div>

        {/* Side LED dots */}
        <div className="absolute top-[58px] left-4 flex gap-1.5" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-emerald-400"
              style={{ opacity: 0.7 + i * 0.1 }}
            />
          ))}
        </div>
        <div className="absolute top-[58px] right-4 flex gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-emerald-400"
              style={{ opacity: 0.6 + i * 0.1 }}
            />
          ))}
        </div>

        {/* Screen content — green panel */}
        <div className="flex-1 rounded-[38px] bg-emerald-600 p-4 flex flex-col">
          <QuoteForm services={services} levels={levels} />
        </div>

        {/* Home indicator */}
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-slate-700" aria-hidden="true" />
      </div>

      {/* Guy in suit - right of phone */}
      <div
        className="absolute bottom-0 z-10 hidden md:block"
        style={{ right: "calc(50% - 340px)", width: 130, height: 310 }}
        aria-hidden="true"
      >
        <GuyIllustration />
      </div>
    </div>
  );
}

// ─── Character Illustrations (SVG) ───────────────────────────────────────────

function LadyIllustration() {
  return (
    <svg
      viewBox="0 0 140 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="72" cy="52" r="28" fill="#f4c3a0" />
      {/* Hair */}
      <path
        d="M44 44 Q44 20 72 18 Q100 20 100 44 Q100 32 72 28 Q44 32 44 44Z"
        fill="#1e1b18"
      />
      {/* Blouse - purple */}
      <path
        d="M36 115 Q38 82 72 80 Q106 82 108 115 L114 220 H30 Z"
        fill="#7c3aed"
      />
      {/* Collar area */}
      <ellipse cx="72" cy="82" rx="14" ry="8" fill="#f4c3a0" />
      {/* Left arm extended forward (pointing at phone) */}
      <path
        d="M36 120 Q10 130 -4 140 L2 150 Q18 140 42 130 Z"
        fill="#7c3aed"
      />
      {/* Left hand */}
      <ellipse cx="-2" cy="145" rx="8" ry="6" fill="#f4c3a0" />
      {/* Right arm down */}
      <path
        d="M108 120 Q122 130 124 160 L116 162 Q114 134 104 128 Z"
        fill="#7c3aed"
      />
      {/* Trousers */}
      <rect x="46" y="218" width="22" height="110" rx="8" fill="#1e293b" />
      <rect x="72" y="218" width="22" height="110" rx="8" fill="#1e293b" />
      {/* Shoes */}
      <ellipse cx="57" cy="330" rx="14" ry="8" fill="#0f172a" />
      <ellipse cx="83" cy="330" rx="14" ry="8" fill="#0f172a" />
    </svg>
  );
}

function GuyIllustration() {
  return (
    <svg
      viewBox="0 0 130 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="65" cy="40" r="26" fill="#f0c4a0" />
      {/* Hair */}
      <path
        d="M39 36 Q42 14 65 12 Q88 14 91 36 Q88 24 65 22 Q42 24 39 36Z"
        fill="#2d1f10"
      />
      {/* Shirt / collar */}
      <path
        d="M32 98 Q34 72 65 70 Q96 72 98 98 L102 200 H28 Z"
        fill="#f8fafc"
      />
      {/* Suit jacket */}
      <path
        d="M22 200 L28 98 Q20 100 16 120 L14 200Z"
        fill="#334155"
      />
      <path
        d="M108 200 L102 98 Q110 100 114 120 L116 200Z"
        fill="#334155"
      />
      <path
        d="M28 98 Q34 72 65 70 Q65 82 65 90 L44 200 L22 200 L28 98Z"
        fill="#334155"
      />
      <path
        d="M102 98 Q96 72 65 70 Q65 82 65 90 L86 200 L108 200 L102 98Z"
        fill="#334155"
      />
      {/* Lapels */}
      <path d="M65 90 L52 105 L65 108 Z" fill="#f8fafc" />
      <path d="M65 90 L78 105 L65 108 Z" fill="#f8fafc" />
      {/* Tie */}
      <path d="M62 108 L65 108 L68 108 L66 160 L65 162 L64 160 Z" fill="#dc2626" />
      {/* Left arm down */}
      <rect x="14" y="110" width="14" height="80" rx="6" fill="#334155" />
      {/* Right arm down */}
      <rect x="102" y="110" width="14" height="80" rx="6" fill="#334155" />
      {/* Hands */}
      <ellipse cx="21" cy="194" rx="8" ry="6" fill="#f0c4a0" />
      <ellipse cx="109" cy="194" rx="8" ry="6" fill="#f0c4a0" />
      {/* Trousers */}
      <rect x="38" y="198" width="22" height="100" rx="8" fill="#1e293b" />
      <rect x="64" y="198" width="22" height="100" rx="8" fill="#1e293b" />
      {/* Shoes */}
      <ellipse cx="49" cy="300" rx="16" ry="8" fill="#0f172a" />
      <ellipse cx="75" cy="300" rx="16" ry="8" fill="#0f172a" />
    </svg>
  );
}
