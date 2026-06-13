"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface MessageUserDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onConfirm: (message: string) => Promise<void> | void;
  readonly isPending: boolean;
  readonly userId: string;
  readonly userName: string;
}

export function MessageUserDialog({
  open,
  onClose,
  onConfirm,
  isPending,
  userId,
  userName,
}: MessageUserDialogProps) {
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!message.trim() || !userId) return;
    try {
      await onConfirm(message.trim());
      setMessage("");
      onClose();
    } catch {
      // Errors handled by parent component / query mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="rounded-2xl max-w-sm bg-white/95 backdrop-blur-md border border-white/20 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-slate-900 font-bold">
            Message {userName}
          </DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder={`Enter message to send to ${userName}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px] resize-none border-slate-200 focus-visible:ring-emerald-500 rounded-xl"
          maxLength={500}
        />
        <DialogFooter className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={handleClose} className="rounded-xl border-slate-200">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !message.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
          >
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
