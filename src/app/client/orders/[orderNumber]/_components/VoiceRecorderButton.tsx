"use client";

import { useEffect } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoiceRecorder } from "../_hooks/useVoiceRecorder";
import { formatVoiceDuration } from "../_utils";

interface Props {
  onRecordComplete: (blob: Blob, durationMs: number) => void;
  disabled?: boolean;
}

export function VoiceRecorderButton({ onRecordComplete, disabled }: Props) {
  const { status, durationMs, blob, start, stop, reset } = useVoiceRecorder();

  // Effect to bubble up the blob once recording stops
  useEffect(() => {
    if (blob && status === "stopped") {
      onRecordComplete(blob, durationMs);
      reset();
    }
  }, [blob, status, durationMs, onRecordComplete, reset]);

  if (status === "recording") {
    return (
      <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full border border-red-100">
        <div className="flex items-center gap-1.5 text-red-600">
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-medium font-mono">{formatVoiceDuration(durationMs)}</span>
        </div>
        <Button
          type="button"
          size="icon"
          className="h-6 w-6 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
          onClick={() => {
            stop();
            // Since stop is async with MediaRecorder onstop, we use a timeout or let the parent handle the blob effect
            // Wait, useVoiceRecorder doesn't fire an event. Let's add an effect to listen for blob changes
          }}
        >
          <Square className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      size="icon"
      className="h-9 w-9 shrink-0 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition-transform active:scale-95"
      disabled={disabled}
      onClick={start}
    >
      <Mic className="h-4 w-4" />
    </Button>
  );
}
