"use client";

import { ArrowRight } from "lucide-react";
import { ResultCard } from "./ResultCard";
import { ResultType } from "../_types";
import { SearchResultItem } from "@/lib/types/search.type";

interface ConsolidatedResultsProps {
  results: {
    services: SearchResultItem[];
    samples: SearchResultItem[];
    blogs: SearchResultItem[];
    faqs: SearchResultItem[];
    tags: SearchResultItem[];
  };
  counts: {
    services: number;
    samples: number;
    blogs: number;
    faqs: number;
    tags: number;
  };
  onViewAll: (type: ResultType) => void;
}

export function ConsolidatedResults({ results, counts, onViewAll }: ConsolidatedResultsProps) {
  const sections = [
    { key: "services", label: "Services", color: "bg-emerald-500", type: "service" as ResultType },
    { key: "samples", label: "Samples", color: "bg-amber-500", type: "sample" as ResultType },
    { key: "blogs", label: "Blogs", color: "bg-blue-500", type: "blog" as ResultType },
    { key: "faqs", label: "FAQs", color: "bg-purple-500", type: "faq" as ResultType },
  ];

  return (
    <div className="space-y-10">
      {sections.map(({ key, label, color, type }) => {
        const items = results[key as keyof typeof results] || [];
        const count = counts[key as keyof typeof counts] || 0;
        if (items.length === 0) return null;

        return (
          <div key={key} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${color}`} />
                {label} ({count})
              </h2>
              {count > 5 && (
                <button
                  onClick={() => onViewAll(type)}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  View all {label}
                  <ArrowRight size={12} />
                </button>
              )}
            </div>
            <div className="grid gap-3">
              {items.slice(0, 5).map((item, idx) => (
                <ResultCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        );
      })}

      {results.tags.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              Tags ({counts.tags})
            </h2>
            {counts.tags > 5 && (
              <button
                onClick={() => onViewAll("tag")}
                className="text-xs font-bold text-slate-600 hover:text-slate-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                View all Tags
                <ArrowRight size={12} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {results.tags.map((item, idx) => (
              <ResultCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
