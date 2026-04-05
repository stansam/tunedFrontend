"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { SampleDetailHero } from "./SampleHero";
import { SampleContentPanel } from "./ContentPanel";
import { SampleMetaSidebar } from "./MetaSidebar";
import { toSampleViewModel } from "../utils";
import type { SampleDetailClientProps } from "../_props/sample.prop";

export function SampleDetailClient({ sample }: SampleDetailClientProps) {
  const viewModel = useMemo(() => toSampleViewModel(sample), [sample]);

  return (
    <>
      <SampleDetailHero sample={viewModel} />

      <section
        className="bg-[#f0ede8] py-12 md:py-16"
        aria-label="Sample content and details"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className={cn(
            "grid grid-cols-1 gap-8",
            "lg:grid-cols-[1fr_320px] lg:gap-10",
            "xl:grid-cols-[1fr_360px]"
          )}>

            <main id="sample-content">
              <SampleContentPanel sample={viewModel} />
            </main>
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <SampleMetaSidebar sample={viewModel} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}