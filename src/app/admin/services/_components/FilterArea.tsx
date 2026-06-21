import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { FilterAreaProps } from "../_props/services.props";

export function FilterArea({ filters, onFilterChange, categories }: FilterAreaProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-white/50 bg-white/20 backdrop-blur-md shadow-xs">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          value={filters.q}
          onChange={(e) => onFilterChange({ q: e.target.value })}
          placeholder="Search services by name, description or slug..."
          className="pl-10 h-10 bg-white/50 border-white/80 focus:border-emerald-500/50 rounded-xl text-xs"
        />
      </div>

      <div className="grid grid-cols-2 md:flex gap-3">
        <Select
          value={filters.category_id}
          onValueChange={(val) => onFilterChange({ category_id: val })}
        >
          <SelectTrigger className="h-10 w-full md:w-44 bg-white/50 border-white/80 rounded-xl text-xs">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border border-slate-100 bg-white/80 backdrop-blur-lg">
            <SelectItem value="all" className="text-xs">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id} className="text-xs">{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.is_active}
          onValueChange={(val) => onFilterChange({ is_active: val })}
        >
          <SelectTrigger className="h-10 w-full md:w-36 bg-white/50 border-white/80 rounded-xl text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border border-slate-100 bg-white/80 backdrop-blur-lg">
            <SelectItem value="all" className="text-xs">All Status</SelectItem>
            <SelectItem value="true" className="text-xs">Active</SelectItem>
            <SelectItem value="false" className="text-xs">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.featured}
          onValueChange={(val) => onFilterChange({ featured: val })}
        >
          <SelectTrigger className="h-10 w-full md:w-36 bg-white/50 border-white/80 rounded-xl text-xs md:col-span-2">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border border-slate-100 bg-white/80 backdrop-blur-lg">
            <SelectItem value="all" className="text-xs">All Featured</SelectItem>
            <SelectItem value="true" className="text-xs">Featured</SelectItem>
            <SelectItem value="false" className="text-xs">Non-Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
