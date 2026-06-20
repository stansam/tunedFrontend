"use client";

import { useRef } from "react";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMMENT_ATTACHMENT_ALLOWED } from "../_fallback";

interface Props {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function AttachmentButton({ onFilesSelected, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleChange}
        accept={COMMENT_ATTACHMENT_ALLOWED.join(",")}
        className="hidden"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
      >
        <Paperclip className="h-4 w-4" />
      </Button>
    </>
  );
}
