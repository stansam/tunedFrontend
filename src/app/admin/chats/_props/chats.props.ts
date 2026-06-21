import type { ChatRoom, SupportAgent, ChatState } from "../_types/chats.type";

export interface ChatSidebarProps {
  readonly chats: ChatRoom[];
  readonly activeChatId: string | null;
  readonly filter: ChatState["filter"];
  readonly searchQuery: string;
  readonly onSelectChat: (id: string) => void;
  readonly onSetFilter: (filter: ChatState["filter"]) => void;
  readonly onSetSearch: (query: string) => void;
}

export interface ChatSidebarHeaderProps {
  readonly onRefresh: () => void;
}

export interface ChatSidebarFiltersProps {
  readonly filter: ChatState["filter"];
  readonly searchQuery: string;
  readonly onSetFilter: (filter: ChatState["filter"]) => void;
  readonly onSetSearch: (query: string) => void;
}

export interface ChatSidebarListProps {
  readonly chats: ChatRoom[];
  readonly activeChatId: string | null;
  readonly onSelectChat: (id: string) => void;
}

export interface ChatWindowProps {
  readonly chat: ChatRoom | null;
  readonly agents: SupportAgent[];
  readonly onBack: () => void;
  readonly onSendMessage: (content: string) => Promise<unknown>;
  readonly onAssignAgent: (adminId: string) => Promise<unknown>;
  readonly onChangeStatus: (status: "active" | "closed") => Promise<unknown>;
}

export interface ChatWindowHeaderProps {
  readonly chat: ChatRoom;
  readonly agents: SupportAgent[];
  readonly onBack: () => void;
  readonly onAssignAgent: (adminId: string) => Promise<unknown>;
  readonly onChangeStatus: (status: "active" | "closed") => Promise<unknown>;
}

export interface ChatWindowMessagesProps {
  readonly chat: ChatRoom;
}

export interface ChatWindowInputProps {
  readonly chat: ChatRoom;
  readonly onSendMessage: (content: string) => Promise<unknown>;
}
