import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TagSelector } from "./TagSelector";
import type { ServiceFormFieldsProps } from "../_props/services.props";

export function ServiceFormFields({
  name, setName, slug, setSlug, description, setDescription,
  catId, setCatId, priceCatId, setPriceCatId, featured, setFeatured,
  active, setActive, tags, setTags, categories, pricingCategories,
}: ServiceFormFieldsProps) {
  return (
    <div className="space-y-3.5 text-xs">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="font-semibold text-slate-700">Service Name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-white/50 border-white/80 rounded-xl" />
        </div>
        <div className="space-y-1">
          <span className="font-semibold text-slate-700">Slug (Optional)</span>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto" className="bg-white/50 border-white/80 rounded-xl" />
        </div>
      </div>
      <div className="space-y-1">
        <span className="font-semibold text-slate-700">Description</span>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[50px] bg-white/50 border-white/80 rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="font-semibold text-slate-700">Category</span>
          <Select value={catId} onValueChange={setCatId}>
            <SelectTrigger className="bg-white/50 border-white/80 rounded-xl text-xs">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white/80 backdrop-blur-lg">
              {categories.map((c) => (<SelectItem key={c.id} value={c.id} className="text-xs">{c.name}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <span className="font-semibold text-slate-700">Pricing Tier</span>
          <Select value={priceCatId} onValueChange={setPriceCatId}>
            <SelectTrigger className="bg-white/50 border-white/80 rounded-xl text-xs">
              <SelectValue placeholder="Select Tier" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white/80 backdrop-blur-lg">
              {pricingCategories.map((p) => (<SelectItem key={p.id} value={p.id} className="text-xs">{p.name}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1">
        <span className="font-semibold text-slate-700">Tags</span>
        <TagSelector selected={tags} onChange={setTags} />
      </div>
      <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/50 bg-white/30 backdrop-blur-xs">
        <span className="font-semibold text-slate-700">Featured Service</span>
        <Switch checked={featured} onCheckedChange={setFeatured} />
      </div>
      <div className="flex items-center justify-between p-2.5 rounded-xl border border-white/50 bg-white/30 backdrop-blur-xs">
        <span className="font-semibold text-slate-700">Active / Pause</span>
        <Switch checked={active} onCheckedChange={setActive} />
      </div>
    </div>
  );
}
