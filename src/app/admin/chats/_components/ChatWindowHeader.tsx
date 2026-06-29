import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, CheckCircle2, XCircle, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { ChatWindowHeaderProps } from "../_props/chats.props";

export function ChatWindowHeader({
  chat,
  agents,
  onBack,
  onAssignAgent,
  onChangeStatus,
}: ChatWindowHeaderProps) {
  const isClosed = chat.status === "closed";
  return (
    <div className="flex items-center justify-between pb-3 border-b border-slate-200/40">
      <div className="flex items-center gap-3 min-w-0">
        <Button variant="ghost" size="icon" onClick={onBack} className="lg:hidden -ml-2 shrink-0">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xs font-bold">
            {chat.user_name[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold truncate text-slate-800">{chat.user_name}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold capitalize ${
                isClosed
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-200"
              }`}
            >
              {chat.status}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block truncate">
            {chat.order_number ? `Order: ${chat.order_number}` : chat.subject || "Support Chat"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold gap-1 px-2.5 bg-white/50 border-slate-200">
              <UserPlus className="h-3 w-3" />
              <span className="hidden sm:inline">{chat.admin_name || "Assign Agent"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {agents.map((agent) => (
              <DropdownMenuItem key={agent.id} onClick={() => onAssignAgent(agent.id)} className="text-xs">
                {agent.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant={isClosed ? "default" : "outline"}
          size="sm"
          onClick={() => onChangeStatus(isClosed ? "active" : "closed")}
          className={`h-8 text-[10px] font-extrabold gap-1 px-2.5 ${
            isClosed
              ? "bg-emerald-600 text-white hover:bg-emerald-500 border-none"
              : "bg-white/50 border-slate-200 text-red-600 hover:text-red-700"
          }`}
        >
          {isClosed ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          <span>{isClosed ? "Reopen" : "Close"}</span>
        </Button>
      </div>
    </div>
  );
}
export default ChatWindowHeader;
