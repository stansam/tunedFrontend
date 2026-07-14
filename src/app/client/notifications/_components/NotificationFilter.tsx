import { Search } from "lucide-react";
import type { NotificationFilters } from "../_types";

interface Props {
  readonly filters: NotificationFilters;
  readonly onChange: (filters: NotificationFilters) => void;
}

export function NotificationFilter({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm w-full">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        <select
          value={filters.readStatus}
          aria-label="Filter by read status"
          onChange={(e) =>
            onChange({
              ...filters,
              readStatus: e.target.value as NotificationFilters["readStatus"],
            })
          }
          className="flex-1 md:flex-none px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer focus:border-emerald-500 transition-all"
        >
          <option value="all">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>

        <select
          value={filters.type}
          aria-label="Filter by notification type"
          onChange={(e) =>
            onChange({
              ...filters,
              type: e.target.value as NotificationFilters["type"],
            })
          }
          className="flex-1 md:flex-none px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer focus:border-emerald-500 transition-all"
        >
          <option value="all">All Types</option>
          <option value="info">Info</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>
    </div>
  );
}
