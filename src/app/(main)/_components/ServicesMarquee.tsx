"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ServicesMarqueeProps, ServiceCardProps } from "@/lib/props/index.props";

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "flex shrink-0 items-start gap-3 rounded-2xl bg-white px-5 py-4",
        "shadow-sm ring-1 ring-slate-100 w-[260px] sm:w-[280px]",
        "transition-shadow hover:shadow-md cursor-default select-none"
      )}
      aria-label={service.name}
    >
      {/* Icon */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
        <span className="text-2xl leading-none" aria-hidden="true">
          {/* @ts-expect-error */}
          {service.iconEmoji ?? "📄"}
        </span>
      </div>

      {/* Text */}
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

// ─── Marquee ─────────────────────────────────────────────────────────────────

export function ServicesMarquee({ featuredServices }: ServicesMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate items so the loop is seamless
  const items = [...featuredServices, ...featuredServices];

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
        className={cn(
          "flex gap-4 will-change-transform",
          isPaused
            ? "paused"
            : "running",
          "animate-marquee"
        )}
        style={{
          // Width = content duplicated, animation handled in global CSS
          width: "max-content",
        }}
        aria-hidden={false}
      >
        {items.map((service, idx) => (
          <ServiceCard
            key={`${service.id}-${idx}`}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}
