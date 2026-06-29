import type { CategoryListProps } from "../_props/blogs.props";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Plus } from "lucide-react";

export function CategoryList({ categories, loading, onCreate, onEdit, onDelete }: CategoryListProps) {
  if (loading) {
    return <div className="h-48 flex items-center justify-center text-slate-500 animate-pulse">Loading categories...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-4 lg:px-6">
        <h3 className="text-lg font-bold text-slate-900">Blog Categories</h3>
        <Button onClick={onCreate} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-1">
          <Plus className="size-4" />
          <span>New Category</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-6">
        {categories.map((cat) => (
          <Card key={cat.id} className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xs hover:bg-white/50 transition-all rounded-2xl p-4 flex flex-col justify-between min-h-[120px]">
            <div>
              <h4 className="font-bold text-slate-900">{cat.name}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description || "No description provided."}</p>
            </div>
            <div className="flex justify-end gap-1.5 mt-4 pt-2 border-t border-white/15">
              <Button size="icon" variant="ghost" className="size-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50/50" onClick={() => onEdit(cat)}>
                <Edit2 className="size-4" />
              </Button>
              <Button size="icon" variant="ghost" className="size-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50/50" onClick={() => onDelete(cat.id)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
