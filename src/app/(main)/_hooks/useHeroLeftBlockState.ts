"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchTracking } from "@/lib/hooks/useSearchTracking";
import type { FlatItem } from "../_types/search.types";
import { Route } from "next";

export function useHeroLeftBlockState({ onSearch }: { onSearch?: (term: string) => void }) {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [flatItems, setFlatItems] = useState<FlatItem[]>([]);
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { trackEvent, trackClick } = useSearchTracking();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const isOut = dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                    inputRef.current && !inputRef.current.contains(e.target as Node);
      if (isOut) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchSubmit = (term: string, path?: string) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("recent_searches");
      const list = stored ? JSON.parse(stored) : [];
      const updated = [term, ...list.filter((x: string) => x !== term)].slice(0, 5);
      localStorage.setItem("recent_searches", JSON.stringify(updated));
    }
    trackEvent(term, 0, "all", "hero");
    if (onSearch) onSearch(term);
    else router.push((path || `/search/${encodeURIComponent(term)}`) as Route );
    setIsDropdownOpen(false);
    inputRef.current?.blur();
  };

  const handleDropdownSelect = (val: string, path?: string) => {
    setQuery(val);
    handleSearchSubmit(val, path);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") setIsDropdownOpen(true);
      return;
    }
    const count = flatItems.length;
    // if (e.key === "ArrowDown") {
    //   e.preventDefault();
    //   setActiveIndex((prev) => (count > 0 ? (prev + 1) % count : -1));
    // } else if (e.key === "ArrowUp") {
    //   e.preventDefault();
    //   setActiveIndex((prev) => (count > 0 ? (prev - 1 + count) % count : -1));
    // } else if (e.key === "Escape") {
    //   setIsDropdownOpen(false);
    //   setActiveIndex(-1);
    // } else if (e.key === "Enter" && flatItems[activeIndex]) {
    //   const item = flatItems[activeIndex];
    //   e.preventDefault();
    //   if (["service", "sample", "blog", "faq", "tag"].includes(item.type)) {
    //     trackClick(item.type as "service" | "sample" | "blog" | "faq" | "tag", item.id.split("-")[1] || "", activeIndex);
    //   }
    //   handleDropdownSelect(item.value, item.path);
    // }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (count > 0 ? (prev + 1) % count : -1));
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (count > 0 ? (prev - 1 + count) % count : -1));
        break;

      case "Escape":
        setIsDropdownOpen(false);
        setActiveIndex(-1);
        break;

      case "Enter": {
        const item = flatItems[activeIndex];

        if (!item) return;

        e.preventDefault();

        if (
          item.type === "service" ||
          item.type === "sample" ||
          item.type === "blog" ||
          item.type === "faq" ||
          item.type === "tag"
        ) {
          trackClick(
            item.type,
            item.id.split("-")[1] ?? "",
            activeIndex
          );
        }

        handleDropdownSelect(item.value, item.path);
        break;
      }
    }
  };

  return {
    query, setQuery, isDropdownOpen, setIsDropdownOpen, activeIndex, setActiveIndex,
    flatItems, setFlatItems, inputRef, dropdownRef, handleKeyDown, handleDropdownSelect,
    handleSubmit: (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) handleSearchSubmit(query.trim());
    },
  };
}
