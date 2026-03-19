"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import type { HeroLeftBlockProps } from "@/lib/props/index.props";

export function HeroLeftBlock({
  searchPlaceholder = "What are you looking for?", onSearch,
}: HeroLeftBlockProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch?.(query.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center align-center gap-0 relative">
      {/* <div className="relative hidden md:block h-[50px] w-[50px] sm:h-[130px] sm:w-[220px]">
        <QuestionIllustration />
      </div> */}
      <div className="relative -top-20 -left-[5%] sm:left-0 h-[180px] w-[290px]">
        <BookIllustration />
      </div>

      <div className="flex flex-col justify-center align-center gap-2 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
          Your Trusted Writer &amp; Editor
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-6 w-10 rounded-full bg-slate-200 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-slate-400" />
          </div>
          <p className="text-sm italic text-slate-500 font-medium">
            Your love letter to the very essence of writing
          </p>
        </div>
      </div>

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

function BookIllustration() {
  return (
    <Image
      src="/book_sketch.svg"
      alt="Book illustration"
      className="h-80"
      width={290}
      height={180}
    />
  );
}
