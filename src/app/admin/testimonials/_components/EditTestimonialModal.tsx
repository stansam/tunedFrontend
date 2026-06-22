"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { EditTestimonialModalProps } from "../_props/testimonials.props";
import type { AdminTestimonialMutation } from "../_types/testimonials.type";

export function EditTestimonialModal({
  isOpen,
  testimonial,
  onClose,
  onSave,
  isSaving,
}: EditTestimonialModalProps) {
  const [data, setData] = useState<AdminTestimonialMutation>({
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
    is_approved: testimonial?.is_approved || false,
  });

  const isValid = data.content.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur-md shadow-lg max-w-lg text-slate-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-800">Edit Testimonial</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2 text-xs">
          <div className="space-y-1.5">
            <Label className="font-bold text-slate-600">Rating</Label>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const starVal = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, rating: starVal }))}
                    className="p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Star className={`size-6 ${starVal <= data.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="font-bold text-slate-600">Content *</Label>
            <Textarea
              value={data.content}
              onChange={(e) => setData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write client testimonial content here..."
              className="rounded-xl border border-slate-200 resize-none min-h-[100px] text-slate-700 focus-visible:ring-emerald-500"
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="rounded-xl border border-slate-200 cursor-pointer">
            Cancel
          </Button>
          <Button
            disabled={isSaving || !isValid}
            onClick={() => onSave(data)}
            className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
