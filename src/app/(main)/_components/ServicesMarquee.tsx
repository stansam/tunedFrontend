"use client";

import { useRef, useState } from "react";
import { cn, resolveServiceIcon } from "@/lib/utils";
import type { ServicesMarqueeProps, ServiceCardProps } from "../_props";
export { FALLBACK_FEATURED_SERVICES as FALLBACK_FEATURED } from "../_fallback";
import type { Service } from "../_types";

function FeaturedServiceCard({ service }: ServiceCardProps) {
  const { emoji, ariaLabel } = resolveServiceIcon(service);

  return (
    <article
      className={cn(
        "flex shrink-0 items-start gap-3 rounded-2xl bg-white px-5 py-4",
        "shadow-sm ring-1 ring-slate-100 w-[260px] sm:w-[280px]",
        "transition-shadow hover:shadow-md cursor-default select-none"
      )}
      aria-label={service.name}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
        <span className="text-2xl leading-none" role="img" aria-label={ariaLabel}>
          {emoji}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-800 text-sm leading-snug truncate">
          {service.name}
        </p>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
      </div>
    </article>
  );
}

export function ServicesMarquee({ featuredServices }: ServicesMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const items: Service[] = [...featuredServices, ...featuredServices];

  if (featuredServices.length === 0) return null;

  return (
    <section
      aria-label="Featured services"
      className="w-full overflow-hidden py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        // className={cn(
        //   "flex gap-4 will-change-transform",
        //   isPaused
        //     ? "paused"
        //     : "running",
        //   "animate-marquee"
        // )}
        style={{
          width: "max-content",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        className="flex gap-4 will-change-transform animate-marquee"
        // aria-hidden={false}
      >
        {items.map((service, idx) => (
          <FeaturedServiceCard
            key={`${service.id}-${idx}`}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}