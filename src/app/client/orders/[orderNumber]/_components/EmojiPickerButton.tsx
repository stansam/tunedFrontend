"use client";

import { useState, useRef, useEffect } from "react";
import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";

interface Props {
  onSelect: (emoji: { native: string }) => void;
  disabled?: boolean;
}

export function EmojiPickerButton({ onSelect, disabled }: Props) {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
        onClick={() => setShow(!show)}
      >
        <Smile className="h-4 w-4" />
      </Button>

      {show && (
        <div className="absolute bottom-full left-0 mb-2 z-50 shadow-xl border border-slate-100 rounded-xl overflow-hidden bg-white w-[280px] h-[320px]">
          <EmojiPicker
            onEmojiSelect={(emoji) => {
              if (emoji && emoji.emoji) {
                onSelect({ native: emoji.emoji });
                setShow(false);
              }
            }}
          >
            <EmojiPickerSearch />
            <EmojiPickerContent />
            <EmojiPickerFooter />
          </EmojiPicker>
        </div>
      )}
    </div>
  );
}
