import { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "@/components/ui/button";
import { useSendComment } from "../_hooks/useOrderComments";
import { ActivityAttachmentUpload } from "./ActivityAttachmentUpload";
import { ActivityVoiceRecorder } from "./ActivityVoiceRecorder";

interface ActivityInputProps {
  orderId: string;
}

export function ActivityInput({ orderId }: ActivityInputProps) {
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  
  const sendMutation = useSendComment();

  // Handle click outside emoji picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if ((!content.trim() && attachmentIds.length === 0) || sendMutation.isPending) return;
    
    sendMutation.mutate(
      { order_id: orderId, content: content.trim(), attachment_ids: attachmentIds },
      {
        onSuccess: () => {
          setContent("");
          setAttachmentIds([]);
          setShowEmoji(false);
        }
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const addEmoji = (emoji: { native: string }) => {
    setContent(prev => prev + emoji.native);
  };

  const handleUploadComplete = (ids: string[]) => {
    setAttachmentIds(prev => [...prev, ...ids]);
  };

  return (
    <div className="relative border-t border-white/20 bg-white/40 dark:bg-black/20 p-4 backdrop-blur-xl">
      <div className="flex items-end gap-2 max-w-4xl mx-auto relative">
        <ActivityAttachmentUpload 
          orderId={orderId} 
          onUploadComplete={handleUploadComplete}
          disabled={sendMutation.isPending}
        />
        
        <div className="flex-1 relative bg-white/60 dark:bg-black/40 rounded-3xl border border-white/20 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/20">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={attachmentIds.length > 0 ? "Add a message to your attachments..." : "Type a message..."}
            className="w-full bg-transparent border-none resize-none px-4 py-3 min-h-[44px] max-h-32 text-sm focus:outline-none scrollbar-hide"
            rows={1}
            style={{ height: "auto" }}
          />
          
          <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {content.trim() || attachmentIds.length > 0 ? (
          <Button 
            className="rounded-full h-11 w-11 shrink-0 bg-primary hover:bg-primary/90 shadow-md transition-transform active:scale-95" 
            size="icon"
            onClick={handleSend}
            disabled={sendMutation.isPending}
          >
            <Send className="h-5 w-5 ml-1" />
          </Button>
        ) : (
          <ActivityVoiceRecorder 
            orderId={orderId} 
            onUploadComplete={(ids) => {
              setAttachmentIds(prev => [...prev, ...ids]);
              // Auto-send voice notes could go here if desired
            }} 
            disabled={sendMutation.isPending}
          />
        )}
      </div>

      {showEmoji && (
        <div className="absolute bottom-full right-4 mb-2 z-50 shadow-xl" ref={emojiRef}>
          <Picker 
            data={data} 
            onEmojiSelect={addEmoji} 
            theme="light" 
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      )}
      
      {attachmentIds.length > 0 && (
        <div className="absolute -top-8 left-16 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20 backdrop-blur-md">
          {attachmentIds.length} file(s) attached
        </div>
      )}
    </div>
  );
}
