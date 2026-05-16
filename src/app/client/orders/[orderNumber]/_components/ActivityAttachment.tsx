import Image from "next/image";
import { Download, Mic, FileText } from "lucide-react";
import type { OrderAttachmentDTO } from "../_types";

interface ActivityAttachmentProps {
  attachment: OrderAttachmentDTO;
}

export function ActivityAttachment({ attachment }: ActivityAttachmentProps) {
  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(attachment.type || "");
  const isAudio = ["webm", "ogg", "mp3", "wav"].includes(attachment.type || "");

  if (isImage) {
    return (
      <a 
        href={attachment.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block mt-2 relative group rounded-md overflow-hidden border border-white/10 bg-black/5"
      >
        <Image 
          src={attachment.url} 
          alt={attachment.filename}
          width={240}
          height={192}
          unoptimized
          className="max-h-48 max-w-[240px] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Download className="w-6 h-6 text-white" />
        </div>
      </a>
    );
  }

  if (isAudio) {
    return (
      <div className="mt-2 flex items-center gap-2 p-2 rounded-lg bg-black/5 border border-white/10 max-w-[240px]">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Mic className="w-4 h-4 text-primary" />
        </div>
        <audio controls src={attachment.url} className="h-8 max-w-[180px] w-full" />
      </div>
    );
  }

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 flex items-center gap-3 p-2.5 rounded-lg bg-black/5 hover:bg-black/10 border border-white/10 transition-colors max-w-[240px] group"
    >
      <div className="h-8 w-8 rounded-md bg-white/50 flex items-center justify-center shrink-0 shadow-sm">
        <FileText className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-medium truncate text-foreground/90">
          {attachment.filename}
        </span>
        {attachment.size && (
          <span className="text-[10px] text-muted-foreground uppercase">
            {attachment.type || "FILE"} • {(attachment.size / 1024).toFixed(0)} KB
          </span>
        )}
      </div>
      <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </a>
  );
}
