import { Paperclip, FileAudio } from "lucide-react";
import { isAudioFile, formatFileSize } from "../_utils";
import type { CommentAttachmentBadgeProps } from "../_props";

export function CommentAttachmentBadge({ attachment }: CommentAttachmentBadgeProps) {
  const isAudio = isAudioFile(attachment.filename);
  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1 flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 text-xs hover:bg-white/20 transition-colors"
    >
      {isAudio
        ? <FileAudio className="h-3.5 w-3.5 shrink-0 opacity-80" />
        : <Paperclip className="h-3.5 w-3.5 shrink-0 opacity-80" />}
      <span className="truncate max-w-[140px]">{attachment.filename}</span>
      {attachment.size && (
        <span className="shrink-0 opacity-60">{formatFileSize(attachment.size)}</span>
      )}
    </a>
  );
}
