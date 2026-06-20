"use client";

import { useEffect, useRef } from "react";
import { COMMENT_MAX_CHARS } from "../_fallback";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ComposerTextarea({ value, onChange, onKeyDown, disabled, placeholder }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  return (
    <div className="relative flex flex-col w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, COMMENT_MAX_CHARS))}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full resize-none bg-transparent py-2 px-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:opacity-50 scrollbar-thin"
        rows={1}
      />
      {value.length > COMMENT_MAX_CHARS * 0.8 && (
        <span className="absolute bottom-1 right-1 text-[10px] text-slate-400 bg-white/80 px-1 rounded">
          {value.length}/{COMMENT_MAX_CHARS}
        </span>
      )}
    </div>
  );
}
