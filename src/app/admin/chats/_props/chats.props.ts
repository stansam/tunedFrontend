import type { ChatRoom, ChatMessage, SupportAgent, ChatAttachment } from "../_types/chats.type";
import type { ApiResult } from "@/lib/types";

export interface ChatSidebarProps {
  readonly chats: ChatRoom[];
  readonly activeChatId: string | null;
  readonly filter: "all" | "unread" | "active" | "closed";
  readonly searchQuery: string;
  readonly onSelectChat: (chatId: string) => void;
  readonly onSetFilter: (filter: "all" | "unread" | "active" | "closed") => void;
  readonly onSetSearch: (query: string) => void;
  readonly onRefresh?: () => void;
}

export interface ChatSidebarHeaderProps {
  readonly onRefresh: () => void;
}

export interface ChatSidebarFiltersProps {
  readonly filter: "all" | "unread" | "active" | "closed";
  readonly onSetFilter: (filter: "all" | "unread" | "active" | "closed") => void;
  readonly searchQuery: string;
  readonly onSetSearch: (query: string) => void;
}

export interface ChatSidebarListProps {
  readonly chats: ChatRoom[];
  readonly activeChatId: string | null;
  readonly onSelectChat: (chatId: string) => void;
}

export interface ChatWindowProps {
  readonly chat: ChatRoom | null;
  readonly agents: SupportAgent[];
  readonly onBack: () => void;
  readonly onSendMessage: (content: string) => Promise<ApiResult<ChatMessage> | void>;
  readonly onAssignAgent: (adminId: string) => Promise<ApiResult<ChatRoom> | void>;
  readonly onChangeStatus: (status: "active" | "closed") => Promise<ApiResult<ChatRoom> | void>;
  readonly onEditMessage: (messageId: string, content: string) => Promise<ApiResult<ChatMessage> | void>;
  readonly onDeleteMessage: (messageId: string) => Promise<ApiResult<{ success: boolean }> | void>;
  readonly onUploadAttachment: (file: File) => Promise<ApiResult<ChatAttachment> | void>;
}

export interface ChatWindowHeaderProps {
  readonly chat: ChatRoom;
  readonly agents: SupportAgent[];
  readonly onBack: () => void;
  readonly onAssignAgent: (adminId: string) => Promise<ApiResult<ChatRoom> | void>;
  readonly onChangeStatus: (status: "active" | "closed") => Promise<ApiResult<ChatRoom> | void>;
}

export interface ChatWindowMessagesProps {
  readonly messages: ChatMessage[];
  readonly activeChatId: string;
  readonly onEditMessage: (messageId: string, content: string) => Promise<ApiResult<ChatMessage> | void>;
  readonly onDeleteMessage: (messageId: string) => Promise<ApiResult<{ success: boolean }> | void>;
  readonly fetchNextPage: () => void;
  readonly hasNextPage: boolean;
  readonly isFetchingNextPage: boolean;
}

export interface ChatWindowInputProps {
  readonly onSendMessage: (content: string) => Promise<ApiResult<ChatMessage> | void>;
  readonly onUploadAttachment: (file: File) => Promise<ApiResult<ChatAttachment> | void>;
  readonly disabled?: boolean;
  readonly onKeyDown?: () => void;
  readonly chat?: ChatRoom;
}
