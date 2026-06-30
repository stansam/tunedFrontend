import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatSidebarListProps } from "../_props/chats.props";
import { Bot } from "lucide-react";

export function ChatSidebarList({
  chats,
  activeChatId,
  onSelectChat,
}: ChatSidebarListProps) {
  if (chats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-6 text-slate-400 text-xs">
        No chats found.
      </div>
    );
  }

  return (
    <ScrollArea className="grow pr-1">
      <div className="space-y-1.5">
        {chats.map((chat) => {
          const lastMsg = chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : undefined;
          const isSelected = activeChatId === chat.id;
          const isEscalated = chat.subject === "Escalated from AI";
          return (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all text-left border ${
                isSelected
                  ? "bg-slate-800 text-white border-slate-800 shadow-xs"
                  : "bg-white/40 border-white/50 hover:bg-white/60 text-slate-800"
              }`}
            >
              <Avatar className="h-9 w-9 border border-white/20 shrink-0">
                <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {chat.user_name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-bold truncate flex items-center gap-1">
                    {chat.user_name}
                    {isEscalated && (
                      <Bot className="h-3 w-3 text-emerald-400 shrink-0" aria-label="Escalated from AI" />
                    )}
                  </span>
                  {chat.unread_count > 0 && (
                    <span className="h-4 min-w-4 px-1 rounded-full bg-emerald-500 text-white text-[9px] font-extrabold flex items-center justify-center shrink-0">
                      {chat.unread_count}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] block truncate ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                  {chat.subject || lastMsg?.content || "No messages yet"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
export default ChatSidebarList;
