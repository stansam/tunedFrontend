import type { ChatSidebarProps } from "../_props/chats.props";
import { ChatSidebarHeader } from "./ChatSidebarHeader";
import { ChatSidebarFilters } from "./ChatSidebarFilters";
import { ChatSidebarList } from "./ChatSidebarList";

export function ChatSidebar({
  chats,
  activeChatId,
  filter,
  searchQuery,
  onSelectChat,
  onSetFilter,
  onSetSearch,
}: ChatSidebarProps) {
  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-4 flex flex-col gap-4 h-[calc(100vh-120px)] lg:h-full">
      <ChatSidebarHeader onRefresh={() => {}} />
      <ChatSidebarFilters
        filter={filter}
        searchQuery={searchQuery}
        onSetFilter={onSetFilter}
        onSetSearch={onSetSearch}
      />
      <ChatSidebarList
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={onSelectChat}
      />
    </div>
  );
}
export default ChatSidebar;
