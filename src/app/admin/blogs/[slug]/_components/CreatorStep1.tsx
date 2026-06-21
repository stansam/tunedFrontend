import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Step1Props } from "../_props";

export function CreatorStep1({ data, onChange, categories, onNext }: Step1Props) {
  const isFormValid = !!(data.title.trim() && data.author.trim() && data.category_id.trim());

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-slate-800 border-b border-white/20 pb-2">Step 1: General Information</h3>
      <div className="space-y-2">
        <Label className="text-slate-700 font-semibold">Title *</Label>
        <Input
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Enter blog post title"
          className="bg-white/50 border-white/60 focus:bg-white rounded-xl"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Author *</Label>
          <Input
            value={data.author}
            onChange={(e) => onChange({ author: e.target.value })}
            placeholder="Author name"
            className="bg-white/50 border-white/60 focus:bg-white rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Category *</Label>
          <Select value={data.category_id} onValueChange={(val) => onChange({ category_id: val })}>
            <SelectTrigger className="bg-white/50 border-white/60 rounded-xl">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-50/90 backdrop-blur-lg border border-white/50 rounded-xl">
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-700 font-semibold">Excerpt</Label>
        <Textarea
          value={data.excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          placeholder="Brief summary of the post..."
          className="bg-white/50 border-white/60 focus:bg-white rounded-xl min-h-[80px]"
        />
      </div>
      <div className="flex justify-end pt-2">
        <Button onClick={onNext} disabled={!isFormValid} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">
          Next Step
        </Button>
      </div>
    </div>
  );
}
