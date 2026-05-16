"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommentAttachment } from "../_hooks/useCommentAttachment";
import { CommentAttachmentPreview } from "./CommentAttachmentPreview";
import { ComposerTextarea } from "./ComposerTextarea";
import { EmojiPickerButton } from "./EmojiPickerButton";
import { AttachmentButton } from "./AttachmentButton";
import { VoiceRecorderButton } from "./VoiceRecorderButton";
import type { ActivityComposerProps } from "../_props";

export function ActivityComposer({ onSend, isSending, orderId }: ActivityComposerProps) {
  const [content, setContent] = useState("");
  const { attachments, addFiles, removeAttachment, clearAll, uploadedIds, isUploading } = useCommentAttachment(orderId);

  const isSendingOrUploading = isSending || isUploading;
  const canSend = (content.trim() || uploadedIds.length > 0) && !isSendingOrUploading;

  const handleSend = async () => {
    if (!canSend) return;
    await onSend(content.trim(), uploadedIds);
    setContent("");
    clearAll();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
      <CommentAttachmentPreview attachments={attachments} onRemove={removeAttachment} />
      
      <div className="flex items-end gap-2 p-2">
        <div className="flex items-center gap-1 pb-1 px-1">
          <AttachmentButton onFilesSelected={addFiles} disabled={isSendingOrUploading} />
          <EmojiPickerButton onSelect={(e) => setContent(c => c + e.native)} disabled={isSendingOrUploading} />
        </div>

        <div className="flex-1">
          <ComposerTextarea
            value={content}
            onChange={setContent}
            onKeyDown={handleKeyDown}
            disabled={isSendingOrUploading}
            placeholder="Write a message..."
          />
        </div>

        <div className="pb-1 pr-1 flex items-center">
          {content.trim() || attachments.length > 0 ? (
            <Button
              type="button"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-transform active:scale-95"
              disabled={!canSend}
              onClick={handleSend}
            >
              <Send className="h-4 w-4 ml-0.5 text-white" />
            </Button>
          ) : (
            <VoiceRecorderButton 
              disabled={isSendingOrUploading}
              onRecordComplete={async (blob) => {
                // To support voice recording as attachment, we create a file from blob
                const file = new File([blob], `VoiceNote_${new Date().getTime()}.webm`, { type: blob.type });
                await addFiles([file]);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
