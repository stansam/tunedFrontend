import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/api-client";
import type { TagResponse } from "@/lib/types/tag.type";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TagSelector({
  selected,
  onChange,
}: {
  readonly selected: readonly string[];
  readonly onChange: (tags: readonly string[]) => void;
}) {
  const [input, setInput] = useState("");
  const { data: tags = [] } = useQuery<readonly TagResponse[]>({
    queryKey: ["tags"],
    queryFn: () => apiGet<readonly TagResponse[]>("/tags").then((r) => (r.ok ? r.data ?? [] : [])),
    staleTime: 60_000,
  });

  const handleAdd = (tag: string) => {
    const clean = tag.trim().toLowerCase();
    if (clean && !selected.includes(clean)) {
      onChange([...selected, clean]);
    }
    setInput("");
  };

  const suggestions = tags
    .map((t) => t.name)
    .filter((n) => n.toLowerCase().includes(input.toLowerCase()) && !selected.includes(n));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5 min-h-[32px] p-1.5 border border-slate-100 rounded-xl bg-white/30 backdrop-blur-xs">
        {selected.map((tag) => (
          <Badge key={tag} className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 border-0 flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-lg font-medium">
            {tag}
            <button type="button" onClick={() => onChange(selected.filter((t) => t !== tag))} className="hover:text-emerald-900 rounded-full focus:outline-hidden">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {selected.length === 0 && <span className="text-[10px] text-slate-400 italic p-1">No tags selected</span>}
      </div>

      <div className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type to search or create tag..."
          className="h-8 bg-white/50 border-white/80 focus:border-emerald-500/50 rounded-xl text-xs"
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd(input))}
        />
        {input.trim() && (
          <div className="absolute z-50 w-full mt-1 max-h-36 overflow-auto border border-slate-100 bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-1 text-xs">
            {suggestions.map((name) => (
              <button key={name} type="button" onClick={() => handleAdd(name)} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-700">
                <span>{name}</span>
                <Plus className="h-3 w-3 text-slate-400" />
              </button>
            ))}
            {!suggestions.includes(input.trim().toLowerCase()) && (
              <button type="button" onClick={() => handleAdd(input)} className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-emerald-50 text-emerald-700 font-semibold flex items-center justify-between">
                <span>Create &ldquo;{input.trim()}&rdquo;</span>
                <Plus className="h-3 w-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
