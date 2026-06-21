import { useState } from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServiceDetails } from "./ServiceDetails";
import { useBasePrice } from "../_hooks/useBasePrice";
import type { ServiceCardProps } from "../_props/services.props";
import type { AdminService } from "../_types/services.types";

export function getBasePrice(service: AdminService): string {
  if (service.pricing_category?.default_rate !== undefined) {
    return `$${service.pricing_category.default_rate.toFixed(2)}`;
  }
  const isDev = process.env.NODE_ENV !== "production";
  if (isDev) {
    const name = service.pricing_category?.name?.toLowerCase() ?? "";
    if (name.includes("writing")) return "$12.45";
    if (name.includes("technical")) return "$18.00";
    if (name.includes("proofreading") || name.includes("edit")) return "$8.50";
    return "$10.00";
  }
  return "--.--";
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: basePrice } = useBasePrice(service.id);
  const displayPrice = basePrice !== undefined ? `$${basePrice.toFixed(2)}` : getBasePrice(service);

  return (
    <div className="rounded-xl border border-white/40 bg-white/20 hover:bg-white/30 transition-all duration-200 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="min-w-0 flex-1 pr-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-800 truncate">{service.name}</span>
            {service.featured && (
              <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/10 border-0 flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                Featured
              </Badge>
            )}
          </div>
          <span className="text-[10px] text-slate-400 block truncate mt-0.5">/{service.slug}</span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 block font-medium">Base Price</span>
            <span className="text-xs font-bold text-slate-700">{displayPrice}</span>
          </div>

          <Badge
            className={`rounded-full border-0 text-[10px] px-2 py-0.5 font-bold ${
              service.is_active
                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10"
                : "bg-slate-200 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {service.is_active ? "Active" : "Paused"}
          </Badge>

          {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-white/20 bg-white/5">
          <ServiceDetails service={service} onEdit={onEdit} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}
