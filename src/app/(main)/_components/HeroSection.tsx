import React from "react";
import { HeroLeftBlock } from "./HeroLeftBlock";
import { HeroPhoneBlock } from "./HeroPhoneBlock";
import { ServicesMarquee } from "./ServicesMarquee";
import type { HeroSectionProps } from "@/lib/props/index.props";

/**
 * HeroSection
 *
 * Block 1 (left)  – illustrations + title + search
 * Block 2 (right) – phone frame with embedded QuoteForm + character illustrations
 * Block 3 (bottom)– auto-scrolling featured services marquee
 */
export function HeroSection({
  services,
  levels,
  featuredServices,
}: HeroSectionProps) {
  return (
    <section
      className="w-full bg-[#e8e6e1] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Blocks 1 & 2 — two-column on md+, stacked on mobile */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-10 pb-0 min-h-[480px] md:min-h-[580px]">
          {/* Block 1: Left — title, illustrations, search */}
          <div className="w-full md:w-[42%] pb-8 md:pb-16 z-10">
            <HeroLeftBlock />
          </div>

          {/* Block 2: Right — phone + form + characters */}
          {/*
            The phone block is positioned so characters slightly overflow
            the section bottom edge, bleeding into the marquee area.
            We use `overflow-hidden` on the section to clip any overflow.
          */}
          <div className="w-full md:w-[58%] flex justify-center md:justify-end relative z-20">
            <div className="relative" style={{ minHeight: 580 }}>
              <HeroPhoneBlock services={services} levels={levels} />
            </div>
          </div>

          {/* Background decorative blobs */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-slate-300 opacity-20 blur-3xl" />
            <div className="absolute left-1/4 bottom-0 h-48 w-48 rounded-full bg-stone-300 opacity-30 blur-2xl" />
          </div>
        </div>
      </div>

      {/* Block 3: Marquee — full width strip below the two-column area */}
      <div className="w-full border-t border-slate-200 bg-[#f1efeb]">
        <ServicesMarquee featuredServices={featuredServices} />
      </div>
    </section>
  );
}
