import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { parseMarkdown } from "./parseMarkdown";
import { Bold, Italic, Heading1, Heading2, Link, List, Code, Image as ImageIcon, Eye, Edit } from "lucide-react";
import type {MarkdownEditorProps} from "../_props"
export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  const insertSyntax = (before: string, after: string = "") => {
    const el = areaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selection = value.substring(start, end);
    const replacement = before + (selection || "text") + after;
    onChange(value.substring(0, start) + replacement + value.substring(end));
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + (selection || "text").length);
    }, 50);
  };

  return (
    <div className="rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md overflow-hidden shadow-xs flex flex-col">
      <div className="flex justify-between items-center bg-white/50 border-b border-white/20 p-2 gap-2">
        <div className="flex gap-1 overflow-x-auto">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-slate-600 hover:bg-white/60 shrink-0"
            onClick={() => insertSyntax("# ", "")}
            title="H1"
          >
            <Heading1 className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-slate-600 hover:bg-white/60 shrink-0"
            onClick={() => insertSyntax("## ", "")}
            title="H2"
          >
            <Heading2 className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-slate-600 hover:bg-white/60 shrink-0"
            onClick={() => insertSyntax("**", "**")}
            title="Bold"
          >
            <Bold className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-slate-600 hover:bg-white/60 shrink-0"
            onClick={() => insertSyntax("*", "*")}
            title="Italic"
          >
            <Italic className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-slate-600 hover:bg-white/60 shrink-0"
            onClick={() => insertSyntax("- ", "")}
            title="List"
          >
            <List className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-slate-600 hover:bg-white/60 shrink-0"
            onClick={() => insertSyntax("```\n", "\n```")}
            title="Code"
          >
            <Code className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-slate-600 hover:bg-white/60 shrink-0"
            onClick={() => insertSyntax("[", "](url)")}
            title="Link"
          >
            <Link className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 text-slate-600 hover:bg-white/60 shrink-0"
            onClick={() => insertSyntax("![", "](image-url)")}
            title="Image"
          >
            <ImageIcon className="size-4" />
          </Button>
        </div>
        <div className="flex bg-white/40 border border-white/50 p-0.5 rounded-lg shrink-0">
          <Button
            type="button"
            variant={tab === "edit" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setTab("edit")}
            className="h-7 text-xs px-3 rounded-md"
          >
            <Edit className="size-3 mr-1" /> Edit
          </Button>
          <Button
            type="button"
            variant={tab === "preview" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setTab("preview")}
            className="h-7 text-xs px-3 rounded-md"
          >
            <Eye className="size-3 mr-1" /> Preview
          </Button>
        </div>
      </div>

      <div className="flex-1">
        {tab === "edit" ? (
          <textarea
            ref={areaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-[300px] p-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-800 font-mono text-sm leading-relaxed resize-y"
          />
        ) : (
          <div
            className="p-6 min-h-[350px] bg-white/10 overflow-y-auto prose max-w-none text-slate-800"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
          />
        )}
      </div>
    </div>
  );
}
