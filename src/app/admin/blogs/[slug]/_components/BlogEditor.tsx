import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MarkdownEditor } from "./MarkdownEditor";
import { usePostMutations } from "../../_hooks/usePostMutations";
import type { AdminBlogPostResponse, AdminBlogCategoryResponse } from "../../_types/blogs.types";
import { Route } from "next";

interface BlogEditorProps {
  readonly post: AdminBlogPostResponse;
  readonly categories: readonly AdminBlogCategoryResponse[];
}

export function BlogEditor({ post, categories }: BlogEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
    author: post.author,
    category_id: post.category_id || "",
    excerpt: post.excerpt || "",
    featured_image_id: null as string | null,
    meta_description: post.meta_description || "",
    is_published: post.is_published,
    is_featured: post.is_featured,
    tags: post.tags.map((t) => t.name),
  });

  const { updatePost } = usePostMutations();

  const handleUpdate = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    updatePost.mutateAsync({ id: post.id, data: formData }).then((res) => {
      if (res.ok) router.push("/admin/blogs" as Route);
    });
  };

  const isValid = !!(formData.title.trim() && formData.author.trim() && formData.category_id);

  return (
    <Card className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xs rounded-2xl p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-white/20 pb-4">
        <h2 className="text-lg font-bold text-slate-900">Edit Blog Post</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/blogs" as Route)} className="rounded-xl border-white/50 bg-white/40">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updatePost.isPending || !isValid} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
            {updatePost.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Title *</Label>
          <Input value={formData.title} onChange={(e) => handleUpdate({ title: e.target.value })} className="bg-white/50 border-white/60 focus:bg-white rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Author *</Label>
          <Input value={formData.author} onChange={(e) => handleUpdate({ author: e.target.value })} className="bg-white/50 border-white/60 focus:bg-white rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Category *</Label>
          <Select value={formData.category_id} onValueChange={(val) => handleUpdate({ category_id: val })}>
            <SelectTrigger className="bg-white/50 border-white/60 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-50/90 border border-white/50 rounded-xl">
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700 font-semibold">Tags (comma-separated)</Label>
          <Input value={formData.tags.join(", ")} onChange={(e) => handleUpdate({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} className="bg-white/50 border-white/60 focus:bg-white rounded-xl" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-semibold">Excerpt</Label>
        <Textarea value={formData.excerpt} onChange={(e) => handleUpdate({ excerpt: e.target.value })} className="bg-white/50 border-white/60 focus:bg-white rounded-xl min-h-[60px]" />
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-semibold">Post Content</Label>
        <MarkdownEditor value={formData.content} onChange={(content) => handleUpdate({ content })} />
      </div>
    </Card>
  );
}
