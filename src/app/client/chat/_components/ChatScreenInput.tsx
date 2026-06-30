"use client";

import React, { useRef, useState } from "react";
import { Paperclip, Send, Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmojiPickerButton } from "../../orders/[orderNumber]/_components/EmojiPickerButton";
import { toast } from "sonner";
import type { ApiResult } from "@/lib/types";
import type { ChatMessage, ChatAttachment } from "@/app/admin/chats/_types/chats.type";

interface ChatScreenInputProps {
  readonly onSendMessage: (content: string) => Promise<ApiResult<ChatMessage> | void>;
  readonly onUploadAttachment: (file: File) => Promise<ApiResult<ChatAttachment> | void>;
  readonly onKeyDown?: () => void;
}

export function ChatScreenInput({ onSendMessage, onUploadAttachment, onKeyDown }: ChatScreenInputProps) {
  const [content, setContent] = useState("");
  const [recording, setRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await onSendMessage(content.trim());
      setContent("");
    } catch {
      toast.error("Failed to send message");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await onUploadAttachment(file);
      toast.success("File uploaded");
    } catch {
      toast.error("Failed to upload file");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([audioBlob], `recording-${Date.now()}.webm`, { type: "audio/webm" });
        await onUploadAttachment(file);
        toast.success("Audio recording uploaded");
      };
      recorder.start();
      setRecording(true);
    } catch {
      toast.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" aria-label="Choose file to attach" />
      <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} aria-label="Upload attachment" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full shrink-0"><Paperclip className="h-4 w-4" /></Button>
      <EmojiPickerButton onSelect={(emoji) => setContent((c) => c + emoji.native)} />
      <Input value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={() => onKeyDown?.()} placeholder={recording ? "Recording audio..." : "Type a message..."} disabled={recording} aria-label="Chat message text" className="flex-1 text-xs h-8 bg-slate-55 border-slate-200" />
      {recording ? (
        <Button type="button" size="icon" onClick={stopRecording} aria-label="Stop recording and upload" className="h-8 w-8 bg-red-500 hover:bg-red-650 text-white rounded-full shrink-0 animate-pulse"><Square className="h-3.5 w-3.5" /></Button>
      ) : (
        <Button type="button" size="icon" variant="ghost" onClick={startRecording} aria-label="Start recording audio" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full shrink-0"><Mic className="h-4 w-4" /></Button>
      )}
      <Button type="submit" size="icon" disabled={!content.trim()} aria-label="Send message" className="h-8 w-8 bg-slate-900 hover:bg-slate-800 text-white rounded-full shrink-0"><Send className="h-3.5 w-3.5" /></Button>
    </form>
  );
}
export default ChatScreenInput;
