import React from "react";
import Image from "next/image";

export function MobileLoginHero() {
  return (
    <div className="md:hidden relative w-full h-32 overflow-hidden bg-emerald-950 border-b border-emerald-900/50">
      <Image
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
        alt="Team collaboration"
        fill
        sizes="(max-width: 768px) 100vw, 0vw"
        className="object-cover mix-blend-overlay opacity-60"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-emerald-950/90 to-emerald-900/10" />
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <span className="text-white font-extrabold tracking-tight text-xl leading-tight">
          Success starts here
        </span>
      </div>
    </div>
  );
}
