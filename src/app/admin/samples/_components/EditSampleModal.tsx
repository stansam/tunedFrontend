"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { EditSampleModalProps } from "../_props/samples.props";
import type { AdminSampleMutation } from "../_types/samples.type";

export function EditSampleModal({ isOpen, sample, onClose, onSave, isSaving, services }: EditSampleModalProps) {
  const [data, setData] = useState<AdminSampleMutation>({
    title: sample?.title || "",
    content: sample?.excerpt || "",
    service_id: sample?.service_id || null,
    excerpt: sample?.excerpt || "",
    word_count: sample?.word_count || 0,
    featured: sample?.featured || false,
    image: sample?.image || "",
    tags: sample?.tags.map((t) => t.name) || [],
  });

  const isValid = data.title.trim().length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur-md shadow-lg max-w-lg text-slate-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-base font-bold text-slate-800">Edit Sample Details</DialogTitle></DialogHeader>
        <div className="space-y-3 mt-2 text-xs">
          <div className="space-y-1"><Label className="font-bold">Title *</Label><Input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="rounded-xl border border-slate-200" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><Label className="font-bold">Category</Label>
              <select value={data.service_id || ""} onChange={(e) => setData({ ...data, service_id: e.target.value || null })} className="w-full rounded-xl border border-slate-200 p-2 bg-white shadow-2xs">
                <option value="">Select Category</option>
                {services.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
              </select>
            </div>
            <div className="space-y-1"><Label className="font-bold">Word Count</Label><Input type="number" value={data.word_count} onChange={(e) => setData({ ...data, word_count: Number(e.target.value) || 0 })} className="rounded-xl border border-slate-200" /></div>
          </div>
          <div className="space-y-1"><Label className="font-bold">Tags (Comma-separated)</Label><Input value={data.tags.join(", ")} onChange={(e) => setData({ ...data, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} className="rounded-xl border border-slate-200" /></div>
          <div className="space-y-1"><Label className="font-bold">Excerpt / Summary</Label><Textarea value={data.excerpt} onChange={(e) => setData({ ...data, excerpt: e.target.value })} className="rounded-xl border border-slate-200 resize-none min-h-[50px]" /></div>
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 shadow-2xs">
            <div><Label className="font-bold block">Featured Sample</Label><span className="text-[9px] text-slate-400">Display on home portal</span></div>
            <Switch checked={data.featured} onCheckedChange={(c) => setData({ ...data, featured: c })} />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="rounded-xl border border-slate-200">Cancel</Button>
          <Button disabled={isSaving || !isValid} onClick={() => onSave(data)} className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-500">{isSaving ? "Saving..." : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
