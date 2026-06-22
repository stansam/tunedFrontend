"use client";

import { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TERMS_SECTIONS } from "./termsData";

export function TermsContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const viewport = containerRef.current?.querySelector('[data-slot="scroll-area-viewport"]');
    const target = document.getElementById(id);
    if (viewport && target) {
      const top = target.offsetTop - 16;
      viewport.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="flex h-[60vh] max-h-[600px] flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-4 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible custom-scrollbar">
        {TERMS_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-emerald-600 rounded-xl transition-all duration-150 whitespace-nowrap text-left w-full cursor-pointer animate-fade-in"
            >
              <Icon size={14} className="text-slate-400 shrink-0" />
              <span>{section.title}</span>
            </button>
          );
        })}
      </aside>

      {/* Content Area */}
      <div ref={containerRef} className="flex-1 min-w-0">
        <ScrollArea className="h-full pr-4 custom-scrollbar">
          <div className="space-y-8 pb-8">
            {TERMS_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-4 space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <section.icon size={16} className="text-emerald-600" />
                  {section.title}
                </h3>
                {section.content}
                <hr className="border-slate-100 mt-6" />
              </section>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
