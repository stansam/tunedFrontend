import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import type { BlogsToolbarProps } from "../_props/blogs.props";

export function BlogsToolbar({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  status,
  onStatusChange,
  categories,
  onCreatePost,
  activeTab,
  onTabChange,
}: BlogsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex bg-white/40 border border-white/50 backdrop-blur-md p-1 rounded-xl w-fit">
          <Button
            variant={activeTab === "posts" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("posts")}
            className="rounded-lg text-xs font-semibold px-4"
          >
            Blog Posts
          </Button>
          <Button
            variant={activeTab === "categories" ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange("categories")}
            className="rounded-lg text-xs font-semibold px-4"
          >
            Categories
          </Button>
        </div>

        {activeTab === "posts" && (
          <Button
            onClick={onCreatePost}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-1 shrink-0"
          >
            <Plus className="size-4" />
            <span>Write Post</span>
          </Button>
        )}
      </div>

      {activeTab === "posts" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search posts..."
              className="pl-9 bg-white/40 border-white/50 backdrop-blur-md rounded-xl"
            />
          </div>

          <Select value={categoryId} onValueChange={onCategoryChange}>
            <SelectTrigger className="bg-white/40 border-white/50 backdrop-blur-md rounded-xl">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-slate-50/90 backdrop-blur-lg border border-white/50 rounded-xl">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="bg-white/40 border-white/50 backdrop-blur-md rounded-xl">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="bg-slate-50/90 backdrop-blur-lg border border-white/50 rounded-xl">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
