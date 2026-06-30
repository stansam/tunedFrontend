"use client";

import { ArrowLeft, Volume2, VolumeX, X } from "lucide-react";
import { useChatWidget } from "../_hooks/useChatWidget";

interface ChatWidgetHeaderProps {
  readonly title: string;
  readonly isMuted?: boolean;
  readonly onToggleMute?: () => void;
}

export function ChatWidgetHeader({ title, isMuted = false, onToggleMute }: ChatWidgetHeaderProps) {
  const { view, backToList, close } = useChatWidget();

  return (
    <div className="flex h-14 items-center justify-between border-b border-white/10 bg-slate-900 px-4 text-white rounded-t-2xl shadow-md shrink-0">
      <div className="flex items-center gap-2">
        {view === "chat_screen" && (
          <button
            type="button"
            onClick={backToList}
            aria-label="Back to conversations"
            className="rounded-lg p-1 hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="flex flex-col">
          <span className="text-xs font-bold truncate max-w-[200px]">{title}</span>
          <span className="text-[9px] text-emerald-400 font-medium flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Support Online
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {onToggleMute && (
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
            className="rounded-lg p-1 text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        )}
        <button
          type="button"
          onClick={close}
          aria-label="Close support chat"
          className="rounded-lg p-1 text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
export default ChatWidgetHeader;
