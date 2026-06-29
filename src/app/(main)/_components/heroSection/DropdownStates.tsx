import { Search } from "lucide-react";

export function SuggestionsSkeleton() {
  return (
    <div className="space-y-2 p-2">
      <div className="h-4 w-1/4 rounded bg-slate-100 animate-pulse" />
      <div className="h-9 w-full rounded-xl bg-slate-50 animate-pulse" />
      <div className="h-9 w-full rounded-xl bg-slate-50 animate-pulse" />
    </div>
  );
}

export function NoSuggestionsFound() {
  return (
    <div className="py-8 text-center text-slate-400 space-y-1">
      <Search className="h-6 w-6 mx-auto text-slate-300" />
      <p className="text-xs font-bold text-slate-600">No matches found</p>
      <p className="text-[10px]">Press Enter to perform a global search.</p>
    </div>
  );
}
