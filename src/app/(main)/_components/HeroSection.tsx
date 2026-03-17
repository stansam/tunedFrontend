import React from "react";
import { HeroLeftBlock } from "./HeroLeftBlock";
import { HeroPhoneBlock } from "./HeroPhoneBlock";
import { ServicesMarquee } from "./ServicesMarquee";
import type { HeroSectionProps } from "@/lib/props/index.props";

export function HeroSection({
  options,
  featuredServices,
}: HeroSectionProps) {
  return (
    <section
      className="w-full bg-[#e8e6e1] overflow-hidden"
      aria-label="Hero section"
    >
      <div className="mx-auto max-w-6xl lg:max-w-7xl">
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between pt-5 pb-0 min-h-[480px] md:min-h-[580px]">

          <div className="w-full md:w-[42%] pb-8 md:pb-16 z-10">
            <HeroLeftBlock />
          </div>

          <div className="w-full md:w-[58%] z-20">
            <HeroPhoneBlock options={options} />
          </div>

          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-slate-300 opacity-20 blur-3xl" />
            <div className="absolute left-1/4 bottom-0 h-48 w-48 rounded-full bg-stone-300 opacity-30 blur-2xl" />
          </div>
        </div>
      </div>

      <div className="w-full border-t border-slate-200 bg-[#f1efeb]">
        <ServicesMarquee featuredServices={featuredServices} />
      </div>
    </section>
  );
}
