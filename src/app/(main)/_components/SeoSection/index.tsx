"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { SeoSectionProps } from "../../_props/seo.props";
import type { ExpandedState } from "../../_types/seo.types";
import { SEO_SECTION_DATA } from "./data";
import { SeoSectionHeader } from "./Header";
import { SeoStatsBar } from "./StatsBar";
import { SeoColumnsGrid } from "./ColumnsGrid";
import { KeywordTags } from "./KeywordTags";

export function SeoSection({ data = SEO_SECTION_DATA, className }: SeoSectionProps) {
  const [expandedState, setExpandedState] = useState<ExpandedState>({});

  const handleToggle = useCallback((columnId: string) => {
    setExpandedState((prev) => ({
      ...prev,
      [columnId]: !(prev[columnId] ?? false),
    }));
  }, []);

  return (
    <section
      aria-labelledby="seo-section-heading"
      className={cn(
        "relative w-full bg-[#0f1117] overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-slate-800"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "pointer-events-none absolute -top-32 right-0 rounded-full",
          "h-64 w-64 bg-emerald-500/5 blur-3xl",
          "md:-top-48 md:h-96 md:w-96"
        )}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-24 lg:max-w-7xl lg:px-8">
        <SeoSectionHeader
          id="seo-section-heading"
          heading={data.sectionHeading}
          subheading={data.sectionSubheading}
        />
      </div>

      <SeoStatsBar stats={data.stats} />

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24 lg:max-w-7xl lg:px-8">
        <div className="mt-12 md:mt-16">
          <SeoColumnsGrid
            columns={data.columns}
            expandedState={expandedState}
            onToggle={handleToggle}
          />
        </div>

        <div className="mt-12 border-t border-slate-800/60 pt-10 md:mt-16">
          <KeywordTags
            tags={data.allKeywords}
            label="Related services & keywords"
          />
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-px bg-slate-800"
        aria-hidden="true"
      />
    </section>
  );
}
