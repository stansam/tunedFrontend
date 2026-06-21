import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useServiceMutations } from "../_hooks/useServiceMutations";
import { AdminCategoryMutationSchema } from "../_schemas/services.schema";
import type { CategoryModalProps } from "../_props/services.props";

export function CategoryModal({ isOpen, onClose, category }: CategoryModalProps) {
  const { createCategory, updateCategory } = useServiceMutations();
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [order, setOrder] = useState(category?.order ?? 0);

  const handleSave = () => {
    const payload = { name, description, order };
    const parsed = AdminCategoryMutationSchema.safeParse(payload);
    if (!parsed.success) return;

    if (category) {
      updateCategory.mutate({ id: category.id, data: payload }, { onSuccess: onClose });
    } else {
      createCategory.mutate(payload, { onSuccess: onClose });
    }
  };

  const isSubmitting = createCategory.isPending || updateCategory.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-slate-800 font-bold">
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Provide details for the service category. Click save to store it.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2 text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-slate-700">Category Name</span>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/50 border-white/80 focus:border-emerald-500/50 rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-slate-700">Description</span>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] bg-white/50 border-white/80 focus:border-emerald-500/50 rounded-xl"
            />
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-slate-700">Display Order</span>
            <Input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="bg-white/50 border-white/80 focus:border-emerald-500/50 rounded-xl"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting} className="rounded-xl text-xs h-9">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting || !name.trim()} className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs h-9">
            {isSubmitting ? "Saving..." : "Save Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
