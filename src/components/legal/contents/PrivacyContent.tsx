"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle } from "lucide-react";
import { PRIVACY_SECTIONS } from "./privacyData";

export function PrivacyContent() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSections = PRIVACY_SECTIONS.filter((sec) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(query) ||
      sec.keywords.some((kw) => kw.includes(query))
    );
  });

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search privacy topics (e.g. cookies, GDPR, encryption)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 rounded-xl bg-slate-50 focus:bg-white transition-all outline-none border border-slate-200 text-xs"
        />
      </div>

      {/* Accordion List */}
      <div className="min-h-[300px]">
        {filteredSections.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-3">
            {filteredSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <AccordionItem
                  key={sec.id}
                  value={sec.id}
                  className="border border-slate-100 rounded-xl px-4 bg-white/50 hover:bg-white transition-all"
                >
                  <AccordionTrigger className="hover:no-underline font-bold text-slate-900 text-sm py-4 flex gap-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{sec.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-1 border-t border-slate-50/50">
                    {sec.content}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <HelpCircle className="h-8 w-8 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No privacy sections found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
