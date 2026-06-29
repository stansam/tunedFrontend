import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, Star } from "lucide-react";
import { format } from "date-fns";
import type {BlogsTableMobileProps} from "../_props/blogs.props";

export function BlogsTableMobile({
  blogs,
  onEdit,
  onDelete,
  onPublishToggle,
  onFeatureToggle,
  onViewComments,
}: BlogsTableMobileProps) {
  return (
    <div className="block md:hidden divide-y divide-white/20">
      {blogs.map((post) => (
        <div key={post.id} className="p-4 space-y-3 hover:bg-white/30 transition-colors">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h4 className="font-semibold text-slate-900 line-clamp-2">{post.title}</h4>
              <p className="text-xs text-slate-500 mt-1">By {post.author}</p>
            </div>
            <Badge variant={post.is_published ? "default" : "secondary"} className="shrink-0">
              {post.is_published ? "Published" : "Draft"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {post.published_at ? format(new Date(post.published_at), "MMM d, yyyy") : "Draft"}
            </span>
            <span
              className="flex items-center gap-1 text-indigo-600 cursor-pointer hover:underline"
              onClick={() => onViewComments(post)}
            >
              <MessageSquare className="size-3.5" />
              {post.comments?.length ?? 0} Comments
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <Switch checked={post.is_published} onCheckedChange={(val) => onPublishToggle(post.id, val)} />
                <span>Pub</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <Switch checked={post.is_featured} onCheckedChange={(val) => onFeatureToggle(post.id, val)} />
                <Star className={`size-3 ${post.is_featured ? "fill-amber-400 text-amber-400" : "text-slate-400"}`} />
              </label>
            </div>
            <div className="flex gap-1.5">
              <Button size="sm" variant="outline" className="h-7 text-xs bg-white/40 border-white/50" onClick={() => onEdit(post.slug)}>
                Edit
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs bg-rose-50/40 text-rose-600 border-rose-200 hover:bg-rose-50/60" onClick={() => onDelete(post.id)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
