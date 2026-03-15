"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import type { HeroLeftBlockProps } from "@/lib/props";

export function HeroLeftBlock({
  searchPlaceholder = "What are you looking for?",
  onSearch,
}: HeroLeftBlockProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch?.(query.trim());
  };

  return (
    <div className="flex flex-col items-start justify-center gap-4 relative">
      {/* Decorative illustration images */}
      <div className="flex flex-col gap-3 mb-2">
        {/* Question mark with people */}
        <div className="relative h-[120px] w-[200px] sm:h-[130px] sm:w-[220px]">
          {/* We replicate this with SVG since we cannot load external images */}
          <QuestionIllustration />
        </div>

        {/* Open book */}
        <div className="relative h-[90px] w-[200px] sm:w-[220px]">
          <BookIllustration />
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
          Your Trusted Writer &amp; Editor
        </h1>
        {/* Subtitle pill */}
        <div className="mt-2 flex items-center gap-2">
          <div className="h-6 w-10 rounded-full bg-slate-200 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-slate-400" />
          </div>
          <p className="text-sm italic text-slate-500 font-medium">
            Your love letter to the very essence of writing
          </p>
        </div>
      </div>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[320px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm"
        role="search"
        aria-label="Search services"
      >
        <Search
          size={16}
          className="shrink-0 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
          aria-label={searchPlaceholder}
        />
      </form>

      {/* Decorative dots */}
      <div
        className="absolute bottom-0 left-24 flex gap-2 opacity-30 pointer-events-none"
        aria-hidden="true"
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-full bg-slate-400"
            style={{ width: 6 + i * 2, height: 6 + i * 2 }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Inline SVG Illustrations ─────────────────────────────────────────────────

function QuestionIllustration() {
  return (
    <svg
      viewBox="0 0 220 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Large question mark */}
      <text
        x="90"
        y="105"
        fontSize="110"
        fontWeight="800"
        fill="#1e293b"
        opacity="0.12"
        fontFamily="serif"
      >
        ?
      </text>
      <text
        x="85"
        y="100"
        fontSize="90"
        fontWeight="700"
        fill="#334155"
        opacity="0.18"
        fontFamily="serif"
      >
        ?
      </text>

      {/* Person left - simple silhouette */}
      <g transform="translate(10, 20)">
        {/* Head */}
        <circle cx="24" cy="18" r="10" fill="#64748b" />
        {/* Body */}
        <rect x="16" y="30" width="16" height="30" rx="6" fill="#475569" />
        {/* Legs */}
        <rect x="16" y="55" width="7" height="22" rx="3" fill="#475569" />
        <rect x="25" y="55" width="7" height="22" rx="3" fill="#475569" />
        {/* Left arm - holding document */}
        <rect x="4" y="33" width="12" height="5" rx="2.5" fill="#475569" />
        <rect x="0" y="28" width="10" height="14" rx="2" fill="#94a3b8" />
      </g>

      {/* Person right */}
      <g transform="translate(165, 20)">
        {/* Head */}
        <circle cx="24" cy="18" r="10" fill="#64748b" />
        {/* Body */}
        <rect x="16" y="30" width="16" height="30" rx="6" fill="#475569" />
        {/* Legs */}
        <rect x="16" y="55" width="7" height="22" rx="3" fill="#475569" />
        <rect x="25" y="55" width="7" height="22" rx="3" fill="#475569" />
        {/* Right arm */}
        <rect x="32" y="33" width="12" height="5" rx="2.5" fill="#475569" />
      </g>
    </svg>
  );
}

function BookIllustration() {
  return (
    <svg
      viewBox="0 0 220 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Book pages - open book effect */}
      {/* Left pages */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={`left-${i}`}
          d={`M 110 75 L ${40 - i * 6} ${15 + i * 2} L ${50 - i * 4} ${10 + i * 2} Z`}
          fill={`hsl(35, ${15 + i * 5}%, ${75 - i * 3}%)`}
          stroke="hsl(35,10%,60%)"
          strokeWidth="0.3"
        />
      ))}
      {/* Right pages */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={`right-${i}`}
          d={`M 110 75 L ${180 + i * 6} ${15 + i * 2} L ${170 + i * 4} ${10 + i * 2} Z`}
          fill={`hsl(35, ${15 + i * 5}%, ${75 - i * 3}%)`}
          stroke="hsl(35,10%,60%)"
          strokeWidth="0.3"
        />
      ))}
      {/* Spine */}
      <ellipse cx="110" cy="75" rx="6" ry="4" fill="#78716c" />
      {/* Cover shadow */}
      <ellipse cx="110" cy="80" rx="70" ry="6" fill="#1e293b" opacity="0.07" />
    </svg>
  );
}
