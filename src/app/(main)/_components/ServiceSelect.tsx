"use client";

import { useState, useMemo, useRef, useCallback, useEffect, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceSelectProps } from "@/lib/props/index.props";
import { OptionItem } from "./OptionItem";
import { KEYS } from "./quote-form/_keys";

export function ServiceSelect({
  services,
  activeTab,
  value,
  onChange,
  disabled = false,
}: ServiceSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
 
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);
 
  const listboxId = useId();
  const triggerId = useId();

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const filtered = useMemo(() => 
    services.filter((s) => s.pricing_category === activeTab),
    [services, activeTab]
  );
  const selected = useMemo(() => 
    services.find((s) => s.id === value) ?? null,
    [services, value]
  );
  const selectedIndexInFiltered = useMemo(() => 
    filtered.findIndex((s) => s.id === value),
    [filtered, value]
  );

  useEffect(() => {
    if (value !== null && value !== undefined && value !== "" && selectedIndexInFiltered === -1) {
      onChange(null as unknown as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const openList = useCallback(() => {
    if (disabled) return;
    setActiveIndex(selectedIndexInFiltered >= 0 ? selectedIndexInFiltered : 0);
    setOpen(true);
  }, [disabled, selectedIndexInFiltered]);
 
  const closeList = useCallback((returnFocus = true) => {
    setOpen(false);
    setActiveIndex(-1);
    if (returnFocus) {
      setTimeout(() => triggerRef.current?.focus(), 0);
    }
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      onChange(id);
      closeList(true);
    },
    [onChange, closeList]
  );

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const list = listboxRef.current;
    if (!list) return;
    const option = list.children[activeIndex] as HTMLElement | undefined;
    option?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);
  
  useEffect(() => {
    if (!open) return;
 
    function handlePointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        closeList(false);
      }
    }
 
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, closeList]);

  useEffect(() => {
    if (!open) return;
 
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === KEYS.ESCAPE) {
        e.stopPropagation();
        closeList(true);
      }
    }
 
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [open, closeList]);

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (e.key) {
        case KEYS.ARROW_DOWN:
        case KEYS.ENTER:
        case KEYS.SPACE:
          e.preventDefault();
          openList();
          break;
        case KEYS.ARROW_UP:
          e.preventDefault();
          openList();
          break;
        default:
          break;
      }
    },
    [openList]
  );

  const handleListKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      const lastIndex = filtered.length - 1;
      const current = activeIndexRef.current;
 
      switch (e.key) {
        case KEYS.ARROW_DOWN:
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, lastIndex));
          break;
 
        case KEYS.ARROW_UP:
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
 
        case KEYS.HOME:
          e.preventDefault();
          setActiveIndex(0);
          break;
 
        case KEYS.END:
          e.preventDefault();
          setActiveIndex(lastIndex);
          break;
 
        case KEYS.ENTER:
        case KEYS.SPACE:
          e.preventDefault();
          const selectedService = filtered[current];
          if (selectedService) {
            handleSelect(selectedService.id);
          }
          break;
 
        case KEYS.TAB:
          closeList(false);
          break;
 
        default:
          break;
      }
    },
    [filtered, handleSelect, closeList]
  );

  const getOptionId = useCallback(
    (index: number) => `${listboxId}-option-${index}`,
    [listboxId]
  );
 
  const activeDescendant =
    open && activeIndex >= 0 ? getOptionId(activeIndex) : undefined;

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={activeDescendant}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => (open ? closeList(true) : openList())}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex w-full items-center justify-between rounded-full bg-slate-100 px-4 py-2.5 text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1",
          selected ? "text-slate-800 font-medium" : "text-slate-400",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <span className="truncate">
          {selected?.name ?? "Choose a service"}
        </span>
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
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={triggerId}
          aria-activedescendant={activeDescendant}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          onMouseDown={(e) => e.preventDefault()}
          className={cn(
            "absolute left-0 right-0 z-50 mt-1 max-h-52 overflow-y-auto",
            "rounded-xl bg-white shadow-lg ring-1 ring-slate-200 py-1"
          )}
        >
          {filtered.length === 0 ? (
            <li
              role="presentation"
              aria-live="polite"
              className="px-4 py-3 text-sm text-slate-400 text-center"
            >
              No services available
            </li>
          ) : (
            filtered.map((service, index) => (
              <OptionItem
                key={service.id}
                service={service}
                isSelected={service.id === value}
                isActive={index === activeIndex}
                optionId={getOptionId(index)}
                onSelect={handleSelect}
                onMouseEnter={setActiveIndex}
                index={index}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
}
