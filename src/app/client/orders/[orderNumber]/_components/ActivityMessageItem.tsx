import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2, Check, X } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { OrderCommentDTO } from "../_types";
import { ActivityAttachment } from "./ActivityAttachment";

interface ActivityMessageItemProps {
  message: OrderCommentDTO;
  isOwn: boolean;
  onEdit?: (msg: OrderCommentDTO) => void;
  onDelete?: (msg: OrderCommentDTO) => void;
}

export function ActivityMessageItem({ message, isOwn, onEdit, onDelete }: ActivityMessageItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  
  const isSupport = message.sender_role === "admin" || message.sender_role === "support";

  if (isEditing) {
    return (
      <div className="w-full max-w-[85%] bg-white/60 dark:bg-black/40 p-3 rounded-xl border border-primary/20 shadow-sm backdrop-blur-md">
        <Textarea 
          value={editContent} 
          onChange={(e) => setEditContent(e.target.value)}
          className="min-h-[60px] text-sm resize-none mb-2 bg-white/50 dark:bg-black/50"
        />
        <div className="flex justify-end gap-2">
          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full text-muted-foreground" onClick={() => { setIsEditing(false); setEditContent(message.content); }}>
            <X className="h-4 w-4" />
          </Button>
          <Button size="icon" className="h-7 w-7 rounded-full bg-primary/20 text-primary hover:bg-primary/30" onClick={() => { onEdit?.({ ...message, content: editContent }); setIsEditing(false); }}>
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group max-w-[85%] flex ${isOwn ? "justify-end" : "justify-start"} items-center gap-2`}>
      {isOwn && onEdit && onDelete && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:bg-white/50">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 bg-white/80 backdrop-blur-md border-white/20">
              <DropdownMenuItem className="text-xs py-1.5 cursor-pointer" onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-3 w-3" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs py-1.5 cursor-pointer text-destructive focus:text-destructive" onClick={() => onDelete(message)}>
                <Trash2 className="mr-2 h-3 w-3" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div className={`px-4 py-2.5 rounded-2xl text-sm shadow-sm border backdrop-blur-md ${
        isOwn 
          ? "bg-primary/10 border-primary/20 text-foreground rounded-tr-sm" 
          : isSupport
            ? "bg-emerald-500/10 border-emerald-500/20 text-foreground rounded-tl-sm"
            : "bg-white/60 dark:bg-black/40 border-white/20 text-foreground rounded-tl-sm"
      }`}>
        <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">{message.content}</p>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            {message.attachments.map(att => (
              <ActivityAttachment key={att.id} attachment={att} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
