import type { BlogsTableProps } from "../_props/blogs.props";
import { BlogsTableDesktop } from "./BlogsTableDesktop";
import { BlogsTableMobile } from "./BlogsTableMobile";
import { Card } from "@/components/ui/card";

export function BlogsTable({
  blogs,
  loading,
  onEdit,
  onDelete,
  onPublishToggle,
  onFeatureToggle,
  onViewComments,
}: Omit<BlogsTableProps, "page" | "total" | "perPage" | "onPageChange">) {
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500 bg-white/30 border border-white/50 backdrop-blur-md rounded-2xl animate-pulse">
        Loading posts...
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500 bg-white/30 border border-white/50 backdrop-blur-md rounded-2xl">
        No blog posts found.
      </div>
    );
  }

  return (
    <Card className="rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md overflow-hidden shadow-xs">
      <BlogsTableDesktop
        blogs={blogs}
        onEdit={onEdit}
        onDelete={onDelete}
        onPublishToggle={onPublishToggle}
        onFeatureToggle={onFeatureToggle}
        onViewComments={onViewComments}
      />
      <BlogsTableMobile
        blogs={blogs}
        onEdit={onEdit}
        onDelete={onDelete}
        onPublishToggle={onPublishToggle}
        onFeatureToggle={onFeatureToggle}
        onViewComments={onViewComments}
      />
    </Card>
  );
}
