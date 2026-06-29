"use client";

import React from "react";
import { Tag, Award, BookOpen, FileText } from "lucide-react";
import type { FlatItem } from "../../_types/search.types";
import { SuggestionButton } from "../SuggestionButton";

interface SearchSuggestionsListProps {
  flatItems: FlatItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onSelect: (item: FlatItem) => void;
}

const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  tag: { label: "Matching Tags", icon: Tag },
  service: { label: "Services", icon: Award },
  sample: { label: "Writing Samples", icon: BookOpen },
  blog: { label: "Blog Posts", icon: FileText },
};

export function SearchSuggestionsList({
  flatItems,
  activeIndex,
  setActiveIndex,
  onSelect,
}: SearchSuggestionsListProps) {
  return (
    <div className="space-y-3">
      {["tag", "service", "sample", "blog"].map((category) => {
        const categoryItems = flatItems.filter((i) => i.type === category);
        if (categoryItems.length === 0) return null;

        const config = CATEGORY_CONFIG[category];
        if (!config) return null;
        const IconComponent = config.icon;

        return (
          <div key={category}>
            <div className="px-2 pb-0.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <IconComponent size={11} className="text-slate-400" />
              {config.label}
            </div>
            <div className="mt-1 space-y-0.5">
              {categoryItems.map((item) => {
                const globalIdx = flatItems.indexOf(item);
                return (
                  <SuggestionButton
                    key={item.id}
                    item={item}
                    isSelected={activeIndex === globalIdx}
                    onSelect={() => onSelect(item)}
                    onMouseEnter={() => setActiveIndex(globalIdx)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
