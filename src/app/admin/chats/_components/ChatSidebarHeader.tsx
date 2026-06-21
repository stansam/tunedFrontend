import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import type { ChatSidebarHeaderProps } from "../_props/chats.props";

export function ChatSidebarHeader({ onRefresh }: ChatSidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-slate-200/40">
      <h3 className="text-sm font-bold text-slate-800">Live Chats</h3>
      <Button variant="ghost" size="icon" onClick={onRefresh} className="h-8 w-8 text-slate-500 hover:text-slate-800">
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
export default ChatSidebarHeader;
