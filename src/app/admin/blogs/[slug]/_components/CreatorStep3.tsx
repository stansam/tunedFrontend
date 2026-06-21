import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadMedia } from "../../_services/blogs.service";
import { toast } from "sonner";
import type {Step3Props } from "../_props";

export function CreatorStep3({ data, onChange, onPrev, onNext }: Step3Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [tagsInput, setTagsInput] = useState(data.tags.join(", "));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const res = await uploadMedia(file);
    setIsUploading(false);
    if (res.ok) {
      toast.success("Image uploaded and linked successfully!");
      onChange({ featured_image_id: res.data.id });
    } else {
      toast.error(res.error?.message || "Failed to upload image.");
    }
  };

  const handleTagsChange = (val: string) => {
    setTagsInput(val);
    const parsed = val.split(",").map((t) => t.trim()).filter(Boolean);
    onChange({ tags: parsed });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-slate-800 border-b border-white/20 pb-2">Step 3: Media & SEO</h3>

      <div className="space-y-2">
        <Label className="text-slate-700 font-semibold">Featured Image</Label>
        <div className="flex items-center gap-4">
          {data.featured_image_id ? (
            <div className="flex items-center justify-between bg-white/50 border border-white/60 px-4 py-2.5 rounded-xl w-full">
              <span className="text-xs text-indigo-600 font-semibold truncate">Linked Media Asset ID: {data.featured_image_id}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-6 text-slate-500 hover:bg-slate-200/50"
                onClick={() => onChange({ featured_image_id: null })}
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-white/40 hover:bg-white/60 transition-colors p-4 rounded-xl cursor-pointer w-full text-slate-600 text-xs font-semibold select-none">
              {isUploading ? (
                <div className="flex items-center gap-1.5">
                  <Loader2 className="size-4 animate-spin text-indigo-600" /> Uploading image...
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Upload className="size-4 text-indigo-600" /> Upload and Link Featured Image
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleUpload} disabled={isUploading} className="hidden" />
            </label>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-semibold">SEO Meta Description</Label>
        <Textarea
          value={data.meta_description}
          onChange={(e) => onChange({ meta_description: e.target.value })}
          placeholder="Meta description for search engines..."
          className="bg-white/50 border-white/60 focus:bg-white rounded-xl min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-semibold">Tags (comma-separated)</Label>
        <Input
          value={tagsInput}
          onChange={(e) => handleTagsChange(e.target.value)}
          placeholder="e.g. thesis, writing tips, structure"
          className="bg-white/50 border-white/60 focus:bg-white rounded-xl"
        />
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onPrev} className="rounded-xl border-white/50 bg-white/40">
          Back
        </Button>
        <Button onClick={onNext} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">
          Next Step
        </Button>
      </div>
    </div>
  );
}
