import type { AdminBlogPostResponse } from "../_types/blogs.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MessageSquare, Edit2, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface BlogsTableDesktopProps {
  readonly blogs: readonly AdminBlogPostResponse[];
  readonly onEdit: (slug: string) => void;
  readonly onDelete: (id: string) => void;
  readonly onPublishToggle: (id: string, published: boolean) => void;
  readonly onFeatureToggle: (id: string, featured: boolean) => void;
  readonly onViewComments: (post: AdminBlogPostResponse) => void;
}

export function BlogsTableDesktop({
  blogs,
  onEdit,
  onDelete,
  onPublishToggle,
  onFeatureToggle,
  onViewComments,
}: BlogsTableDesktopProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/20 hover:bg-transparent">
            <TableHead className="w-[35%] text-slate-700 font-bold">Post Info</TableHead>
            <TableHead className="text-slate-700 font-bold">Author</TableHead>
            <TableHead className="text-slate-700 font-bold">Published</TableHead>
            <TableHead className="text-slate-700 font-bold">Featured</TableHead>
            <TableHead className="text-slate-700 font-bold">Comments</TableHead>
            <TableHead className="text-right text-slate-700 font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((post) => (
            <TableRow key={post.id} className="border-b border-white/20 hover:bg-white/30 transition-colors">
              <TableCell>
                <div className="font-semibold text-slate-900 line-clamp-1">{post.title}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Calendar className="size-3" />
                  {post.published_at ? format(new Date(post.published_at), "MMM d, yyyy") : "Draft"}
                </div>
              </TableCell>
              <TableCell className="text-slate-700 font-medium">{post.author}</TableCell>
              <TableCell>
                <Switch checked={post.is_published} onCheckedChange={(val) => onPublishToggle(post.id, val)} />
              </TableCell>
              <TableCell>
                <Switch checked={post.is_featured} onCheckedChange={(val) => onFeatureToggle(post.id, val)} />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => onViewComments(post)} className="flex items-center gap-1.5 h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50">
                  <MessageSquare className="size-4" />
                  <span>{post.comments?.length ?? 0}</span>
                </Button>
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Button size="icon" variant="ghost" className="size-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50/50" onClick={() => onEdit(post.slug)}>
                  <Edit2 className="size-4" />
                </Button>
                <Button size="icon" variant="ghost" className="size-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50/50" onClick={() => onDelete(post.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
