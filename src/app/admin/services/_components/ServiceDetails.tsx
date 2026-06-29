import { Edit, Trash2, Tag as TagIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ServiceDetailsProps } from "../_props/services.props";

export function ServiceDetails({ service, onEdit, onDelete }: ServiceDetailsProps) {
  return (
    <div className="p-4 md:p-6 space-y-4 text-xs text-slate-700">
      {service.description && (
        <div className="space-y-1">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px]">Description</span>
          <p className="leading-relaxed text-slate-600 font-medium">{service.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px]">Pricing Tier</span>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/10 hover:bg-emerald-500/10 border-0 text-emerald-600 rounded-lg px-2 py-1 font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {service.pricing_category?.name ?? "None"}
            </Badge>
          </div>
        </div>

        <div className="space-y-1">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[9px]">Tags</span>
          <div className="flex flex-wrap gap-1.5">
            {service.tags && service.tags.length > 0 ? (
              service.tags.map((tag) => (
                <Badge
                  key={tag.id}
                  className="bg-slate-100 hover:bg-slate-100 border-0 text-slate-600 rounded-lg px-2 py-0.5 font-medium flex items-center gap-1"
                >
                  <TagIcon className="h-2.5 w-2.5 text-slate-400" />
                  {tag.name}
                </Badge>
              ))
            ) : (
              <span className="text-slate-400 italic">No tags assigned</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="rounded-xl border-slate-200 text-slate-700 text-xs h-8 px-3 flex items-center gap-1.5 hover:bg-slate-100"
        >
          <Edit className="h-3.5 w-3.5" />
          Edit Service
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 text-xs h-8 px-3 flex items-center gap-1.5"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}
