import { useState, useRef } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderFileUpload } from "../_hooks/useOrderFileUpload";

interface ActivityVoiceRecorderProps {
  orderId: string;
  onUploadComplete: (fileIds: string[]) => void;
  disabled?: boolean;
}

export function ActivityVoiceRecorder({ orderId, onUploadComplete, disabled }: ActivityVoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const uploadMutation = useOrderFileUpload();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const file = new File([audioBlob], `voice_note_${Date.now()}.webm`, { type: "audio/webm" });
        
        try {
          const res = await uploadMutation.mutateAsync({ orderId, files: [file] });
          onUploadComplete(res.file_ids);
        } catch (error) {
          console.error("Voice upload failed", error);
        }
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (uploadMutation.isPending) {
    return (
      <Button variant="ghost" size="icon" disabled className="h-10 w-10 shrink-0 text-primary">
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={`rounded-full h-10 w-10 shrink-0 transition-colors ${
        isRecording 
          ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:text-red-600 animate-pulse" 
          : "text-muted-foreground hover:bg-white/50"
      }`}
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled}
    >
      {isRecording ? <Square className="h-4 w-4 fill-current" /> : <Mic className="h-5 w-5" />}
    </Button>
  );
}
