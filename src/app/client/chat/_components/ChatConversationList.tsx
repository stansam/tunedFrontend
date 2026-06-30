"use client";

import { useState, useTransition } from "react";
import { useClientChats } from "../_hooks/useClientChats";
import { ChatConversationItem } from "./ChatConversationItem";
import { ChatCreateModal } from "./ChatCreateModal";
import { useChatWidget } from "../_hooks/useChatWidget";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChatWidgetSkeleton } from "../_skeletons/ChatWidgetSkeleton";

export function ChatConversationList() {
  const { chats, isLoading, createChat, isCreating } = useClientChats();
  const { openChat } = useChatWidget();
  const [filter, setFilter] = useState<"all" | "active" | "closed">("all");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (isLoading) return <ChatWidgetSkeleton />;

  const filtered = chats.filter((c) => {
    const matchesSearch = (c.subject || "").toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCreate = async (subject: string, orderId?: string) => {
    startTransition(async () => {
      try {
        const newChat = await createChat(subject, orderId);
        if (newChat?.id) openChat(newChat.id);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-4 gap-3.5">
      <div className="flex gap-2 items-center shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search conversations..." aria-label="Search conversations" className="pl-8 text-xs h-8 bg-white/50 border-slate-200" />
        </div>
        <button onClick={() => setModalOpen(true)} aria-label="Start new conversation" className="h-8 px-3 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 active:scale-95 transition-all shadow-sm"><Plus className="h-3.5 w-3.5" /> New</button>
      </div>
      <div className="flex gap-1.5 border-b border-slate-100 pb-1.5 shrink-0" role="tablist" aria-label="Conversation filters">
        {(["all", "active", "closed"] as const).map((tab) => (
          <button key={tab} role="tab" aria-selected={filter === tab} onClick={() => setFilter(tab)} className={`px-2.5 py-1 text-[10px] font-bold capitalize transition-all border-b-2 mb-[-8px] ${filter === tab ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-600"}`}>{tab}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-0.5" role="tabpanel" aria-label="Conversations list">
        {filtered.length === 0 ? (
          <div className="text-center text-slate-400 text-xs py-8">No conversations found.</div>
        ) : (
          filtered.map((chat) => (
            <ChatConversationItem key={chat.id} chat={chat} onClick={() => openChat(chat.id)} />
          ))
        )}
      </div>
      <ChatCreateModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreate} isPending={isCreating || isPending} />
    </div>
  );
}
export default ChatConversationList;
