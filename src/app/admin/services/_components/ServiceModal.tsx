import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useServiceMutations } from "../_hooks/useServiceMutations";
import { ServiceFormFields } from "./ServiceFormFields";
import { AdminServiceMutationSchema } from "../_schemas/services.schema";
import type { ServiceModalProps } from "../_props/services.props";

export function ServiceModal({
  isOpen,
  onClose,
  service,
  categories,
  pricingCategories,
}: ServiceModalProps) {
  const { createService, updateService } = useServiceMutations();
  const [name, setName] = useState(service?.name ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [catId, setCatId] = useState(service?.category_id ?? "");
  const [priceCatId, setPriceCatId] = useState(service?.pricing_category_id ?? "");
  const [featured, setFeatured] = useState(service?.featured ?? false);
  const [active, setActive] = useState(service?.is_active ?? true);
  const [tags, setTags] = useState<readonly string[]>(service?.tags?.map((t) => t.name) ?? []);

  const handleSave = () => {
    const payload = {
      name, slug: slug || undefined, description, category_id: catId,
      pricing_category_id: priceCatId, featured, is_active: active, tags: [...tags],
    };
    if (!AdminServiceMutationSchema.safeParse(payload).success) return;
    if (service) {
      updateService.mutate({ id: service.id, data: payload }, { onSuccess: onClose });
    } else {
      createService.mutate(payload, { onSuccess: onClose });
    }
  };

  const isSubmitting = createService.isPending || updateService.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white/90 backdrop-blur-lg border border-white/50 rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-slate-800 font-bold">{service ? "Edit Service" : "Add Service"}</DialogTitle>
        </DialogHeader>
        <ServiceFormFields
          name={name} setName={setName} slug={slug} setSlug={setSlug}
          description={description} setDescription={setDescription}
          catId={catId} setCatId={setCatId} priceCatId={priceCatId} setPriceCatId={setPriceCatId}
          featured={featured} setFeatured={setFeatured} active={active} setActive={setActive}
          tags={tags} setTags={setTags} categories={categories} pricingCategories={pricingCategories}
        />
        <DialogFooter className="gap-2 pt-2 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting} className="rounded-xl text-xs h-9">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSubmitting || !name.trim() || !catId || !priceCatId}
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs h-9"
          >
            {isSubmitting ? "Saving..." : "Save Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
