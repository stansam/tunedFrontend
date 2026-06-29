import { useState } from "react";
import { Edit2, Trash2, ChevronDown, ChevronUp, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "./ServiceCard";
import type { CategoryCardProps } from "../_props/services.props";

export function CategoryCard({
  category,
  services,
  onEditCategory,
  onDeleteCategory,
  onEditService,
  onDeleteService,
}: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const categoryServices = services.filter((s) => s.category_id === category.id);

  return (
    <div className="rounded-xl border border-white/50 bg-white/30 backdrop-blur-md shadow-xs overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between p-4 md:p-6 bg-white/10 select-none">
        <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
            <Folder className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              {category.name}
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {categoryServices.length} offerings
              </span>
            </h3>
            {category.description && (
              <p className="text-xs text-slate-500 truncate mt-0.5">{category.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditCategory(category)}
            className="h-8 w-8 rounded-xl hover:bg-slate-100 hover:text-slate-700 text-slate-500"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteCategory(category.id)}
            className="h-8 w-8 rounded-xl hover:bg-rose-50 hover:text-rose-600 text-slate-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 rounded-xl hover:bg-slate-100 text-slate-500"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 md:p-6 border-t border-white/30 space-y-3 bg-white/5">
          {categoryServices.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-4">No services in this category.</p>
          ) : (
            categoryServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onEdit={() => onEditService(service)}
                onDelete={() => onDeleteService(service.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
