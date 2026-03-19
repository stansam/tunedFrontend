import React from "react";
import { OptionItemProps } from "./quote-form/_props";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export const OptionItem = React.memo(function OptionItem({
  service,
  isSelected,
  isActive,
  optionId,
  onSelect,
  onMouseEnter,
  index,
}: OptionItemProps) {
  return (
    <li
      id={optionId}
      role="option"
      aria-selected={isSelected}
      tabIndex={-1}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={() => onSelect(service.id)}
      onMouseEnter={() => onMouseEnter(index)}
      className={cn(
        "flex cursor-pointer select-none items-center justify-between px-4 py-2.5 text-sm outline-none transition-colors",
        isSelected
          ? "bg-emerald-50 font-medium text-emerald-700"
          : "text-slate-700",
        isActive && !isSelected && "bg-slate-50",
        isActive && isSelected && "bg-emerald-100"
      )}
    >
      <span className="truncate">{service.name}</span>
      {isSelected && (
        <Check
          size={14}
          aria-hidden="true"
          className="ml-2 shrink-0 text-emerald-500"
        />
      )}
    </li>
  );
});