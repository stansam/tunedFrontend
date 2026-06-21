import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { ChatSidebarFiltersProps } from "../_props/chats.props";

export function ChatSidebarFilters({
  filter,
  searchQuery,
  onSetFilter,
  onSetSearch,
}: ChatSidebarFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => onSetSearch(e.target.value)}
          className="pl-9 text-xs h-9 bg-white/50 border-slate-200"
        />
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(["all", "unread", "active", "closed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => onSetFilter(f)}
            className={`px-3 py-1 rounded-full text-[10px] font-bold capitalize transition-all border shrink-0 ${
              filter === f
                ? "bg-slate-800 text-white border-slate-800 shadow-xs"
                : "bg-white/55 text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
export default ChatSidebarFilters;
