"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LevelSelectProps } from "@/lib/props";

export function LevelSelect({
  levels,
  value,
  onChange,
  disabled = false,
}: LevelSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selected = levels.find((l) => l.id === value) ?? null;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleSelect = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label="Choose a level"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between rounded-full bg-slate-100 px-4 py-2.5 text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1",
          selected ? "text-slate-800 font-medium" : "text-slate-400",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <span className="truncate">{selected?.name ?? "Level"}</span>
        <ChevronDown
          size={15}
          className={cn(
            "ml-2 shrink-0 text-slate-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Levels"
          className="absolute left-0 right-0 z-50 mt-1 max-h-52 overflow-y-auto rounded-xl bg-white shadow-lg ring-1 ring-slate-200 py-1"
        >
          {levels.map((level) => (
            <li
              key={level.id}
              role="option"
              aria-selected={level.id === value}
              onClick={() => handleSelect(level.id)}
              className={cn(
                "flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors",
                level.id === value
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              <span>{level.name}</span>
              {level.id === value && (
                <Check size={14} className="text-emerald-500" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
