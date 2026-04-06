import React from "react";
import { cn } from "@/lib/utils";

export function PlayButton() {
  return (
    <div className={cn(
      "flex h-10 w-10 items-center justify-center rounded-full",
      "bg-white/20 backdrop-blur-sm border border-white/30",
      "cursor-pointer hover:bg-white/30 transition-colors",
      "shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
    )}>
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="white"
        aria-hidden="true"
        className="ml-0.5"
      >
        <path d="M1 1.5L13 8L1 14.5V1.5Z" />
      </svg>
    </div>
  );
}
