"use client";

import { Search } from "lucide-react";
import type { HeroLeftBlockProps } from "@/lib/props/index.props";
import { SearchDropdown } from "./SearchDropdown";
import { BookIllustration } from "./BookIllustration";
import { HeroLeftBlockHeader } from "./HeroLeftBlockHeader";
import { DecorativeDots } from "./DecorativeDots";
import { useHeroLeftBlockState } from "../../_hooks/useHeroLeftBlockState";

export function HeroLeftBlock({
  searchPlaceholder = "What are you looking for?",
  onSearch,
}: HeroLeftBlockProps) {
  const {
    query,
    setQuery,
    isDropdownOpen,
    setIsDropdownOpen,
    activeIndex,
    setActiveIndex,
    setFlatItems,
    inputRef,
    dropdownRef,
    handleSubmit,
    handleKeyDown,
    handleDropdownSelect,
  } = useHeroLeftBlockState({ onSearch });

  return (
    <div className="flex flex-col items-center justify-center align-center gap-0 relative w-full">
      <BookIllustration />
      <HeroLeftBlockHeader />

      <div ref={dropdownRef} className="relative w-full max-w-[320px]">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus-within:border-emerald-500/35 focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:shadow-[0_4px_20px_-2px_rgba(16,185,129,0.08)] transition-all duration-300"
          role="search"
          aria-label="Search services"
        >
          <Search size={16} className="shrink-0 text-slate-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsDropdownOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
            aria-label={searchPlaceholder}
            aria-expanded={isDropdownOpen}
            aria-autocomplete="list"
            aria-controls="search-results-listbox"
            autoComplete="off"
          />
        </form>

        <SearchDropdown
          query={query}
          isOpen={isDropdownOpen}
          onSelect={handleDropdownSelect}
          onClose={() => setIsDropdownOpen(false)}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setFlatItems={setFlatItems}
        />
      </div>

      <DecorativeDots />
    </div>
  );
}
