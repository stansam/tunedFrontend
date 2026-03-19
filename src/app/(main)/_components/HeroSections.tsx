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
      className="relative w-full bg-[#e8e6e1] overflow-hidden"
      aria-label="Hero section"
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize:   "300px 300px",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 z-0 h-[500px] w-[500px] rounded-full bg-emerald-400 opacity-[0.06] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-16 z-0 h-80 w-80 rounded-full bg-stone-400 opacity-[0.12] blur-2xl"
      />

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
