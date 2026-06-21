import { useState } from "react";
import type { CategoryModalProps } from "../_props/blogs.props";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function CategoryModal({ isOpen, category, onClose, onSave, isSaving }: CategoryModalProps) {
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, description });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-slate-50/90 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-slate-900 font-bold">{category ? "Edit Category" : "Create Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="cat-name" className="text-slate-700 font-semibold">Category Name</Label>
            <Input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Academic Guide" required className="bg-white/50 border-white/60 focus:bg-white focus:border-indigo-500 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cat-desc" className="text-slate-700 font-semibold">Description</Label>
            <Textarea id="cat-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the category..." className="bg-white/50 border-white/60 focus:bg-white focus:border-indigo-500 rounded-xl min-h-[100px]" />
          </div>
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSaving} className="rounded-xl border-white/50 bg-white/40">
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving || !name.trim()} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              {isSaving ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
