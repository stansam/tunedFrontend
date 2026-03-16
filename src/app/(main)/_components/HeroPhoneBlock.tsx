"use client";
import Image from "next/image";
import { QuoteForm } from "./quote-form";
import type { HeroPhoneBlockProps } from "@/lib/props/index.props";

export function HeroPhoneBlock({ services, levels }: HeroPhoneBlockProps) {
  return (
    <div className="relative flex items-start justify-center w-full">
      <div
        className="absolute bottom-0 z-10 hidden md:block"
        style={{ left: "calc(50% - 340px)", width: 185, height: 380 }}
        aria-hidden="true"
      >
        <LadyIllustration />
      </div>

      {/* Phone frame */}
      <div
        className="relative z-20 flex flex-col rounded-[48px] bg-slate-900 shadow-2xl"
        style={{
          width: 320,
          minHeight: 450,
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
        <div className="absolute top-[28px] left-8 flex gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-emerald-400"
              style={{ opacity: 0.7 + i * 0.1 }}
            />
          ))}
        </div>
        <div className="absolute top-[28px] right-8 flex gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-emerald-400"
              style={{ opacity: 0.6 + i * 0.1 }}
            />
          ))}
        </div>

        <div className="mt-8 rounded-[38px] bg-emerald-600 p-4 flex flex-col ">
          <QuoteForm services={services} levels={levels} />
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-20 rounded-full bg-slate-700" aria-hidden="true" />
      </div>

      <div
        className="absolute bottom-0 z-10 hidden md:block"
        style={{ right: "calc(50% - 340px)", width: 180, height: 400 }}
        aria-hidden="true"
      >
        <GuyIllustration />
      </div>
    </div>
  );
}


function LadyIllustration() {
  return (
    <Image
      src="/lady.png"
      alt="Question illustration"
      className="w-full h-full"
      width={150}
      height={380}
    />
  );
}

function GuyIllustration() {
  return (
    <Image
      src="/man.png"
      alt="Question illustration"
      className="w-full h-full"
      width={150}
      height={380}
    />
  );
}
